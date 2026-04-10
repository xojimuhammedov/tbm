import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import useApplicationDocumentB from "@/pages/mbb/rh-3_3/hooks/useBApplication.ts";
import {
  createNum3ApplicationSchema,
  Num3ApplicationDto,
} from "@/pages/mbb/rh-3_3/schemas/createNum3ApplicationSchema.ts";
import URLS from "@/shared/constants/urls.ts";

export interface Num3ApplicationFormProps {
  id?: string | null;
  onSave?: () => void;
}

const useNum3ApplicationForm = ({
  id,
  onSave,
}: Num3ApplicationFormProps = {}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { applicationDocumentQuery } = useApplicationDocumentB(id as string);

  const form = useForm<Num3ApplicationDto>({
    resolver: zodResolver(createNum3ApplicationSchema(t)),
    mode: "onChange",
    defaultValues: {
      code: "",
      title: "",
      signer: "",
      data: [
        {
          order_code: "",
          assigned_time: "",
          completed_time: "",
          responsible_executor: "",
          customer_details: "",
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
        code: item.code || "",
        title: item.title || "",
        signer: item.signer || "",
        data:
          item.data?.length > 0
            ? item.data
            : [
                {
                  order_code: "",
                  assigned_time: "",
                  completed_time: "",
                  responsible_executor: "",
                  customer_details: "",
                  comment: "",
                },
              ],
      });
    }
  }, [applicationDocumentQuery.data, id, form]);

  const { query: save } = useMutate({
    url: [URLS.RH_B_Application, id || ""],
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
        navigate("/mbb/rh-3_3");
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
  // ...

  const handleAppend = useCallback(() => {
    append({
      order_code: "",
      assigned_time: "",
      completed_time: "",
      responsible_executor: "",
      customer_details: "",
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
    (values: Num3ApplicationDto) => {
      const formattedValues = {
        ...values,
        data: values.data?.map(item => ({
          ...item,
          assigned_time: item.assigned_time instanceof Date 
            ? dayjs(item.assigned_time).format('DD.MM.YYYY')
            : item.assigned_time,
          completed_time: item.completed_time instanceof Date 
            ? dayjs(item.completed_time).format('DD.MM.YYYY')
            : item.completed_time
        }))
      };
      save.mutate(formattedValues);
    },
    [save],
  );

  return {
    form,
    fields,
    isLoading: save.isPending || applicationDocumentQuery.isFetching,
    handleAppend,
    handleRemove,
    onSubmit,
  };
};

export default useNum3ApplicationForm;
