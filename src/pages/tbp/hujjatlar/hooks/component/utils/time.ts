export const isoToHHmm = (iso?: string | null) => {
  if (!iso) return "";
  if (typeof iso === "string" && iso.includes("T"))
    return iso.split("T")[1]?.slice(0, 5) || "";
  return iso.slice?.(0, 5) || "";
};

export const formatToISO = (timeStr: any) => {
  if (!timeStr) return null;
  // If it's already a full ISO string (or another string with T), return it
  if (typeof timeStr === "string" && timeStr.includes("T")) return timeStr;

  // If it's not a string, return it as-is if it exists (e.g. Date object) or handle gracefully
  if (typeof timeStr !== "string") return timeStr;

  // Otherwise, assume it's an HH:mm string and prepend today's date
  const today = new Date().toISOString().split("T")[0];
  return `${today}T${timeStr}:00.000Z`;
};
