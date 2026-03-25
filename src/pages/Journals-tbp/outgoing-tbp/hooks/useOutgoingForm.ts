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
  createOutgoingSchema,
  OutgoingDto,
} from "@/pages/Journals/outgoing/schemas/createOutgoingSchema.ts";
import { OUTGOING_QUERY_KEY } from "@/pages/Journals/outgoing/constants/outgoing.constants.ts";
import { OutgoingInterface } from "@/pages/Journals/outgoing/interfaces/outgoing.interface.ts";

export type OutgoingFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useOutgoingForm = ({ id, onSave }: OutgoingFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createOutgoingSchema(t), [t]);
  const form = useForm<OutgoingDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: OutgoingInterface }>({
    url: [OUTGOING_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [OUTGOING_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PATCH : MutateRequestMethod.POST,
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
        user_id: item.user._id || "",
        registration_date: formatDate(item.registration_date),
        summary: item.summary ?? "",
        doc_index: item.doc_index ?? "",
        recipient: item.recipient ?? "",
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: OutgoingDto) => {
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

export default useOutgoingForm;
