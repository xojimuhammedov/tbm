import { useCallback, useEffect, useMemo } from "react";
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
  createDApplicationSchema,
  DApplicationDto,
} from "@/pages/rh-252/d-252/schemas/createDApplicationSchema.ts";
import URLS from "@/shared/constants/urls";
import useDApplication from "@/pages/rh-252/d-252/hooks/useDApplication.ts";

export interface DApplicationFormProps {
  id?: string | null;
  onSave?: () => void;
}

const useDApplicationForm = ({ id, onSave }: DApplicationFormProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { applicationDocumentQuery } = useDApplication(id as string);
  const actionOptions = useMemo(
      () => [
        { label: t("Tashkil etish"), value: "create" },
        { label: t("Ko'chirish"), value: "update" },
        { label: t("O'chirish"), value: "delete" },
      ],
      [t],
  );

  const form = useForm<DApplicationDto>({
    resolver: zodResolver(createDApplicationSchema(t)),
    mode: "onChange",
    defaultValues: {
      request_number: "",
      sender: "",
      recipient: "",
      leader: "",
      action_type: [],
    },
  });

  useEffect(() => {
    const item = applicationDocumentQuery.data?.data;
    if (item && id) {
      form.reset({
        request_number: item.request_number || "",
        sender: item.sender || "",
        recipient: item.recipient || "",
        leader: item.leader || "",
        action_type: item.action_type || [],
      });
    }
  }, [applicationDocumentQuery.data, id, form]);

  const { query: save } = useMutate({
    url: [URLS.RH_D_Application, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onSuccess: () => {
        if (!id) form.reset();
        toast({
          variant: "success",
          title: t("Success"),
          description: id
              ? t("Request updated successfully")
              : t("Request created successfully"),
        });
        onSave?.();
        navigate("/rh-252/d-252");
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
      (values: DApplicationDto) => {
        save.mutate(values);
      },
      [save],
  );

  return {
    form,
    actionOptions,
    isLoading: save.isPending || applicationDocumentQuery.isFetching,
    onSubmit,
  };
};

export default useDApplicationForm;