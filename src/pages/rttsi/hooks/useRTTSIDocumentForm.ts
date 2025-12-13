import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  createRTTSISchema,
  RTTSIDto,
} from "@/pages/rttsi/schemas/createRTTSISchema.ts";
import { RTTSI_QUERY_KEY } from "@/pages/rttsi/constants/rttsi.constants.ts";
import useRTTSIDocument from "@/pages/rttsi/hooks/useRTTSIDocument.ts";

export interface UseF56DocumentFormParams {
  id?: string | null;
  onSave?: () => void;
}

const useRTTSIDocumentForm = ({ id, onSave }: UseF56DocumentFormParams) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { rttsiDocumentQuery } = useRTTSIDocument(id as string);

  const form = useForm<RTTSIDto>({
    resolver: zodResolver(createRTTSISchema(t)),
    defaultValues: {
      files: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    const item = rttsiDocumentQuery.data?.data;
    if (item) {
      form.setValue("title", item.title);
      form.setValue("UbpNumber", item.UbpNumber);
      form.setValue("applicationNumber", item.applicationNumber);
      form.setValue("workConditions", item.workConditions);
      form.setValue("date", item.date);
      form.setValue("magistralName", item.magistralName);
      form.setValue("NoNumber", item.NoNumber);
      form.setValue("ai9Channels", item.ai9Channels);
      form.setValue("reasonJob", item.reasonJob);
      form.setValue("jobDescription", item.jobDescription);
      form.setValue("NOStatus", item.NOStatus);
      form.setValue("aag", item.aag);
      form.setValue("reservation", item.reservation);
      form.setValue("responsiblePerson", item.responsiblePerson);
      form.setValue("headOfTheEnterprise", item.headOfTheEnterprise);
      form.setValue("aiFullName", item.aiFullName);
      form.setValue("applicantAP", item.applicantAP);
      form.setValue("applicantUBP", item.applicantUBP);
      form.setValue("description", item.description);
      form.setValue("files", item.files as [string, ...string[]]);
      const ids = item.recipientIds?.map((p) => p._id) ?? [];
      form.setValue(
        "recipientIds",
        (ids.length > 0 ? ids : [""]) as [string, ...string[]],
      );
    }
  }, [rttsiDocumentQuery.data, form]);

  const { query: save } = useMutate({
    url: [RTTSI_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(`${get(error, "response.statusText", "Error")}`),
          description: t(
            `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
          ),
        });
      },
      onSuccess: () => {
        form.reset();
        onSave?.();
        toast({
          variant: "success",
          title: t(`Success`),
          description: id
            ? t(`RTTSI updated successfully`)
            : t(`RTTSI created successfully`),
        });
      },
    },
  });

  const handleSubmit = useCallback(
    (values: RTTSIDto) => {
      save.mutate(values);
    },
    [save],
  );

  return {
    id,
    form,
    handleSubmit,
  };
};

export default useRTTSIDocumentForm;
