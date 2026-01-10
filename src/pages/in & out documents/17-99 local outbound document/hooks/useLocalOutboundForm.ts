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
  createLocalOutboundSchema,
  LocalOutboundDto
} from "@/pages/in & out documents/17-99 local outbound document/schemas/createChannelSchema.ts";
import {
  LocalOutboundInterface
} from "@/pages/in & out documents/17-99 local outbound document/interfaces/local.outbound.interface.ts";
import {
  LOCAL_OUTBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-99 local outbound document/constants/local.outbound.constants.ts";

export type ExternalOutboundFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useLocalOutboundForm = ({
                                  id,
                                  onSave,
                                }: ExternalOutboundFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(
      () => createLocalOutboundSchema(t),
      [t],
  );
  const form = useForm<LocalOutboundDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: LocalOutboundInterface }>({
    url: [LOCAL_OUTBOUND_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [LOCAL_OUTBOUND_QUERY_KEY, id || ""],
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
              ? t("Local outbound updated successfully")
              : t("Local outbound created successfully"),
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
        recipient_address: item.recipient_address,
        summary: item.summary,
        notes: item.notes,
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
      (data: LocalOutboundDto) => {
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

export default useLocalOutboundForm;
