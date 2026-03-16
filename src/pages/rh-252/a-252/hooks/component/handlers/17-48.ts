import { buildBasePayload } from "../utils/commonPayload";
import { formatToISO } from "../utils/time";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1748: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.title", basic.title ?? payload.title ?? "");
    form.setValue("payload.basic.start_time", basic.start_time ?? payload.start_time ?? "");
    form.setValue("payload.basic.end_time", basic.end_time ?? payload.end_time ?? "");
    
    setTimeout(() => {
      form.setValue("payload.concert_second", payload.concert_second ?? "", { shouldDirty: true });
      form.setValue("payload.content", payload.content ?? "", { shouldDirty: true });
      form.setValue("payload.including", payload.including ?? "", { shouldDirty: true });
      form.setValue("payload.main_routes", payload.main_routes ?? "", { shouldDirty: true });
      form.setValue("payload.reserve_routes", payload.reserve_routes ?? "", { shouldDirty: true });
      form.setValue("payload.stopped_flows", payload.stopped_flows || [], { shouldDirty: true });
      form.setValue("payload.responsible_person", payload.responsible_person ?? "", { shouldDirty: true });
      form.setValue("payload.concert_text", payload.concert_text ?? "", { shouldDirty: true });
      form.setValue("payload.basis", payload.basis ?? "", { shouldDirty: true });
    }, 0);
    // file_name is intentionally omitted to require re-upload on edit
  },

  build: (data, ctx) => ({
    ...buildBasePayload(data, ctx.fullCode),
    payload: {
      basic: {
        title: data.payload.basic.title,
        start_time: formatToISO(data.payload.basic.start_time),
        end_time: formatToISO(data.payload.basic.end_time),
        ...(data.payload.file_name ? { base_file: data.payload.file_name } : {}),
      },
      content: data.payload.content,
      concert_second: data.payload.concert_second,
      including: data.payload.including,
      main_routes: data.payload.main_routes,
      reserve_routes: data.payload.reserve_routes,
      stopped_flows: data.payload.stopped_flows || [],
      responsible_person: data.payload.responsible_person,
      concert_text: data.payload.concert_text,
      basis: data.payload.basis,
    },
  }),
};

export default h1748;
