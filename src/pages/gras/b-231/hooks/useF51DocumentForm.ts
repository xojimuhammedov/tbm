import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  createF51Schema,
  F51Dto,
} from "@/pages/rtsi/f-51/schemas/createF51Schema.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { get } from "lodash";
import { F51_QUERY_KEY } from "@/pages/rtsi/f-51/constants/f51.constants.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import useF51Document from "@/pages/rtsi/f-51/hooks/useF51Document.ts";
import useChannel from "@/pages/channels-5_3/hooks/useChannel.ts";

export interface UseF51DocumentFormParams {
  id?: string | null;
  onSave?: () => void;
}

const useF51DocumentForm = ({ id, onSave }: UseF51DocumentFormParams) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { f51DocumentQuery } = useF51Document(id as string);
  const form = useForm<F51Dto>({
    resolver: zodResolver(createF51Schema(t)),
    defaultValues: {
      prophylaxisType: "Yillik reja",
    },
  });

  const { channel } = useChannel(form.watch("channel_id") as string);

  useEffect(() => {
    const item = f51DocumentQuery.data?.data;
    if (item) {
      form.setValue("description", item.description);
      const ids = item.recipientIds?.map((p) => p._id) ?? [];
      form.setValue(
        "recipientIds",
        (ids.length > 0 ? ids : [""]) as [string, ...string[]],
      );
    }
  }, [f51DocumentQuery.data, form]);

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
    url: [F51_QUERY_KEY, id || ""],
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
            ? t(`F51 updated successfully`)
            : t(`F51 created successfully`),
        });
      },
    },
  });

  const handleSubmit = useCallback(
    (values: F51Dto) => {
      save.mutate(values);
    },
    [save],
  );

  return {
    form,
    handleSubmit,
  };
};

export default useF51DocumentForm;
