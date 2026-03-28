import { buildBasePayload } from "../utils/commonPayload";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1754: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue(
      "payload.basic.organization_name",
      basic.organization_name ?? payload.organization_name ?? "",
    );
    form.setValue(
      "payload.basic.request_number",
      basic.request_number ?? payload.request_number ?? "",
    );
    form.setValue(
      "payload.basic.request_date",
      basic.request_date ?? payload.request_date ?? null,
    );
    form.setValue(
      "payload.basic.justification",
      basic.justification ?? payload.justification ?? "",
    );
    form.setValue(
      "payload.basic.context",
      basic.context ?? payload.context ?? "",
    );

    const events =
      payload.events?.length > 0
        ? payload.events
        : payload.events_pending || [];
    setTimeout(() => {
      form.setValue("payload.events", events, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }, 0);
  },

  build: (data, ctx) => ({
    ...buildBasePayload(data, ctx.fullCode),
    payload: {
      basic: {
        organization_name: data.payload.basic.organization_name,
        request_number: data.payload.basic.request_number,
        request_date: data.payload.basic.request_date,
        justification: data.payload.basic.justification,
        context: data.payload.basic.context,
        ...(data.payload.file_name
          ? { base_file: data.payload.file_name }
          : {}),
      },
      events: data.payload.events || [],
    },
  }),
};

export default h1754;
