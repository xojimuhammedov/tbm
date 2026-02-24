import { buildBasePayload } from "../utils/commonPayload";
import { safeArray } from "../utils/common";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const buildUpdatePayloadContract = (data: any) => {
  const updateType = data.payload?.update?.update_type;

  if (updateType === "channels") {
    return {
      channels: safeArray(data.payload?.update?.flow_ids).map((row: any) => ({
        old: row.old ?? "",
        new: row.new ?? "",
      })),
      // contract bo‘yicha flows bo‘lmasa ham bo‘ladi, lekin aniq qilish uchun:
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
      })),
    };
  }

  return undefined;
};

const h1745: Handler = {
  /**
   * API (editData.payload) -> UI
   * API contract:
   * payload.create.flow_ids: [{code, point_a, point_b, signal_level, port_a, port_b, device_a, device_b}]
   * payload.update.channels: [{old: string, new: string}]
   * payload.update.flows: [{...}]
   * payload.delete.elements: [string]
   */
  populate: (form, payload, ctx) => {
    const basic = payload.basic || {};

    form.setValue(
      "payload.basic.organization_name",
      basic.organization_name ?? "",
    );
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.deadline", basic.deadline ?? null);
    form.setValue("payload.basic.justification", basic.justification ?? "");
    form.setValue("payload.basic.signal_level", basic.signal_level ?? "");
    form.setValue("payload.basic.actions", safeArray<string>(basic.actions));

    // base_file (agar edit payloadda bo‘lsa)
    // UI'da sen data.payload.file_name ishlatyapsan, shu joyda ham o‘sha fieldni to‘ldiramiz:
    form.setValue(
      "payload.file_name",
      basic.base_file ?? payload?.file_name ?? "",
    );

    // create.flow_ids
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
        id_exist: null, // UI helper
      }));
      form.setValue("payload.create.flow_ids", rows);
    } else {
      form.setValue("payload.create.flow_ids", []);
    }

    // update
    const apiChannels = safeArray(payload.update?.channels);
    const apiFlows = safeArray(payload.update?.flows);

    if (apiChannels.length > 0) {
      form.setValue("payload.update.update_type", "channels");
      const rows = apiChannels.map((ch: any) => ({
        old_code: ch?.old ?? "",
        new_code: ch?.new ?? "",
        // UI'da old_int/new_int bo‘lsa ham, contractda yo‘q — bo‘sh qoldiramiz
        old_int: "",
        new_int: "",
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
        // UI'da signal_level ishlatilsa — editda yo‘q bo‘lsa bo‘sh
        signal_level: fl?.signal_level ?? "",
      }));
      form.setValue("payload.update.flow_ids", rows);
    } else {
      form.setValue("payload.update.update_type", "");
      form.setValue("payload.update.flow_ids", []);
    }

    // delete.elements
    const delElements = safeArray<string>(payload.delete?.elements);
    ctx.setCurrentIds(delElements);
    // UI'da sendagi defaultValues payload.delete.channels edi.
    // Lekin contract elements, shuning uchun UI ham elements bo‘lishi kerak:
    form.setValue("payload.delete.elements", delElements);
  },

  /**
   * UI -> API (contract)
   */
  build: (data, ctx) => {
    const actions = safeArray<string>(data.payload?.basic?.actions);

    const updatePayload = actions.includes("update")
      ? buildUpdatePayloadContract(data)
      : undefined;

    const createPayload = actions.includes("create")
      ? {
          flow_ids:
            data.payload.create?.flow_ids?.map(
              ({ id_exist, ...rest }: any) => rest,
            ) || [],
        }
      : undefined;

    const deletePayload = actions.includes("delete")
      ? {
          elements: ctx.currentIds || [],
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
          // base_file (sen file_name dan olayapsan)
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
