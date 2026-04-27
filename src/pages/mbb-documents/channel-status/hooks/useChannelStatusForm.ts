import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { CHANNEL_STATUS_QUERY_KEY } from "../constants/channel-status.constants";
import {
  createChannelStatusSchema,
  ChannelStatusDto,
} from "../schemas/createChannelStatusSchema";
import { ChannelStatusDocument } from "../interfaces/channel-status.interface";

export type ChannelStatusFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useChannelStatusForm = ({ id, onSave }: ChannelStatusFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createChannelStatusSchema(t), [t]);
  const form = useForm<ChannelStatusDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: ChannelStatusDocument }>({
    url: [CHANNEL_STATUS_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [CHANNEL_STATUS_QUERY_KEY, id || ""],
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
            ? t("Channel status updated successfully")
            : t("Channel status created successfully"),
        });
      },
    },
  });
  useEffect(() => {
    const item = query.data?.data;
    const formatDateTime = (dateString?: string | null) => {
      if (!dateString) return "";
      return dateString.slice(0, 16);
    };
    if (item) {
      form.reset({
        device_type: item.device_type,
        point_name: item.point_name,
        duty_officer: item.duty_officer,
        ko_status_at_shift_handover: item.ko_status_at_shift_handover,
        shift_handover_at: formatDateTime(item.shift_handover_at),
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: ChannelStatusDto) => {
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

export default useChannelStatusForm;
