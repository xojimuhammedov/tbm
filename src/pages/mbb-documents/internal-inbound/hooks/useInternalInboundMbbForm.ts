import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { INTERNAL_INBOUND_MBB_QUERY_KEY } from "@/pages/mbb-documents/internal-inbound/constants/internal-inbound-mbb.constants";
import {
  createInternalInboundMbbSchema,
  InternalInboundMbbDto,
} from "@/pages/mbb-documents/internal-inbound/schemas/createInternalInboundMbbSchema";
import { InternalInboundMbbDocument } from "@/pages/mbb-documents/internal-inbound/interfaces/internal-inbound-mbb.interface";

export type InternalInboundMbbFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useInternalInboundMbbForm = ({ id, onSave }: InternalInboundMbbFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createInternalInboundMbbSchema(t), [t]);
  const form = useForm<InternalInboundMbbDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: InternalInboundMbbDocument }>({
    url: [INTERNAL_INBOUND_MBB_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [INTERNAL_INBOUND_MBB_QUERY_KEY, id || ""],
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
            ? t("Internal inbound MBB updated successfully")
            : t("Internal inbound MBB created successfully"),
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
        recipient: item.recipient,
        summary: item.summary,
        order_id: item.order_id,
        organization: item.organization,
        content: item.content,
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: InternalInboundMbbDto) => {
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

export default useInternalInboundMbbForm;
