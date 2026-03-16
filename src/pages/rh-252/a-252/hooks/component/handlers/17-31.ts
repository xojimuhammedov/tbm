import { buildBasePayload } from "../utils/commonPayload";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1731: Handler = {
  populate: (_form, _payload) => {
    // file_name is intentionally omitted to require re-upload on edit
  },

  build: (data, ctx) => ({
    ...buildBasePayload(data, ctx.fullCode),
    payload: {
      ...(data.payload.file_name ? { file_name: data.payload.file_name } : {}),
    },
  }),
};

export default h1731;
