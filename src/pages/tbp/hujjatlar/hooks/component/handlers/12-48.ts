import { Handler } from "@/pages/tbp/hujjatlar/hooks/component/types/types.ts";
import { buildBasePayload } from "../utils/commonPayload";
import { formatToISO } from "../utils/time";

const h1248: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.title", basic.title ?? payload.title ?? "");
    form.setValue(
      "payload.basic.station_interval",
      basic.station_interval ?? "",
    );
    form.setValue("payload.basic.cause", basic.cause ?? "");
    form.setValue("payload.basic.control_station", basic.control_station ?? "");
    form.setValue("payload.basic.agreed", basic.agreed ?? "");
    form.setValue("payload.basic.requirement_ip", basic.requirement_ip ?? "");
    form.setValue(
      "payload.basic.requirement_ip_date",
      basic.requirement_ip_date ?? null,
    );
    form.setValue(
      "payload.basic.requirement_user",
      basic.requirement_user?._id ?? basic.requirement_user ?? "",
    );
    form.setValue(
      "payload.basic.requirement_user_date",
      basic.requirement_user_date ?? null,
    );
    form.setValue(
      "payload.basic.connection_closure_type",
      basic.connection_closure_type ?? "",
    );
    form.setValue("payload.basic.start_time", basic.start_time ?? "");
    form.setValue("payload.basic.end_time", basic.end_time ?? "");

    const withAPause = payload.with_a_pause || payload.flow_ids || [];
    const formattedWithAPause = Array.isArray(withAPause)
      ? withAPause.map((item: any) => item.code || item)
      : [];
    form.setValue("payload.with_a_pause", formattedWithAPause, {
      shouldDirty: true,
    });
  },

  build: (data, ctx) => {
    const basePayload = buildBasePayload(data, ctx.fullCode);
    return {
      ...basePayload,
      code: basePayload.code || "12-48",
      payload: {
        basic: {
          title: data.payload.basic.title,
          station_interval: data.payload.basic.station_interval,
          cause: data.payload.basic.cause,
          control_station: data.payload.basic.control_station,
          agreed: data.payload.basic.agreed,
          requirement_ip: data.payload.basic.requirement_ip,
          requirement_ip_date: formatToISO(
            data.payload.basic.requirement_ip_date,
          ),
          requirement_user: data.payload.basic.requirement_user,
          requirement_user_date: formatToISO(
            data.payload.basic.requirement_user_date,
          ),
          connection_closure_type: data.payload.basic.connection_closure_type,
          start_time: formatToISO(data.payload.basic.start_time),
          end_time: formatToISO(data.payload.basic.end_time),
          base_file: data.payload.file_name || "",
        },
        with_a_pause: data.payload.with_a_pause || [],
      },
    };
  },
};

export default h1248;