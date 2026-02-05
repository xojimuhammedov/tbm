// src/pages/rh-252/a-252/hooks/useApplicationDocumentForm/utils/time.ts
export const isoToHHmm = (iso?: string | null) => {
    if (!iso) return "";
    if (iso.includes("T")) return iso.split("T")[1]?.slice(0, 5) || "";
    return iso.slice(0, 5);
};

export const formatToISO = (timeStr: string) => {
    if (!timeStr) return null;
    if (timeStr.includes("T")) return timeStr;
    const today = new Date().toISOString().split("T")[0];
    return `${today}T${timeStr}:00.000Z`;
};
