import { DocumentStage } from "../interfaces/detail.interface";
import { RecipientUI } from "../hooks/useApplicationDetail";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Props {
    stage: DocumentStage;
    recipients: RecipientUI[];
    onCancelProcess: () => void;
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const STAGES: { id: DocumentStage; label: string; color: string }[] = [
    { id: "draft",    label: "Qoralama",           color: "#94a3b8" },
    { id: "approval", label: "Ko'rib chiqilmoqda", color: "#f59e0b" },
    { id: "signing",  label: "Imzolashda",         color: "#6366f1" },
    { id: "done",     label: "Kuchga kirdi",        color: "#10b981" },
];

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; dot: string; pulse: boolean }> = {
    PENDING:  { label: "Kutilmoqda", bg: "#fef3c7", color: "#92400e", dot: "#f59e0b", pulse: true  },
    ACCEPTED: { label: "Tasdiqladi", bg: "#dcfce7", color: "#166534", dot: "#10b981", pulse: false },
    REJECTED: { label: "Rad etdi",   bg: "#fee2e2", color: "#991b1b", dot: "#ef4444", pulse: false },
    CANCEL:   { label: "Bekor",      bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8", pulse: false },
};

const TYPE_CONFIG = {
    APPROVAL: { label: "Ko'rib chiquvchi", color: "#f59e0b" },
    SIGNING:  { label: "Imzolovchi",       color: "#6366f1" },
};

// ─── AVATAR ───────────────────────────────────────────────────────────────────

function Avatar({ name, color }: { name: string; color: string }) {
    const initials = name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0] ?? "")
        .join("")
        .toUpperCase();

    return (
        <div
            style={{ background: color + "15", color, border: `1.5px solid ${color}25` }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 select-none"
        >
            {initials}
        </div>
    );
}

// ─── RECIPIENT CARD ───────────────────────────────────────────────────────────

function RecipientCard({ recipient }: { recipient: RecipientUI }) {
    const typeConf   = TYPE_CONFIG[recipient.type];
    const statusConf = STATUS_CONFIG[recipient.status] ?? STATUS_CONFIG['PENDING'];

    return (
        <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-white transition-all duration-300"
            style={{ animation: "fadeSlide 0.3s ease both" }}
        >
            <Avatar name={recipient.fullName} color={typeConf.color} />

            <div className="flex-1 min-w-0">
                <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: typeConf.color + "cc" }}
                >
                    {typeConf.label}
                </p>
                <p className="text-[13px] font-semibold text-slate-800 truncate">
                    {recipient.fullName}
                </p>
                {recipient.isEditor && (
                    <p className="text-[10px] text-slate-400 mt-0.5">Tahrirlash huquqi bor</p>
                )}
            </div>

            {/* Status badge */}
            <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0"
                style={{ background: statusConf.bg }}
            >
                <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                        background: statusConf.dot,
                        animation: statusConf.pulse ? "ping 1.8s ease infinite" : "none",
                    }}
                />
                <span
                    className="text-[10.5px] font-semibold"
                    style={{ color: statusConf.color }}
                >
                    {statusConf.label}
                </span>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function DocumentStatusBar({ stage, recipients, onCancelProcess }: Props) {
    const idx          = STAGES.findIndex((s) => s.id === stage);
    const currentStage = STAGES[idx];
    const fillPct      = idx <= 0 ? 0 : (idx / (STAGES.length - 1)) * 100;
    const isActive     = stage !== "draft" && stage !== "done";
    const hasRecipients = recipients.length > 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 overflow-hidden">
            <style>{`
                @keyframes fadeSlide {
                    from { opacity: 0; transform: translateX(-8px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes ping {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%      { opacity: 0.5; transform: scale(1.5); }
                }
            `}</style>

            {/* ── Progress track ── */}
            <div className="px-7 pt-6 pb-5">
                {/* Header row */}
                <div className="flex justify-between items-center mb-5">
                    <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400">
                        Hujjat holati
                    </span>

                    {/* Current stage badge — miltillovchi chiroq bilan */}
                    <div className="flex items-center gap-2">
                        {isActive && (
                            <span className="relative flex h-2 w-2 flex-shrink-0">
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                                    style={{ background: currentStage?.color }}
                                />
                                <span
                                    className="relative inline-flex rounded-full h-2 w-2"
                                    style={{ background: currentStage?.color }}
                                />
                            </span>
                        )}
                        {stage === "done" && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        )}
                        <span
                            className="text-[12px] font-bold transition-colors duration-300"
                            style={{ color: isActive ? currentStage?.color : stage === "done" ? "#10b981" : "#0f172a" }}
                        >
                            {currentStage?.label}
                        </span>
                    </div>
                </div>

                {/* Steps track */}
                <div className="relative flex items-start justify-between">
                    {/* rail */}
                    <div className="absolute top-[15px] left-[15px] right-[15px] h-[1.5px] bg-slate-100 z-0" />

                    {/* fill */}
                    <div
                        className="absolute top-[15px] left-[15px] h-[1.5px] z-[1]"
                        style={{
                            width: `calc(${fillPct}% - 30px)`,
                            background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
                            transition: "width 0.9s cubic-bezier(0.34, 1.1, 0.64, 1)",
                        }}
                    />

                    {STAGES.map((s, i) => {
                        const done   = i < idx;
                        const active = i === idx;

                        return (
                            <div key={s.id} className="relative z-[2] flex flex-col items-center gap-2.5 flex-1">
                                <div
                                    className="w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                                    style={{
                                        background: done ? "#0f172a" : "#fff",
                                        border: done
                                            ? "2px solid #0f172a"
                                            : active
                                                ? `2px solid ${s.color}`
                                                : "1.5px solid #e2e8f0",
                                        boxShadow: active ? `0 0 0 5px ${s.color}18` : "none",
                                    }}
                                >
                                    {done && (
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                    {active && (
                                        <div
                                            className="w-[9px] h-[9px] rounded-full"
                                            style={{
                                                background: s.color,
                                                animation: "ping 1.8s ease-in-out infinite",
                                            }}
                                        />
                                    )}
                                    {!done && !active && (
                                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                                    )}
                                </div>

                                <span
                                    className="text-[10.5px] font-semibold whitespace-nowrap text-center transition-colors duration-300"
                                    style={{
                                        color: done ? "#334155" : active ? s.color : "#cbd5e1",
                                    }}
                                >
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Recipients panel ── */}
            {hasRecipients && (
                <div className="border-t border-slate-100">
                    {/* Panel header */}
                    <div className="px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400">
                                Jarayon ishtirokchilari
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                                {recipients.length}
                            </span>
                        </div>

                        {/* Bekor qilish */}
                        {stage !== "done" && (
                            <button
                                onClick={onCancelProcess}
                                className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-400 hover:text-red-500 transition-colors duration-200 group"
                            >
                                <svg
                                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                    className="group-hover:rotate-90 transition-transform duration-200"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                Jarayonni bekor qilish
                            </button>
                        )}
                    </div>

                    {/* Recipient cards */}
                    <div
                        className="px-4 pb-4 grid gap-2"
                        style={{
                            gridTemplateColumns: recipients.length === 1 ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
                        }}
                    >
                        {recipients.map((r, i) => (
                            <div key={r.id} style={{ animationDelay: `${i * 0.07}s` }}>
                                <RecipientCard recipient={r} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}