import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { CHANNELS_ID_QUERY_KEY } from "@/pages/channels-id/constants/channels.constants.ts";
import {
  createChannelSchema,
  ChannelDto,
} from "@/pages/channels-id/schemas/createChannelSchema.ts";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface.ts";

export type ChannelFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useChannelForm = ({ id, onSave }: ChannelFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createChannelSchema(t), [t]);
  const form = useForm<ChannelDto>({
    resolver: zodResolver(schema),
  });

  const query = useGetOne<{ data: ChannelInterface }>({
    url: [CHANNELS_ID_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  const { query: save } = useMutate({
    url: [CHANNELS_ID_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(`${get(error, "response.statusText", "Error")}`),
          description: t(
            `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
          ),
        });
      },
      onSuccess: () => {
        form.reset();
        onSave?.();
        toast({
          variant: "success",
          title: t(`Success`),
          description: id
            ? t(`Channel updated successfully`)
            : t(`Channel created successfully`),
        });
      },
    },
  });

  useEffect(() => {
    const item = query.data?.data;
    if (item) {
      form.reset({
        code: item.code,
        consumer_name: item.consumer_name,
        connection_number: item.connection_number,
        point_a: item.point_a,
        point_b: item.point_b,
        link_N1: item.link_N1,
        organization_order_number: item.organization_order_number,
        deciphering_notes: item.deciphering_notes,
        is_archived: item.is_archived,
        verification_status: item.verification_status,
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: ChannelDto) => {
      save.mutate(data);
    },
    [save],
  );

  return {
    form,
    onSubmit,
  };
};

export default useChannelForm;
