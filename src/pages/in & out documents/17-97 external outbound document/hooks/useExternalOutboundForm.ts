import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { EXTERNAL_OUTBOUND_QUERY_KEY } from "@/pages/in & out documents/17-97 external outbound document/constants/external.outbound.constants.ts";
import {
  createExternalOutboundSchema,
  ExternalOutboundDto,
} from "@/pages/in & out documents/17-97 external outbound document/schemas/createExternalOutboundSchema.ts";
import { ExternalOutboundInterface } from "@/pages/in & out documents/17-97 external outbound document/interfaces/external.outbound.interface.ts";

export type ExternalOutboundFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useExternalOutboundForm = ({ id, onSave }: ExternalOutboundFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createExternalOutboundSchema(t), [t]);
  const form = useForm<ExternalOutboundDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: ExternalOutboundInterface }>({
    url: [EXTERNAL_OUTBOUND_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [EXTERNAL_OUTBOUND_QUERY_KEY, id || ""],
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
            ? t("External outbound updated successfully")
            : t("External outbound created successfully"),
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
        external_out_doc_number: item.external_out_doc_number,
        recipient: item.recipient,
        summary: item.summary,
        response_reference_number: item.response_reference_number,
        external_inbound_id: item.external_inbound_id,
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: ExternalOutboundDto) => {
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

export default useExternalOutboundForm;
