import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  createF54Schema,
  F54Dto,
} from "@/pages/rtsi/f-54/schemas/createF54Schema.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { get } from "lodash";
import { F54_QUERY_KEY } from "@/pages/rtsi/f-54/constants/f54.constants.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import useF54Document from "@/pages/rtsi/f-54/hooks/useF54Document.ts";
import useChannel from "@/pages/channels-5_3/hooks/useChannel.ts";

export interface UseF54DocumentFormParams {
  id?: string | null;
  onSave?: () => void;
}

const useF54DocumentForm = ({ id, onSave }: UseF54DocumentFormParams) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { f54DocumentQuery } = useF54Document(id as string);
  const form = useForm<F54Dto>({
    resolver: zodResolver(createF54Schema(t)),
    defaultValues: {
      prophylaxisType: "Yillik reja",
    },
  });

  const { channel } = useChannel(form.watch("channel_id") as string);

  useEffect(() => {
    const item = f54DocumentQuery.data?.data;
    if (item) {
      form.setValue("channel_id", item.channel_id._id);
      form.setValue("real_minutes", item.real_minutes);
      form.setValue("date", item.date);
      form.setValue("minute", item.minute);
      form.setValue("date", item.date);
      form.setValue("prophylaxisType", item.prophylaxisType);
      form.setValue("cause", item.cause);
      form.setValue("ubpZone", item.ubpZone as [string, ...string[]]);
      form.setValue("note", item.note);
      form.setValue("description", item.description);
      const ids = item.recipientIds?.map((p) => p._id) ?? [];
      form.setValue(
        "recipientIds",
        (ids.length > 0 ? ids : [""]) as [string, ...string[]],
      );
    }
  }, [f54DocumentQuery.data, form]);

  useEffect(() => {
    if (channel) {
      form.setValue("noNumber", channel.channel_number_in_stream);
      form.setValue("teOeDesignation", channel.timeslot_number);
      form.setValue(
        "workArea",
        `${channel.rcpu_site_id_a}/${channel.rcpu_site_id_z}`,
      );
    }
  }, [channel]);

  const { query: save } = useMutate({
    url: [F54_QUERY_KEY, id || ""],
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
            ? t(`F54 updated successfully`)
            : t(`F54 created successfully`),
        });
      },
    },
  });

  const handleSubmit = useCallback(
    (values: F54Dto) => {
      save.mutate(values);
    },
    [save],
  );
  console.log(form.formState.errors);
  return {
    form,
    handleSubmit,
  };
};

export default useF54DocumentForm;
