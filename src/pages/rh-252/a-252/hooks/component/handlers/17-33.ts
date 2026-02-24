import { buildBasePayload } from "../utils/commonPayload";
import { safeArray } from "../utils/common";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1733: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue(
      "payload.basic.organization_name",
      basic.organization_name ?? "",
    );
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.deadline", basic.deadline ?? null);
    form.setValue("payload.basic.justification", basic.justification ?? "");
    form.setValue(
        "payload.file_name",
        basic.base_file ?? payload?.file_name ?? "",
    );


    const flowIds = safeArray(payload.delete?.flow_ids);
    const delElements = flowIds.map((item: any) =>
        typeof item === "string" ? item : item.code
    );

    setTimeout(() => {
      form.setValue("payload.delete.elements", delElements, { shouldDirty: true });
    }, 0);
  },

  build: (data, ctx) => ({
    ...buildBasePayload(data, ctx.fullCode),
    payload: {
      basic: {
        organization_name: data.payload.basic.organization_name,
        request_number: data.payload.basic.request_number,
        request_date: data.payload.basic.request_date,
        deadline: data.payload.basic.deadline,
        justification: data.payload.basic.justification,
        base_file: data.payload.file_name || "",
      },
      delete: {
        elements: data.payload.delete?.elements || [],
      },
    },
  }),
};

export default h1733;
