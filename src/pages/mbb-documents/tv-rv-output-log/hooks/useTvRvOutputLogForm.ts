import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { TV_RV_OUTPUT_LOG_QUERY_KEY } from "../constants/tv-rv-output-log.constants";
import {
  createTvRvOutputLogSchema,
  TvRvOutputLogDto,
} from "../schemas/createTvRvOutputLogSchema";
import { TvRvOutputLogDocument } from "../interfaces/tv-rv-output-log.interface";

export type TvRvOutputLogFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useTvRvOutputLogForm = ({ id, onSave }: TvRvOutputLogFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createTvRvOutputLogSchema(t), [t]);
  const form = useForm<TvRvOutputLogDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      signed_by: {
        full_name: "",
        signature: "",
      },
    },
  });
  const query = useGetOne<{ data: TvRvOutputLogDocument }>({
    url: [TV_RV_OUTPUT_LOG_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [TV_RV_OUTPUT_LOG_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(get(error, "response.statusText", "Error")),
          description: t(
            get(
              error,
              "response.data.message",
              "An error occurred. Contact the administrator",
            ),
          ),
        });
      },
      onSuccess: () => {
        form.reset();
        onSave?.();
        toast({
          variant: "success",
          title: t("Success"),
          description: id
            ? t("TV/RV output log updated successfully")
            : t("TV/RV output log created successfully"),
        });
      },
    },
  });
  useEffect(() => {
    const item = query.data?.data;
    const formatDate = (dateString?: string | null) => {
      if (!dateString) return "";
      return dateString.split("T")[0];
    };
    const formatDateTime = (dateString?: string | null) => {
      if (!dateString) return "";
      return dateString.slice(0, 16);
    };
    if (item) {
      form.reset({
        record_date: formatDate(item.record_date),
        output_type: item.output_type,
        tv_output_section: item.tv_output_section,
        planned_time: formatDateTime(item.planned_time),
        actual_time: formatDateTime(item.actual_time),
        recipient_address: item.recipient_address,
        transferred_to: item.transferred_to,
        tv_output_result: item.tv_output_result,
        signed_by: {
          full_name: item.signed_by?.full_name || "",
          signature: item.signed_by?.signature || "",
        },
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: TvRvOutputLogDto) => {
      save.mutate(data);
    },
    [save],
  );
  return {
    form,
    onSubmit,
    isLoading: query.isLoading || save.isPending,
  };
};

export default useTvRvOutputLogForm;
