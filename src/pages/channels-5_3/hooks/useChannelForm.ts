import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { CHANNELS_5_3_QUERY_KEY } from "@/pages/channels-5_3/constants/channels.constants.ts";
import {
  createChannelSchema,
  ChannelDto,
} from "@/pages/channels-5_3/schemas/createChannelSchema.ts";
import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";

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
    url: [CHANNELS_5_3_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  const { query: save } = useMutate({
    url: [CHANNELS_5_3_QUERY_KEY, id || ""],
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
        stream_identifier: item.stream_identifier,
        international_stream_number: item.international_stream_number,
        forward_stream_interaction_number:
          item.forward_stream_interaction_number,
        reverse_stream_interaction_number:
          item.reverse_stream_interaction_number,
        rcpu_site_id_a: item.rcpu_site_id_a,
        icm_a_stream: item.icm_a_stream,
        rcpu_site_id_z: item.rcpu_site_id_z,
        icm_b_stream: item.icm_b_stream,
        channel_identifier: item.channel_identifier,
        channel_link: item.channel_link,
        channel_number_in_stream: item.channel_number_in_stream,
        point_a_of_channel: item.point_a_of_channel,
        point_b_of_channel: item.point_b_of_channel,
        binding_node_a: item.binding_node_a,
        binding_node_b: item.binding_node_b,
        last_mile_track_consumer_mu_a: item.last_mile_track_consumer_mu_a,
        last_mile_track_consumer_mu_b: item.last_mile_track_consumer_mu_b,
        channel_consumer: item.channel_consumer,
        connection_number: item.connection_number,
        destination_index: item.destination_index,
        channel_organization_order_number:
          item.channel_organization_order_number,
        channel_decommission_order_number:
          item.channel_decommission_order_number,
        channel_reserve: item.channel_reserve,
        channel_mode: item.channel_mode,
        timeslot_number: item.timeslot_number,
        fac_group_bc: item.fac_group_bc,
        site_a: item.site_a,
        ne_a_id: item.ne_a_id,
        a_port_nms: item.a_port_nms,
        site_z: item.site_z,
        ne_z_id: item.ne_z_id,
        z_port_nms: item.z_port_nms,
        order_number: item.order_number,
        stream_consumer: item.stream_consumer,
        fac_protection_mode: item.fac_protection_mode,
        additional_information: item.additional_information,
        additional_consumer_information: item.additional_consumer_information,
        phone_numbers: item.phone_numbers,
        consumer_2: item.consumer_2,
        consumer_3: item.consumer_3,
        payment_status: item.payment_status,
        responsibility_zone: item.responsibility_zone,
        mux_belonging_site_a: item.mux_belonging_site_a,
        mux_belonging_site_b: item.mux_belonging_site_b,
        verification_by_letters_from_branches:
          item.verification_by_letters_from_branches,
        verification_result: item.verification_result,
        verification: item.verification,
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
