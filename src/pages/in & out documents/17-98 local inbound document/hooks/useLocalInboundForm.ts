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
  createLocalInboundSchema,
  LocalInboundDto
} from "@/pages/in & out documents/17-98 local inbound document/schemas/createLocalInboundSchema.ts";
import {
  LocalInboundInterface
} from "@/pages/in & out documents/17-98 local inbound document/interfaces/local.inbound.interface.ts";
import {
  LOCAL_INBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-98 local inbound document/constants/local.inbound.constants.ts";

export type LocalInboundFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useLocalInboundForm = ({
                                  id,
                                  onSave,
                                }: LocalInboundFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(
      () => createLocalInboundSchema(t),
      [t],
  );
  const form = useForm<LocalInboundDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: LocalInboundInterface }>({
    url: [LOCAL_INBOUND_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [LOCAL_INBOUND_QUERY_KEY, id || ""],
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
              ? t("Local inbound updated successfully")
              : t("Local inbound created successfully"),
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
        // order_id: item.order_id,
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
      (data: LocalInboundDto) => {
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

export default useLocalInboundForm;
