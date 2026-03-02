import { buildBasePayload } from "../utils/commonPayload";
import { safeArray } from "../utils/common";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const buildUpdatePayloadContract = (data: any) => {
  const updateType = data.payload?.update?.update_type;

  if (updateType === "channels") {
    return {
      channels: safeArray(data.payload?.update?.flow_ids).map((row: any) => ({
        old: row.old_code ?? row.old ?? "",
        new: row.new_code ?? row.new ?? "",
      })),
      flows: [],
    };
  }

  if (updateType === "flows") {
    return {
      channels: [],
      flows: safeArray(data.payload?.update?.flow_ids).map((row: any) => ({
        code: row.code || "",
        point_a: row.point_a || "",
        point_b: row.point_b || "",
        device_a: row.device_a || "",
        device_b: row.device_b || "",
        port_a: row.port_a || "",
        port_b: row.port_b || "",
        signal_level: row.signal_level || "",
      })),
    };
  }

  return undefined;
};
const h1745: Handler = {
  populate: (form, payload, ctx) => {
    const basic = payload.basic || {};

    form.setValue("payload.basic.organization_name", basic.organization_name ?? "");
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.deadline", basic.deadline ?? null);
    form.setValue("payload.basic.justification", basic.justification ?? "");
    form.setValue("payload.basic.signal_level", basic.signal_level ?? "");
    form.setValue("payload.basic.actions", safeArray<string>(basic.actions));

    form.setValue(
        "payload.file_name",
        basic.base_file ?? payload?.file_name ?? "",
    );

    if (payload.create?.flow_ids) {
      const rows = safeArray(payload.create.flow_ids).map((x: any) => ({
        code: x?.code ?? "",
        point_a: x?.point_a ?? "",
        point_b: x?.point_b ?? "",
        signal_level: x?.signal_level ?? "",
        port_a: x?.port_a ?? "",
        port_b: x?.port_b ?? "",
        device_a: x?.device_a ?? "",
        device_b: x?.device_b ?? "",
        id_exist: null,
      }));
      form.setValue("payload.create.flow_ids", rows);
    } else {
      form.setValue("payload.create.flow_ids", []);
    }

    const apiChannels = safeArray(payload.update?.channels);
    const apiFlows = safeArray(payload.update?.flows);

    if (apiChannels.length > 0) {
      form.setValue("payload.update.update_type", "channels");
      const rows = apiChannels.map((ch: any) => ({
        old_code: ch?.old ?? "",
        new_code: ch?.new ?? "",
      }));
      form.setValue("payload.update.flow_ids", rows);
    } else if (apiFlows.length > 0) {
      form.setValue("payload.update.update_type", "flows");
      const rows = apiFlows.map((fl: any) => ({
        code: fl?.code ?? "",
        point_a: fl?.point_a ?? "",
        point_b: fl?.point_b ?? "",
        device_a: fl?.device_a ?? "",
        device_b: fl?.device_b ?? "",
        port_a: fl?.port_a ?? "",
        port_b: fl?.port_b ?? "",
        signal_level: fl?.signal_level ?? "",
      }));
      form.setValue("payload.update.flow_ids", rows);
    }

    if (payload.delete?.elements) {
      const delElements = safeArray<string>(payload.delete.elements);
      const mappedForForm = delElements.map(id => ({ value: id }));
      form.setValue("payload.delete.flow_ids", mappedForForm);
      ctx.setCurrentIds(delElements);
    }
  },

  build: (data, ctx) => {
    const actions = safeArray<string>(data.payload?.basic?.actions);

    const updatePayload = actions.includes("update")
        ? buildUpdatePayloadContract(data)
        : undefined;

    const createPayload = actions.includes("create")
        ? {
          flow_ids: safeArray(data.payload.create?.flow_ids).map(
              ({ id_exist, ...rest }: any) => rest,
          ),
        }
        : undefined;

    const deletePayload = actions.includes("delete")
        ? {
          elements: safeArray(data.payload?.delete?.flow_ids)
              .map((item: any) => item.value)
              .filter((val: string) => val && val.trim() !== ""),
        }
        : undefined;

    return {
      ...buildBasePayload(data, ctx.fullCode),
      payload: {
        basic: {
          organization_name: data.payload.basic.organization_name,
          request_number: data.payload.basic.request_number,
          request_date: data.payload.basic.request_date,
          deadline: data.payload.basic.deadline,
          justification: data.payload.basic.justification,
          signal_level: data.payload.basic.signal_level,
          actions,
          base_file: data.payload.file_name || "",
        },
        ...(createPayload ? { create: createPayload } : {}),
        ...(updatePayload ? { update: updatePayload } : {}),
        ...(deletePayload ? { delete: deletePayload } : {}),
      },
    };
  },
};

export default h1745;