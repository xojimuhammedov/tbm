import { useCallback, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import usePostQuery from "@/shared/hooks/query/usePostQuery";
import { useToast } from "@/shared/hooks/useToast";
import URLS from "@/shared/constants/urls";
import KEYS from "@/shared/constants/keys";

export type Num3ApplicationFormProps = {
  id?: string | null;
  onSave?: () => void;
};

const useNum3ApplicationForm = ({ onSave }: Num3ApplicationFormProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Action options
  const actionOptions = useMemo(
    () => [
      { label: "Tashkil etish", value: "create" },
      { label: "Ko'chirish", value: "update" },
      { label: "O'chirish", value: "delete" },
    ],
    [],
  );

  // Form initialization
  const form = useForm<any>({
    defaultValues: {
      request_number: "",
      ap_input: "",
      ubp_input: "",
      action_type: [],
      data: [
        {
          order_code: "",
          execution_status: "",
          responsible_executor: "",
          customer_details: "",
          failure_reason: "",
          comment: "",
        },
      ],
    },
  });

  // Field array for dynamic rows
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "data",
  });

  // Mutation hook
  const { mutate, isLoading } = usePostQuery({
    listKeyId: KEYS.RH_B_Application,
  });

  // Handle append new row
  const handleAppend = useCallback(() => {
    append({
      order_code: "",
      execution_status: "",
      responsible_executor: "",
      customer_details: "",
      failure_reason: "",
      comment: "",
    });
  }, [append]);

  // Handle remove row
  const handleRemove = useCallback(
    (index: number) => {
      if (fields.length > 1) {
        remove(index);
      }
    },
    [remove, fields.length],
  );

  // Submit handler
  const onSubmit = useCallback(
    (data: any) => {
      mutate(
        {
          url: URLS.RH_B_Application,
          attributes: data,
        },
        {
          onSuccess: () => {
            form.reset();
            navigate("/rh-252/rh-3_3");
            toast({
              variant: "success",
              title: t(`Success`),
              description: t(`Application created successfully`),
            });
            onSave?.();
          },
          onError: (error: any) => {
            toast({
              variant: "destructive",
              title: t(`${get(error, "response.statusText", "Error")}`),
              description: t(
                `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
        },
      );
    },
    [mutate, form, navigate, toast, t, onSave],
  );

  return {
    form,
    fields,
    actionOptions,
    isLoading,
    handleAppend,
    handleRemove,
    onSubmit,
  };
};

export default useNum3ApplicationForm;
