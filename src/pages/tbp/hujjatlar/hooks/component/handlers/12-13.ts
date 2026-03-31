import { Handler } from "@/pages/tbp/hujjatlar/hooks/component/types/types.ts";
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
  },

  build: (data, ctx) => {
    return {
      code: ctx.fullCode || data.code || "12-13",
      order_date: data.order_date,
      to: Array.isArray(data.to) ? data.to : [],
      copy: Array.isArray(data.copy) ? data.copy : [],
      signer: data.signer,
      payload: {
        basic: {
          title: data.payload.basic.title,
          start_time: formatToISO(data.payload.basic.start_time),
          context: data.payload.basic.context,
          responsible: data.payload.basic.responsible,
        },
      },
    };
  },
};

export default h1213;
