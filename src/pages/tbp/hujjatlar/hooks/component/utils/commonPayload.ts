import { textToList } from "./list";

export const buildBasePayload = (data: any, fullCode: string) => ({
  code: fullCode || data.code,
  order_date: data.order_date,
  nomenclature_number: data.nomenclature_number,
  to: textToList(data.to),
  copy: textToList(data.copy),
  from: Array.isArray(data.from) ? data.from : textToList(data.from),
  signer: data.signer,
  approver_ids: data.approver_ids || [],
});
