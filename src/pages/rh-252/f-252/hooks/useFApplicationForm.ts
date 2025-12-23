import { useCallback, useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  createFApplicationSchema,
  FApplicationDto,
} from "../schemas/createFApplicationSchema";
import URLS from "@/shared/constants/urls";
import useFApplication from "@/pages/rh-252/f-252/hooks/useFApplication.ts";

export interface FApplicationFormProps {
  id?: string | null;
  onSave?: () => void;
}

const useFApplicationForm = ({ id, onSave }: FApplicationFormProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { applicationDocumentQuery } = useFApplication(id as string);
  const actionOptions = useMemo(
    () => [
      { label: t("Tashkil etish"), value: "create" },
      { label: t("Ko'chirish"), value: "update" },
      { label: t("O'chirish"), value: "delete" },
    ],
    [t],
  );

  const form = useForm<FApplicationDto>({
    resolver: zodResolver(createFApplicationSchema(t)),
    mode: "onChange",
    defaultValues: {
      request_number: "",
      ap_input: "",
      ubp_input: "",
      action_type: [],
      data: [
        {
          order_code: "",
          connection_established_date: "",
          connection_route_details: "",
          comment: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "data",
  });

  useEffect(() => {
    const item = applicationDocumentQuery.data?.data;
    if (item && id) {
      form.reset({
        request_number: item.request_number || "",
        ap_input: item.ap_input || "",
        ubp_input: item.ubp_input || "",
        action_type: item.action_type || [],
        data:
          item.data?.length > 0
            ? item.data
            : [
                {
                  order_code: "",
                  connection_established_date: "",
                  connection_route_details: "",
                  comment: "",
                },
              ],
      });
    }
  }, [applicationDocumentQuery.data, id, form]);

  const { query: save } = useMutate({
    url: [URLS.RH_F_Application, id || ""],
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
        navigate("/rh-252/f-252");
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

  const handleAppend = useCallback(() => {
    append({
      order_code: "",
      connection_established_date: "",
      connection_route_details: "",
      comment: "",
    });
  }, [append]);

  const handleRemove = useCallback(
    (index: number) => {
      if (fields.length > 1) {
        remove(index);
      }
    },
    [remove, fields.length],
  );

  const onSubmit = useCallback(
    (values: FApplicationDto) => {
      save.mutate(values);
    },
    [save],
  );

  return {
    form,
    fields,
    actionOptions,
    isLoading: save.isPending || applicationDocumentQuery.isFetching,
    handleAppend,
    handleRemove,
    onSubmit,
  };
};

export default useFApplicationForm;
