import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useChannelForm from "@/pages/channels-5_3/hooks/useChannelForm.ts";
import { ChannelDto } from "@/pages/channels-5_3/schemas/createChannelSchema.ts";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChannelFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const ChannelForm = ({ id, onSave, readOnly = false }: ChannelFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit } = useChannelForm({ id, onSave });
  const navigate = useNavigate();
  const title = id
    ? `${t("Edit")} ${t("Channels(5_3)")}`
    : `${t("Create")} ${t("Channels(5_3)")}`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<ChannelDto>
            control={form.control}
            name={"code"}
            label={t("Code")}
            placeholder={t("Enter code")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"stream_identifier"}
            label={t("Stream identifier")}
            placeholder={t("Enter stream identifier")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"international_stream_number"}
            label={t("International stream number")}
            placeholder={t("Enter international stream number")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"forward_stream_interaction_number"}
            label={t("Forward stream interaction number")}
            placeholder={t("Enter forward stream interaction number")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"reverse_stream_interaction_number"}
            label={t("Reverse stream interaction number")}
            placeholder={t("Enter reverse stream interaction number")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"rcpu_site_id_a"}
            label={t("RCPU site id A")}
            placeholder={t("Enter RCPU site id A")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"icm_a_stream"}
            label={t("ICM A stream")}
            placeholder={t("Enter ICM A stream")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"rcpu_site_id_z"}
            label={t("RCPU site id Z")}
            placeholder={t("Enter RCPU site id Z")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"icm_b_stream"}
            label={t("ICM B stream")}
            placeholder={t("Enter ICM B stream")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"channel_identifier"}
            label={t("Channel identifier")}
            placeholder={t("Enter channel identifier")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"channel_link"}
            label={t("Channel link")}
            placeholder={t("Enter channel link")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"channel_number_in_stream"}
            label={t("Channel number in stream")}
            placeholder={t("Enter channel number in stream")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"point_a_of_channel"}
            label={t("Point A of channel")}
            placeholder={t("Enter point A of channel")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"point_b_of_channel"}
            label={t("Point B of channel")}
            placeholder={t("Enter point B of channel")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"binding_node_a"}
            label={t("Binding node A")}
            placeholder={t("Enter binding node A")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"binding_node_b"}
            label={t("Binding node B")}
            placeholder={t("Enter binding node B")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"last_mile_track_consumer_mu_a"}
            label={t("Last mile track consumer MU A")}
            placeholder={t("Enter last mile track consumer MU A")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"last_mile_track_consumer_mu_b"}
            label={t("Last mile track consumer MU B")}
            placeholder={t("Enter last mile track consumer MU B")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"channel_consumer"}
            label={t("Channel consumer")}
            placeholder={t("Enter channel consumer")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"connection_number"}
            label={t("Connection number")}
            placeholder={t("Enter connection number")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"destination_index"}
            label={t("Destination index")}
            placeholder={t("Enter destination index")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"channel_organization_order_number"}
            label={t("Channel organization order number")}
            placeholder={t("Enter channel organization order number")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"channel_decommission_order_number"}
            label={t("Channel decommission order number")}
            placeholder={t("Enter channel decommission order number")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"channel_reserve"}
            label={t("Channel reserve")}
            placeholder={t("Enter channel reserve")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"channel_mode"}
            label={t("Channel mode")}
            placeholder={t("Enter channel mode")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"timeslot_number"}
            label={t("Timeslot number")}
            placeholder={t("Enter timeslot number")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"fac_group_bc"}
            label={t("FAC group BC")}
            placeholder={t("Enter FAC group BC")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"site_a"}
            label={t("Site A")}
            placeholder={t("Enter site A")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"ne_a_id"}
            label={t("NE A ID")}
            placeholder={t("Enter NE A ID")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"a_port_nms"}
            label={t("A Port NMS")}
            placeholder={t("Enter A Port NMS")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"site_z"}
            label={t("Site Z")}
            placeholder={t("Enter site Z")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"ne_z_id"}
            label={t("NE Z ID")}
            placeholder={t("Enter NE Z ID")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"z_port_nms"}
            label={t("Z Port NMS")}
            placeholder={t("Enter Z Port NMS")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"order_number"}
            label={t("Order number")}
            placeholder={t("Enter order number")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"stream_consumer"}
            label={t("Stream consumer")}
            placeholder={t("Enter stream consumer")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"fac_protection_mode"}
            label={t("FAC protection mode")}
            placeholder={t("Enter FAC protection mode")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"additional_information"}
            label={t("Additional information")}
            placeholder={t("Enter additional information")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"additional_consumer_information"}
            label={t("Additional consumer information")}
            placeholder={t("Enter additional consumer information")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"phone_numbers"}
            label={t("Phone numbers")}
            placeholder={t("Enter phone numbers")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"consumer_2"}
            label={t("Consumer 2")}
            placeholder={t("Enter consumer 2")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"consumer_3"}
            label={t("Consumer 3")}
            placeholder={t("Enter consumer 3")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"payment_status"}
            label={t("Payment status")}
            placeholder={t("Enter payment status")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"responsibility_zone"}
            label={t("Responsibility zone")}
            placeholder={t("Enter responsibility zone")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"mux_belonging_site_a"}
            label={t("MUX belonging site A")}
            placeholder={t("Enter MUX belonging site A")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"mux_belonging_site_b"}
            label={t("MUX belonging site B")}
            placeholder={t("Enter MUX belonging site B")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"verification_by_letters_from_branches"}
            label={t("Verification by letters from branches")}
            placeholder={t("Enter verification by letters from branches")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"verification_result"}
            label={t("Verification result")}
            placeholder={t("Enter verification result")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"verification"}
            label={t("Verification")}
            placeholder={t("Enter verification")}
            required
            disabled={readOnly}
          />
        </div>
        {!readOnly && (
          <FormContainerFooter>
            <Button
              size={"sm"}
              variant={"ghost"}
              type={"button"}
              onClick={() => navigate("/channels-5_3")}
            >
              <ArrowLeftIcon />
              {t("Back")}
            </Button>
          </FormContainerFooter>
        )}
      </form>
    </Form>
  );
};

export default ChannelForm;
