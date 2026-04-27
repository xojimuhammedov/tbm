import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { TELECOM_OPERATIVE_QUERY_KEY } from "../constants/telecom-operative.constants";
import {
  createTelecomOperativeSchema,
  TelecomOperativeDto,
} from "../schemas/createTelecomOperativeSchema";
import { TelecomOperativeDocument } from "../interfaces/telecom-operative.interface";

export type TelecomOperativeFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useTelecomOperativeForm = ({ id, onSave }: TelecomOperativeFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createTelecomOperativeSchema(t), [t]);
  const form = useForm<TelecomOperativeDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      kodogram: {
        status_index: "",
        ko_number: "",
        start_time: "",
        end_time: "",
      },
    },
  });
  const query = useGetOne<{ data: TelecomOperativeDocument }>({
    url: [TELECOM_OPERATIVE_QUERY_KEY, id || ""],
    options: { enabled: Boolean(id) },
  });
  const { query: save } = useMutate({
    url: [TELECOM_OPERATIVE_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(get(error, "response.statusText", "Error")),
          description: t(get(error, "response.data.message", "Xatolik yuz berdi")),
        });
      },
      onSuccess: () => {
        form.reset();
        onSave?.();
        toast({
          variant: "success",
          title: t("Success"),
          description: id
            ? t("Telecom operative updated successfully")
            : t("Telecom operative created successfully"),
        });
      },
    },
  });
  useEffect(() => {
    const item = query.data?.data;
    if (item) {
      form.reset({
        received_at: item.received_at?.slice(0, 16) || "",
        transmitted_at: item.transmitted_at?.slice(0, 16) || "",
        sender_address: item.sender_address,
        recipient_address: item.recipient_address,
        transferred_to: item.transferred_to,
        kodogram: {
          status_index: item.kodogram?.status_index || "",
          ko_number: item.kodogram?.ko_number || "",
          start_time: item.kodogram?.start_time?.slice(0, 16) || "",
          end_time: item.kodogram?.end_time?.slice(0, 16) || "",
        },
        content_info: item.content_info,
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: TelecomOperativeDto) => {
      save.mutate(data);
    },
    [save],
  );
  return { form, onSubmit, isLoading: query.isLoading || save.isPending };
};

export default useTelecomOperativeForm;
