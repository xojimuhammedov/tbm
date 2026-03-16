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

    form.setValue(
      "payload.basic.organization_name",
      basic.organization_name ?? "",
    );
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.deadline", basic.deadline ?? null);
    form.setValue("payload.basic.justification", basic.justification ?? "");
    form.setValue("payload.basic.signal_level", basic.signal_level ?? "");
    form.setValue("payload.basic.actions", safeArray<string>(basic.actions ?? payload.actions));
    form.setValue(
      "payload.basic.responsible_organizing",
      basic.responsible_organizing ?? payload.responsible_organizing ?? "",
    );
    form.setValue(
      "payload.basic.responsible_form_3_3",
      basic.responsible_form_3_3 ?? payload.responsible_form_3_3 ?? "",
    );

    // file_name is intentionally omitted to require re-upload on edit

    // 1. Create section
    const createSource = (payload.create?.flow_ids?.length > 0) 
      ? payload.create.flow_ids 
      : (payload.create_pending?.flow_ids || []);
      
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
        form.setValue("payload.create.flow_ids", rows, { shouldDirty: true, shouldValidate: true });
      }, 0);
    }

    // 2. Update section
    const updateSource = (payload.update?.channels?.length > 0 || payload.update?.flows?.length > 0)
      ? payload.update
      : (payload.update_pending || {});
      
    const apiChannels = safeArray(updateSource.channels);
    const apiFlows = safeArray(updateSource.flows);

    if (apiChannels.length > 0) {
      setTimeout(() => {
        form.setValue("payload.update.update_type", "channels", { shouldDirty: true });
        form.setValue("payload.update.flow_ids", apiChannels.map((ch: any) => ({
          old: ch?.old ?? "",
          new: ch?.new ?? ""
        })), { shouldDirty: true, shouldValidate: true });
      }, 0);
    } else if (apiFlows.length > 0) {
      const rows = apiFlows.map((fl: any) => {
        const item = fl.new || fl;
        return {
          code: item?.code ?? "",
          point_a: item?.point_a ?? "",
          point_b: item?.point_b ?? "",
          device_a: item?.device_a ?? "",
          device_b: item?.device_b ?? "",
          port_a: item?.port_a ?? "",
          port_b: item?.port_b ?? "",
          signal_level: item?.signal_level || fl?.signal_level || basic.signal_level || "",
          old_data: fl.old,
        };
      });
      setTimeout(() => {
        form.setValue("payload.update.update_type", "flows", { shouldDirty: true });
        form.setValue("payload.update.flow_ids", rows, { shouldDirty: true, shouldValidate: true });
      }, 0);
    }

    // 3. Delete section
    const deleteSource = (payload.delete?.elements?.length > 0 || payload.delete?.flow_ids?.length > 0)
      ? payload.delete
      : (payload.delete_pending || {});
      
    const deleteList = safeArray<any>(deleteSource.elements || deleteSource.flow_ids || []);
    
    if (deleteList.length > 0) {
      const delElements = deleteList.map((item) => 
        typeof item === "string" ? item : (item.code || item.value || "")
      ).filter(Boolean);
      
      const mappedForForm = delElements.map((id) => ({ value: id }));
      setTimeout(() => {
        form.setValue("payload.delete.flow_ids", mappedForForm, { shouldDirty: true, shouldValidate: true });
        ctx.setCurrentIds(delElements);
      }, 0);
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
          ...(data.payload.file_name ? { base_file: data.payload.file_name } : {}),
        },
        responsible_form_3_3: data.payload.basic.responsible_form_3_3 || "",
        ...(actions.includes("create")
          ? {
              responsible_organizing:
                data.payload.basic.responsible_organizing || "",
            }
          : {}),
        ...(createPayload ? { create: createPayload } : {}),
        ...(updatePayload ? { update: updatePayload } : {}),
        ...(deletePayload ? { delete: deletePayload } : {}),
      },
    };
  },
};

export default h1745;
