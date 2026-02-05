import { textToList } from "./list";

export const buildBasePayload = (data: any, fullCode: string) => ({
    code: fullCode || data.code,
    order_date: data.order_date,
    to: textToList(data.to),
    copy: textToList(data.copy),
    responsible: data.responsible,
});
