import { buildBasePayload } from "../utils/commonPayload";
import { safeArray } from "../utils/common";
import { formatToISO } from "../utils/time";
import { Handler } from "@/pages/tbp/hujjatlar/hooks/component/types/types.ts";

// ─── Update payload builder ───────────────────────────────────────────────────

const buildUpdatePayload = (data: any) => {
  const update = data.payload?.update || {};
  const updateType = update.update_type;

  if (updateType === "channels") {
    return {
      channels: safeArray(update.channels).map((row: any) => ({
        old: row.old ?? "",
        new: row.new ?? "",
      })),
      flows: [],
    };
  }

  if (updateType === "flows") {
    return {
      channels: [],
      flows: safeArray(update.flows).map((row: any) => ({
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

// ─── Handler ─────────────────────────────────────────────────────────────────

const h1212: Handler = {
  // Populate form on edit
  populate: (form, payload, ctx) => {
    const basic = payload.basic || {};

    form.setValue("payload.basic.organization_name", basic.organization_name ?? "");
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.signal_level", basic.signal_level ?? "");
    form.setValue("payload.basic.actions", safeArray<string>(basic.actions ?? payload.actions));
    form.setValue("payload.basic.start_time", basic.start_time ?? "");
    form.setValue("payload.basic.description", basic.description ?? "");
    form.setValue("payload.basic.no_raqami", basic.no_raqami ?? "");
    // file re-upload required on edit
    // form.setValue("payload.basic.base_file", basic.base_file ?? "");

    // ── Create section ────────────────────────────────────────────────────────
    const createSource =
      payload.create?.flow_ids?.length > 0
        ? payload.create.flow_ids
        : payload.create_pending?.flow_ids || [];

    if (createSource.length > 0) {
      const rows = safeArray(createSource).map((x: any) => ({
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
      setTimeout(() => {
        form.setValue("payload.create.flow_ids", rows, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }, 0);
    }

    // ── Update section ────────────────────────────────────────────────────────
    const updateSource =
      payload.update?.channels?.length > 0 || payload.update?.flows?.length > 0
        ? payload.update
        : payload.update_pending || {};

    const apiChannels = safeArray(updateSource.channels);
    const apiFlows = safeArray(updateSource.flows);

    if (apiChannels.length > 0) {
      setTimeout(() => {
        form.setValue("payload.update.update_type", "channels", { shouldDirty: true });
        form.setValue("payload.update.channels", apiChannels.map((ch: any) => ({
          old: ch?.old ?? "",
          new: ch?.new ?? "",
        })), { shouldDirty: true, shouldValidate: true });
      }, 0);
    } else if (apiFlows.length > 0) {
      const rows = apiFlows.map((fl: any) => ({
        code: fl?.code ?? "",
        point_a: fl?.point_a ?? "",
        point_b: fl?.point_b ?? "",
        device_a: fl?.device_a ?? "",
        device_b: fl?.device_b ?? "",
        port_a: fl?.port_a ?? "",
        port_b: fl?.port_b ?? "",
      }));
      setTimeout(() => {
        form.setValue("payload.update.update_type", "flows", { shouldDirty: true });
        form.setValue("payload.update.flows", rows, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }, 0);
    }

    // ── Delete section ────────────────────────────────────────────────────────
    const deleteSource =
      payload.delete?.elements?.length > 0
        ? payload.delete
        : payload.delete_pending || {};

    const deleteList = safeArray<any>(deleteSource.elements || []);

    if (deleteList.length > 0) {
      const delElements = deleteList
        .map((item) =>
          typeof item === "string" ? item : item.code || item.value || "",
        )
        .filter(Boolean);

      const mappedForForm = delElements.map((id) => ({ value: id }));
      setTimeout(() => {
        form.setValue("payload.delete.elements", mappedForForm, {
          shouldDirty: true,
          shouldValidate: true,
        });
        ctx?.setCurrentIds?.(delElements);
      }, 0);
    }
  },

  // Build submit payload
  build: (data, ctx) => {
    const actions = safeArray<string>(data.payload?.basic?.actions);

    const createPayload = actions.includes("create")
      ? {
          flow_ids: safeArray(data.payload.create?.flow_ids).map(
            ({ id_exist, ...rest }: any) => rest,
          ),
        }
      : undefined;

    const updatePayload = actions.includes("update")
      ? buildUpdatePayload(data)
      : undefined;

    const deletePayload = actions.includes("delete")
      ? {
          elements: safeArray(data.payload?.delete?.elements)
            .map((item: any) => (typeof item === "string" ? item : item.value))
            .filter((val: string) => val && val.trim() !== ""),
        }
      : undefined;

    return {
      ...buildBasePayload(data, ctx.fullCode),
      payload: {
        basic: {
          organization_name: data.payload.basic.organization_name,
          request_date: formatToISO(data.payload.basic.request_date),
          request_number: data.payload.basic.request_number,
          signal_level: data.payload.basic.signal_level,
          actions,
          start_time: formatToISO(data.payload.basic.start_time),
          description: data.payload.basic.description || "",
          no_raqami: data.payload.basic.no_raqami || "",
          ...(data.payload.file_name ? { base_file: data.payload.file_name } : {}),
        },
        ...(createPayload ? { create: createPayload } : {}),
        ...(updatePayload ? { update: updatePayload } : {}),
        ...(deletePayload ? { delete: deletePayload } : {}),
      },
    };
  },
};

export default h1212;
