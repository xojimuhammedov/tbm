import { buildBasePayload } from "../utils/commonPayload";
import { safeArray } from "../utils/common";
import {Handler} from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1733: Handler = {
    populate: (form, payload, ctx) => {
        const basic = payload.basic || {};
        form.setValue("payload.basic.organization_name", basic.organization_name ?? "");
        form.setValue("payload.basic.request_number", basic.request_number ?? "");
        form.setValue("payload.basic.request_date", basic.request_date ?? null);
        form.setValue("payload.basic.deadline", basic.deadline ?? null);
        form.setValue("payload.basic.justification", basic.justification ?? "");

        const delChannels = safeArray<string>(payload.delete?.channels);
        ctx.setCurrentIds(delChannels);
        form.setValue("payload.delete.channels", delChannels);
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
                base_file: data.payload.file_name || "",
            },
            delete: {
                elements: ctx.currentIds || [],
            },
        },
    }),
};

export default h1733;
