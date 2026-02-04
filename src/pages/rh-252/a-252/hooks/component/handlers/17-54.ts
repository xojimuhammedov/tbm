import { buildBasePayload } from "../utils/commonPayload";
import {Handler} from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1754: Handler = {
    populate: (form, payload) => {
        const basic = payload.basic || {};
        form.setValue("payload.basic.organization_name", basic.organization_name ?? "");
        form.setValue("payload.basic.request_number", basic.request_number ?? "");
        form.setValue("payload.basic.request_date", basic.request_date ?? null);
        form.setValue("payload.basic.justification", basic.justification ?? "");
        form.setValue("payload.basic.context", basic.context ?? "");
        form.setValue("payload.events", payload.events || []);
    },

    build: (data, ctx) => ({
        ...buildBasePayload(data, ctx.fullCode),
        payload: {
            basic: {
                organization_name: data.payload.basic.organization_name,
                request_number: data.payload.basic.request_number,
                request_date: data.payload.basic.request_date,
                justification: data.payload.basic.justification,
                context: data.payload.basic.context,
                base_file: data.payload.file_name || "",
            },
            events: data.payload.events || [],
        },
    }),
};

export default h1754;
