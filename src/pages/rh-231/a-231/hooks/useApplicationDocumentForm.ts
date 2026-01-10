import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  createApplicationSchema,
  ApplicationDto,
} from "@/pages/rtsi/application/schemas/createApplicationSchema.ts";
import { APPLICATION_QUERY_KEY } from "@/pages/rtsi/application/constants/application.constants.ts";
import use_A_231_Document from "@/pages/rh-231/a-231/hooks/useApplicationDocument.ts";

export interface UseApplicationDocumentFormParams {
  id?: string | null;
  onSave?: () => void;
}

const useA231DocumentForm = ({
                               id,
                               onSave,
                             }: UseApplicationDocumentFormParams = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { applicationDocumentQuery } = use_A_231_Document(id as string);

  // useA231DocumentForm.ts ichida
  const form = useForm<ApplicationDto>({
    resolver: zodResolver(createApplicationSchema(t)),
    mode: "onChange",
    defaultValues: {
      _id: id || "", // _id qo'shildi
      title: "Bypass Schedule",
      status: "new",
      to: "",
      content: "Bypass Schedule Document",
      rejected_at: "",
      finished_at: "",
      created_at: new Date().toISOString(),
      dead_line: "",
      // Rasm dagi maydonlar
      graphNumber: "",
      usedGraphPoints: "",
      autoReservePrinciple: "",
      usedHOTypeAndLink: "",
      mainHoTrack: "",
      mainInteractionNumber: "",
      backupHoTrack: "",
      switchingPoints: "",
      backupInteractionNumber: "",
      responsibleStation: "",
      implementationTime: "",
      aagOrder: "",
      comment: "",
    },
  });

  useEffect(() => {
    const item = applicationDocumentQuery.data?.data;
    if (item && id) {
      form.reset({
        ...item,
        graphNumber: item.graphNumber || item.applicationNumber || "",
      });
    }
  }, [applicationDocumentQuery.data, id, form]);

  const { query: save } = useMutate({
    url: [APPLICATION_QUERY_KEY, id || ""],
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
        navigate("/rh-231/a-231");
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast({
          variant: "destructive",
          title: t(`${get(axiosError, "response.statusText", "Error")}`),
          description: t(
              `${get(axiosError, "response.data.message", "An error occurred. Contact the administrator")}`,
          ),
        });
      },
    },
  });

  const onSubmit = useCallback(
      (values: ApplicationDto) => {
        save.mutate(values);
      },
      [save],
  );

  return {
    form,
    isLoading: save.isPending || applicationDocumentQuery.isFetching,
    onSubmit,
    id,
  };
};

export default useA231DocumentForm;