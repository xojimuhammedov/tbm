export type DocumentStage = "draft" | "approval" | "signing" | "done";

export const STAGES: { id: DocumentStage; label: string; color: string }[] = [
    { id: "draft",    label: "Qoralama",           color: "#94a3b8" },
    { id: "approval", label: "Ko'rib chiqilmoqda", color: "#f59e0b" },
    { id: "signing",  label: "Imzolashda",         color: "#6366f1" },
    { id: "done",     label: "Kuchga kirdi",       color: "#10b981" },
];