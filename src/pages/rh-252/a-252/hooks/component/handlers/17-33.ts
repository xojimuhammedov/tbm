import { buildBasePayload } from "../utils/commonPayload";
import { safeArray } from "../utils/common";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1733: Handler = {
  populate: (form, payload, ctx) => {
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
      "payload.basic.deadline",
      basic.deadline ?? payload.deadline ?? null,
    );
    form.setValue(
      "payload.basic.justification",
      basic.justification ?? payload.justification ?? "",
    );
    // file_name is intentionally omitted to require re-upload on edit

    const deleteSource =
      payload.delete?.elements?.length > 0 ||
      payload.delete?.flow_ids?.length > 0
        ? payload.delete
        : payload.delete_pending || {};

    const delElements = safeArray<any>(
      deleteSource.elements || deleteSource.flow_ids,
    );
    const mappedForForm = delElements.map((item: any) =>
      typeof item === "string" ? item : item.code || item.value || "",
    );

    setTimeout(() => {
      form.setValue("payload.delete.elements", mappedForForm, {
        shouldDirty: true,
      });
      ctx.setCurrentIds(mappedForForm);
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
        ...(data.payload.file_name
          ? { base_file: data.payload.file_name }
          : {}),
      },
      delete: {
        elements: data.payload.delete?.elements || [],
      },
    },
  }),
};

export default h1733;
