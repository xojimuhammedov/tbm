import { buildBasePayload } from "../utils/commonPayload";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1731: Handler = {
  populate: (form, payload) => {
    form.setValue("payload.file_name", payload.file_name ?? "");
  },

  build: (data, ctx) => ({
    ...buildBasePayload(data, ctx.fullCode),
    payload: {
      file_name: data.payload.file_name,
    },
  }),
};

export default h1731;
