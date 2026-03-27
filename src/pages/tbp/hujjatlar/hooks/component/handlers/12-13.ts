import { Handler } from "@/pages/tbp/hujjatlar/hooks/component/types/types.ts";
import { buildBasePayload } from "../utils/commonPayload";
import { formatToISO } from "../utils/time";

const h1213: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};

    const titleFromApi = basic.title ?? payload.title ?? "";
    const normalizedTitle = (() => {
      if (typeof basic.is_ban === "boolean") {
        return basic.is_ban ? "BAN" : "BAN_REMOVE";
      }

      const lowerTitle = String(titleFromApi).toLowerCase();
      if (lowerTitle.includes("taqiq") && /yo'?q|bekor/.test(lowerTitle)) {
        return "BAN_REMOVE";
      }
      if (lowerTitle.includes("taqiq")) {
        return "BAN";
      }

      return titleFromApi;
    })();

    form.setValue("payload.basic.title", normalizedTitle, {
      shouldDirty: true,
    });
    form.setValue(
      "payload.basic.start_time",
      basic.start_time ?? payload.start_time ?? "",
      { shouldDirty: true },
    );
    form.setValue("payload.basic.orientation", basic.orientation ?? "", {
      shouldDirty: true,
    });
    form.setValue(
      "payload.basic.context",
      basic.context ?? payload.context ?? "",
      { shouldDirty: true },
    );
    form.setValue(
      "payload.basic.responsible",
      basic.responsible ?? payload.responsible ?? "",
      { shouldDirty: true },
    );
    form.setValue(
      "payload.basic.base_file",
      basic.base_file ?? payload.base_file ?? "",
      { shouldDirty: true },
    );

    // Try consumers, then consumers_pending
    let consumers = payload.consumers || [];
    if (!Array.isArray(consumers) || consumers.length === 0) {
      consumers = payload.consumers_pending || [];
    }

    const formatted = Array.isArray(consumers)
      ? consumers
          .map((item: any) =>
            typeof item === "string" ? item : item.code || item._id || item,
          )
          .filter(Boolean)
      : [];

    form.setValue("payload.consumers", formatted, {
      shouldDirty: true,
      shouldValidate: true,
    });
  },

  build: (data, ctx) => {
    const basePayload = buildBasePayload(data, ctx.fullCode);
    return {
      ...basePayload,
      code: basePayload.code || "12-13",
      payload: {
        basic: {
          title: data.payload.basic.title,
          start_time: formatToISO(data.payload.basic.start_time),
          orientation: data.payload.basic.orientation,
          context: data.payload.basic.context,
          responsible: data.payload.basic.responsible,
          base_file: data.payload.file_name || "",
        },
        consumers: data.payload.consumers || [],
      },
    };
  },
};

export default h1213;
