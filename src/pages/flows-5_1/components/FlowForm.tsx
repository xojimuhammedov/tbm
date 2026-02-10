import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useFlowForm from "@/pages/flows-5_1/hooks/useFlowForm.ts";
import { FlowDto } from "@/pages/flows-5_1/schemas/createFlowSchema.ts";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FlowFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const FlowForm = ({ id, onSave, readOnly = false }: FlowFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit } = useFlowForm({ id, onSave });
  const navigate = useNavigate();
  const title = id
      ? `${t("Edit")} ${t("Flows(5_1)")}`
      : `${t("Create")} ${t("Flows(5_1)")}`;

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <h2 className={"text-xl font-medium"}>{title}</h2>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
            <MyInput<FlowDto>
                control={form.control}
                name={"flow_code"}
                label={t("ID ОУТС")}
                placeholder={t("Enter ID ОУТС")}
                required
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"column1"}
                label={t("Column 1")}
                placeholder={t("Enter Column 1")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"international"}
                label={t("International")}
                placeholder={t("Enter international")}
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"forward"}
                label={t("Forward")}
                placeholder={t("Enter forward")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"reverse"}
                label={t("Reverse")}
                placeholder={t("Enter reverse")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"start"}
                label={t("Start")}
                placeholder={t("Enter start date")}
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"port_a"}
                label={t("Port A")}
                placeholder={t("Enter Port A")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"mux_a"}
                label={t("MUX A")}
                placeholder={t("Enter MUX A")}
                required
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"pa"}
                label={t("PA")}
                placeholder={t("Enter PA")}
                required
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"final_ms_name"}
                label={t("Final MS name")}
                placeholder={t("Enter final MS name")}
                required
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"signal_transmission_level"}
                label={t("Signal transmission level")}
                placeholder={t("Enter signal transmission level")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"au4"}
                label={t("AU4")}
                placeholder={t("Enter AU4")}
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"ts"}
                label={t("TS")}
                placeholder={t("Enter TS")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"pb"}
                label={t("PB")}
                placeholder={t("Enter PB")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"transit"}
                label={t("Transit")}
                placeholder={t("Enter transit")}
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"mux_b"}
                label={t("MUX B")}
                placeholder={t("Enter MUX B")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"port_b"}
                label={t("Port B")}
                placeholder={t("Enter Port B")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"end"}
                label={t("End")}
                placeholder={t("Enter end date")}
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"consumer"}
                label={t("Consumer")}
                placeholder={t("Enter consumer")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"order_number"}
                label={t("Order number")}
                placeholder={t("Enter order number")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"interest_level"}
                label={t("Interest level")}
                placeholder={t("Enter interest level")}
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"mt"}
                label={t("MT")}
                placeholder={t("Enter MT")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"speed"}
                label={t("Speed")}
                placeholder={t("Enter speed")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"protection_mode"}
                label={t("Protection mode")}
                placeholder={t("Enter protection mode")}
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"sp"}
                label={t("SP")}
                placeholder={t("Enter SP")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"additional_information"}
                label={t("Additional information")}
                placeholder={t("Enter additional information")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"payment_status"}
                label={t("Payment status")}
                placeholder={t("Enter payment status")}
                disabled={readOnly}
            />

            <MyInput<FlowDto>
                control={form.control}
                name={"e1_name_in_vs"}
                label={t("E1 name in VS")}
                placeholder={t("Enter E1 name in VS")}
                disabled={readOnly}
            />
            <MyInput<FlowDto>
                control={form.control}
                name={"ms_name_in_vs"}
                label={t("MS name in VS")}
                placeholder={t("Enter MS name in VS")}
                disabled={readOnly}
            />
          </div>
          {!readOnly && (
              <FormContainerFooter>
                <Button
                    size={"sm"}
                    variant={"ghost"}
                    type={"button"}
                    onClick={() => navigate("/flows-5_1")}
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

export default FlowForm;