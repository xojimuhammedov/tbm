import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { INTERNAL_OUTBOUND_MBB_QUERY_KEY } from "../constants/internal-outbound-mbb.constants";
import {
  createInternalOutboundMbbSchema,
  InternalOutboundMbbDto,
} from "../schemas/createInternalOutboundMbbSchema";
import { InternalOutboundMbbDocument } from "../interfaces/internal-outbound-mbb.interface";

export type InternalOutboundMbbFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useInternalOutboundMbbForm = ({ id, onSave }: InternalOutboundMbbFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createInternalOutboundMbbSchema(t), [t]);
  const form = useForm<InternalOutboundMbbDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: InternalOutboundMbbDocument }>({
    url: [INTERNAL_OUTBOUND_MBB_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [INTERNAL_OUTBOUND_MBB_QUERY_KEY, id || ""],
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
            ? t("Internal outbound MBB updated successfully")
            : t("Internal outbound MBB created successfully"),
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
        doc_num: item.doc_num,
        doc_date: formatDate(item.doc_date),
        recipient: item.recipient,
        summary: item.summary,
        response_reference_number: item.response_reference_number,
        internal_inbound_id: item.internal_inbound_id,
        assignee: item.assignee,
        deadline: formatDate(item.deadline),
        status: item.status,
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: InternalOutboundMbbDto) => {
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

export default useInternalOutboundMbbForm;
