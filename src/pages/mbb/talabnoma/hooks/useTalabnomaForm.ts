import { useEffect, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import useTalabnomaDocumentQuery from "@/pages/mbb/talabnoma/hooks/useTalabnomaDocument.ts";
import {
  createTalabnomaSchema,
  TalabnomaDto,
} from "@/pages/mbb/talabnoma/schemas/createTalabnomaSchema.ts";
import URLS from "@/shared/constants/urls.ts";

export interface TalabnomaFormProps {
  id?: string | null;
  onSave?: () => void;
}

const useTalabnomaForm = ({ id, onSave }: TalabnomaFormProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { applicationDocumentQuery } = useTalabnomaDocumentQuery(id as string);

  const form = useForm<TalabnomaDto>({
    resolver: zodResolver(createTalabnomaSchema(t)),
    mode: "onChange",
    defaultValues: {
      code: "",
      working_condition: "",
      schedule: [
        {
          start_at: "",
          end_at: "",
        },
      ],
      station: "",
      no_number: "",
      ai_channel: "",
      reason_work: "",
      content_work: "",
      no_status: "",
      aoj_number: "",
      reverse: "",
      responsible_person: "",
      agreed: "",
      ai_agreed: "",
      creator_ip: "",
      creator_mbb: "",
      application: [
        {
          operator_name: "",
          ranges: [
            {
              from: "",
              to: "",
            },
          ],
        },
      ],
      signer: "",
    },
  });

  const { fields: scheduleFields, append: appendSchedule, remove: removeSchedule } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  const { fields: applicationFields, append: appendApplication, remove: removeApplication } = useFieldArray({
    control: form.control,
    name: "application",
  });

  useEffect(() => {
    const item = applicationDocumentQuery.data?.data;
    if (item && id) {
      form.reset({
        code: item.code || "",
        working_condition: item.working_condition || "",
        station: item.station || "",
        no_number: item.no_number || "",
        ai_channel: item.ai_channel || "",
        reason_work: item.reason_work || "",
        content_work: item.content_work || "",
        no_status: item.no_status || "",
        aoj_number: item.aoj_number || "",
        reverse: item.reverse || "",
        responsible_person: item.responsible_person || "",
        agreed: item.agreed || "",
        ai_agreed: item.ai_agreed || "",
        creator_ip: item.creator_ip || "",
        creator_mbb: item.creator_mbb || "",
        schedule:
          item.schedule?.length > 0
            ? item.schedule
            : [{ start_at: "", end_at: "" }],
        application:
          item.application?.length > 0
            ? item.application
            : [{ operator_name: "", ranges: [{ from: "", to: "" }] }],
        signer: item.signer || "",
      });
    }
  }, [applicationDocumentQuery.data, id, form]);

  const { query: save } = useMutate({
    url: [URLS.MBB_Talabnoma, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onSuccess: () => {
        if (!id) form.reset();
        toast({
          variant: "success",
          title: t("Success"),
          description: id
            ? t("Application updated successfully")
            : t("Application created successfully"),
        });
        onSave?.();
        navigate("/mbb/talabnoma");
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast({
          variant: "destructive",
          title: t(`${get(axiosError, "response.statusText", "Error")}`),
          description: t(
            `${get(axiosError, "response.data.message", "An error occurred")}`,
          ),
        });
      },
    },
  });

  const onSubmit = useCallback(
    (values: TalabnomaDto) => {
      save.mutate(values);
    },
    [save],
  );

  return {
    form,
    scheduleFields,
    applicationFields,
    appendSchedule,
    removeSchedule,
    appendApplication,
    removeApplication,
    isLoading: save.isPending || applicationDocumentQuery.isFetching,
    onSubmit,
  };
};

export default useTalabnomaForm;
