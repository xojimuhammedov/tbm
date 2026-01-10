import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import {
  EXTERNAL_INBOUND_QUERY_KEY,
} from "@/pages/in & out documents/17-96 external inbound document/constants/external-inbound.constants.ts";
import {
  createExternalInboundSchema,
  ExternalInboundDto,
} from "@/pages/in & out documents/17-96 external inbound document/schemas/createExternalInboundSchema.ts";
import {
  ExternalInboundDocument,
} from "@/pages/in & out documents/17-96 external inbound document/interfaces/ex-in.interface.ts";

export type ExternalInboundFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useExternalInboundForm = ({
  id,
  onSave,
}: ExternalInboundFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(
    () => createExternalInboundSchema(t),
    [t],
  );
  const form = useForm<ExternalInboundDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: ExternalInboundDocument }>({
    url: [EXTERNAL_INBOUND_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [EXTERNAL_INBOUND_QUERY_KEY, id || ""],
    method: id
      ? MutateRequestMethod.PUT
      : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(
            get(error, "response.statusText", "Error"),
          ),
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
            ? t("External inbound updated successfully")
            : t("External inbound created successfully"),
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
    if (item) {
      form.reset({
        reg_num: item.reg_num,
        reg_date: formatDate(item.reg_date),
        journal_index: item.journal_index,
        reception_num: item.reception_num,
        reception_date: formatDate(item.reception_date),
        original_num: item.original_num,
        original_date: formatDate(item.original_date),
        doc_type: item.doc_type,
        organization: item.organization,
        content: item.content,
        assignee: item.assignee,
        resolution: item.resolution,
        deadline: formatDate(item.deadline),
        status: item.status,
        reply_order_date: formatDate(item.reply_order_date),
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: ExternalInboundDto) => {
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

export default useExternalInboundForm;
