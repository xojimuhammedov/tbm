import { useState, useCallback } from "react";
import { XIcon, Loader2, UserPlusIcon, RefreshCwIcon } from "lucide-react";
import useDocumentSocket, {
    DocumentSocketPayload,
    DocumentStatus,
    SocketRecipient,
} from "@/pages/imzolash/hooks/useDocumentSocket";
import useCancelProcess from "@/pages/imzolash/hooks/useCancelProcess";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const TIMELINE: { id: DocumentStatus; label: string; color: string }[] = [
    { id: "DRAFT",     label: "Qoralama",       color: "#94a3b8" },
    { id: "IN_REVIEW", label: "Ko'rib chiqish", color: "#f59e0b" },
    { id: "APPROVED",  label: "Tasdiqlangan",   color: "#6366f1" },
    { id: "SIGNING",   label: "Imzolashda",     color: "#8b5cf6" },
    { id: "SIGNED",    label: "Imzolandi",      color: "#10b981" },
    { id: "EXECUTING", label: "Bajarilmoqda",   color: "#0ea5e9" },
    { id: "EXECUTED",  label: "Bajarildi",      color: "#10b981" },
];

const STATUS_ALIAS: Partial<Record<DocumentStatus, DocumentStatus>> = {
    REJECTED:  "IN_REVIEW",
    CANCELLED: "DRAFT",
};

const STATUS_META: Record<string, { label: string; bg: string; color: string; dot: string; pulse: boolean }> = {
    PENDING:  { label: "Kutilmoqda", bg: "#fef3c7", color: "#92400e", dot: "#f59e0b", pulse: true  },
    ACCEPTED: { label: "Tasdiqladi", bg: "#dcfce7", color: "#166534", dot: "#10b981", pulse: false },
    REJECTED: { label: "Rad etdi",   bg: "#fee2e2", color: "#991b1b", dot: "#ef4444", pulse: false },
    CANCEL:   { label: "Bekor",      bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8", pulse: false },
};

const TYPE_META: Record<string, { label: string; color: string }> = {
    APPROVAL: { label: "Ko'rib chiquvchi", color: "#f59e0b" },
    SIGNING:  { label: "Imzolovchi",       color: "#6366f1" },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fullName = (r: SocketRecipient) =>
    [r.first_name, r.second_name].filter(Boolean).join(" ") || "—";

const getInitials = (r: SocketRecipient) =>
    [r.first_name?.[0], r.second_name?.[0]].filter(Boolean).join("").toUpperCase();

// ─── AVATAR ───────────────────────────────────────────────────────────────────

function Avatar({ recipient }: { recipient: SocketRecipient }) {
    const color = TYPE_META[recipient.type]?.color ?? "#94a3b8";
    return (
        <div
            style={{ background: color + "18", color, border: `1.5px solid ${color}30` }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 select-none relative"
        >
            {getInitials(recipient)}
            {recipient.is_current && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-white" />
            )}
        </div>
    );
}

// ─── RECIPIENT ROW ────────────────────────────────────────────────────────────

interface RecipientRowProps {
    r: SocketRecipient;
    delay: number;
    canModify: boolean;
    onReplace: (r: SocketRecipient) => void;
}

function RecipientRow({ r, delay, canModify, onReplace }: RecipientRowProps) {
    const typeMeta   = TYPE_META[r.type] ?? TYPE_META.APPROVAL;
    const statusMeta = STATUS_META[r.status] ?? STATUS_META.PENDING;
    const isApproval = r.type === "APPROVAL";
    // Only PENDING approval recipients can be replaced
    const canReplace = canModify && isApproval && r.status === "PENDING";

    return (
        <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-100 shadow-sm group"
            style={{ animation: `fadeSlide 0.35s ${delay}s ease both` }}
        >
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 flex-shrink-0">
                {r.order}
            </div>

            <Avatar recipient={r} />

            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: typeMeta.color + "cc" }}>
                    {typeMeta.label}
                    {r.isEditor && (
                        <span className="ml-1.5 text-slate-400 normal-case font-semibold">· tahrirlash huquqi</span>
                    )}
                </p>
                <p className="text-[13px] font-semibold text-slate-800 truncate">{fullName(r)}</p>
                {r.middle_name && (
                    <p className="text-[11px] text-slate-400 truncate">{r.middle_name}</p>
                )}
            </div>

            {r.is_current && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-100">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                    </span>
                    <span className="text-[10px] font-bold text-amber-700">Hozir</span>
                </div>
            )}

            {/* Status badge */}
            <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0"
                style={{ background: statusMeta.bg }}
            >
                <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                        background: statusMeta.dot,
                        animation: statusMeta.pulse ? "pulseDot 1.8s ease infinite" : "none",
                    }}
                />
                <span className="text-[10.5px] font-semibold" style={{ color: statusMeta.color }}>
                    {statusMeta.label}
                </span>
            </div>

            {/* Replace button — only for pending approvers */}
            {canReplace && (
                <button
                    onClick={() => onReplace(r)}
                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 text-[10.5px] font-semibold transition-all duration-200 flex-shrink-0"
                    title="Boshqa odamga almashtirish"
                >
                    <RefreshCwIcon size={11} />
                    Almashtirish
                </button>
            )}
        </div>
    );
}

// ─── REPLACE MODAL ────────────────────────────────────────────────────────────

interface ReplaceModalProps {
    open: boolean;
    target: SocketRecipient | null;
    onClose: () => void;
    onConfirm: (newUserId: string) => void;
    isLoading: boolean;
}

function ReplaceModal({ open, target, onClose, onConfirm, isLoading }: ReplaceModalProps) {
    const [userId, setUserId] = useState("");

    if (!open || !target) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* Modal */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
                style={{ animation: "modalIn 0.2s ease both" }}
            >
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Tekshiruvchini almashtirish
                        </p>
                        <p className="text-[14px] font-extrabold text-slate-800">
                            {fullName(target)}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                        <XIcon size={14} className="text-slate-500" />
                    </button>
                </div>

                <div className="mb-4">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                        Yangi tekshiruvchi ID
                    </label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Xodim ID ni kiriting..."
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                    />
                    <p className="text-[11px] text-slate-400 mt-1.5">
                        * Faqat PENDING holotidagi tekshiruvchilarni almashtirish mumkin
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[12.5px] font-bold hover:bg-slate-200 transition-colors"
                    >
                        Bekor
                    </button>
                    <button
                        onClick={() => userId.trim() && onConfirm(userId.trim())}
                        disabled={!userId.trim() || isLoading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 text-white text-[12.5px] font-bold hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 size={13} className="animate-spin" />}
                        Almashtirish
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── ADD RECIPIENT MODAL ──────────────────────────────────────────────────────

interface AddRecipientModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (userId: string, isEditor: boolean) => void;
    isLoading: boolean;
}

function AddRecipientModal({ open, onClose, onConfirm, isLoading }: AddRecipientModalProps) {
    const [userId, setUserId] = useState("");
    const [isEditor, setIsEditor] = useState(false);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
                style={{ animation: "modalIn 0.2s ease both" }}
            >
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Yangi tekshiruvchi
                        </p>
                        <p className="text-[14px] font-extrabold text-slate-800">
                            Tasdiqlashga qo'shish
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                        <XIcon size={14} className="text-slate-500" />
                    </button>
                </div>

                <div className="mb-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                        Xodim ID
                    </label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Xodim ID ni kiriting..."
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                    />
                </div>

                <label className="flex items-center gap-2.5 mb-5 cursor-pointer">
                    <div
                        onClick={() => setIsEditor(!isEditor)}
                        className={`w-9 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${isEditor ? "bg-amber-500" : "bg-slate-200"}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${isEditor ? "translate-x-4" : "translate-x-0"}`} />
                    </div>
                    <span className="text-[12.5px] font-semibold text-slate-600">Tahrirlash huquqi berish</span>
                </label>

                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[12.5px] font-bold hover:bg-slate-200 transition-colors"
                    >
                        Bekor
                    </button>
                    <button
                        onClick={() => userId.trim() && onConfirm(userId.trim(), isEditor)}
                        disabled={!userId.trim() || isLoading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-white text-[12.5px] font-bold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 size={13} className="animate-spin" />}
                        Qo'shish
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── TIMELINE TRACK ──────────────────────────────────────────────────────────

function TimelineTrack({ status }: { status: DocumentStatus }) {
    const resolvedStatus = STATUS_ALIAS[status] ?? status;
    const idx            = TIMELINE.findIndex((s) => s.id === resolvedStatus);
    const safeIdx        = idx < 0 ? 0 : idx;
    const fillPct        = safeIdx <= 0 ? 0 : (safeIdx / (TIMELINE.length - 1)) * 100;
    const currentStage   = TIMELINE[safeIdx];
    const isTerminal     = status === "CANCELLED" || status === "REJECTED";
    const isDone         = status === "EXECUTED" || status === "SIGNED";

    return (
        <div className="px-6 pt-6 pb-5">
            <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-slate-400">
                    Hujjat holati
                </span>
                <div className="flex items-center gap-2">
                    {isTerminal && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.8" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    )}
                    {isDone && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                    {!isTerminal && !isDone && (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: currentStage?.color }} />
                            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: currentStage?.color }} />
                        </span>
                    )}
                    <span
                        className="text-[12.5px] font-extrabold tracking-tight"
                        style={{ color: isTerminal ? "#ef4444" : isDone ? "#10b981" : (currentStage?.color ?? "#0f172a") }}
                    >
                        {isTerminal ? (status === "CANCELLED" ? "Bekor qilindi" : "Rad etildi") : currentStage?.label}
                    </span>
                </div>
            </div>

            <div className="relative flex items-start justify-between">
                <div className="absolute top-[15px] left-[15px] right-[15px] h-[1.5px] bg-slate-100 z-0" />
                <div
                    className="absolute top-[15px] left-[15px] h-[1.5px] z-[1]"
                    style={{
                        width: `calc(${fillPct / 100} * (100% - 30px))`,
                        background: isTerminal ? "#fca5a5" : "linear-gradient(90deg, #0ea5e9, #8b5cf6)",
                        transition: "width 0.8s cubic-bezier(0.34, 1.1, 0.64, 1)",
                    }}
                />
                {TIMELINE.map((s, i) => {
                    const done   = i < safeIdx;
                    const active = i === safeIdx && !isTerminal;
                    return (
                        <div key={s.id} className="relative z-[2] flex flex-col items-center gap-2 flex-1">
                            <div
                                className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
                                style={{
                                    background: done ? "#0f172a" : "#fff",
                                    border: done ? "2px solid #0f172a" : active ? `2px solid ${s.color}` : "1.5px solid #e2e8f0",
                                    boxShadow: active ? `0 0 0 5px ${s.color}18` : "none",
                                    transition: "all 0.5s ease",
                                }}
                            >
                                {done && (
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                                {active && <div className="w-[9px] h-[9px] rounded-full" style={{ background: s.color, animation: "pulseDot 1.8s ease-in-out infinite" }} />}
                                {!done && !active && <div className="w-2 h-2 rounded-full bg-slate-200" />}
                            </div>
                            <span className="text-[9.5px] font-semibold whitespace-nowrap text-center leading-tight" style={{ color: done ? "#334155" : active ? s.color : "#cbd5e1", transition: "color 0.3s ease" }}>
                                {s.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

interface Props {
    documentId: string | undefined;
    onAddRecipient?: (userId: string, isEditor: boolean) => Promise<void>;
    onReplaceRecipient?: (targetId: string, newUserId: string) => Promise<void>;
    isModifying?: boolean;
}

export function DocumentStatusBar({ documentId, onAddRecipient, onReplaceRecipient, isModifying = false }: Props) {
    const [socketData, setSocketData] = useState<DocumentSocketPayload | null>(null);
    const [confirmingCancel, setConfirmingCancel] = useState(false);
    const [replaceTarget, setReplaceTarget] = useState<SocketRecipient | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const { cancelProcess, isCancelling } = useCancelProcess();

    const handleUpdate = useCallback((payload: DocumentSocketPayload) => {
        setSocketData(payload);
    }, []);

    useDocumentSocket({ documentId, onUpdate: handleUpdate });

    const handleCancel = async () => {
        if (!documentId) return;
        try {
            await cancelProcess(documentId);
            setConfirmingCancel(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleReplace = async (newUserId: string) => {
        if (!replaceTarget || !onReplaceRecipient) return;
        await onReplaceRecipient(replaceTarget._id, newUserId);
        setReplaceTarget(null);
    };

    const handleAdd = async (userId: string, isEditor: boolean) => {
        if (!onAddRecipient) return;
        await onAddRecipient(userId, isEditor);
        setShowAddModal(false);
    };

    const status        = socketData?.document_status ?? "DRAFT";
    const users         = socketData?.users ?? [];
    const signer        = socketData?.signer;
    const allRecipients = (signer ? [...users, signer] : users) as SocketRecipient[];
    const hasRecipients = allRecipients.length > 0;
    // Can cancel if active process
    const canCancel     = !["DRAFT", "EXECUTED", "SIGNED", "CANCELLED"].includes(status);
    // Can add more approvers if still in review
    const canAddMore    = status === "IN_REVIEW" && !!onAddRecipient;

    return (
        <>
            <style>{`
                @keyframes fadeSlide {
                    from { opacity: 0; transform: translateX(-10px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes pulseDot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%      { opacity: 0.5; transform: scale(1.5); }
                }
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 overflow-hidden">
                <TimelineTrack status={status} />

                {hasRecipients && (
                    <div className="border-t border-slate-100">
                        {/* Panel header */}
                        <div className="px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400">
                                    Jarayon ishtirokchilari
                                </span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                                    {allRecipients.length}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Add more approver button */}
                                {canAddMore && (
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="flex items-center gap-1.5 text-[11.5px] font-semibold text-amber-500 hover:text-amber-600 transition-colors"
                                    >
                                        <UserPlusIcon size={12} />
                                        Qo'shish
                                    </button>
                                )}

                                {/* Cancel whole process */}
                                {canCancel && (
                                    confirmingCancel ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] text-slate-500 font-medium">
                                                Ishonchingiz komilmi?
                                            </span>
                                            <button
                                                onClick={handleCancel}
                                                disabled={isCancelling}
                                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500 text-white text-[11px] font-bold hover:bg-red-600 transition-colors disabled:opacity-60"
                                            >
                                                {isCancelling && <Loader2 className="size-3 animate-spin" />}
                                                Ha
                                            </button>
                                            <button
                                                onClick={() => setConfirmingCancel(false)}
                                                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold hover:bg-slate-200 transition-colors"
                                            >
                                                Yo'q
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmingCancel(true)}
                                            className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-400 hover:text-red-500 transition-colors group"
                                        >
                                            <XIcon size={12} className="group-hover:rotate-90 transition-transform duration-200" />
                                            Bekor qilish
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Recipient list */}
                        <div className="px-4 pb-4 flex flex-col gap-2">
                            {allRecipients
                                .slice()
                                .sort((a, b) => a.order - b.order)
                                .map((r, i) => (
                                    <RecipientRow
                                        key={r._id}
                                        r={r}
                                        delay={i * 0.06}
                                        canModify={canCancel && !!onReplaceRecipient}
                                        onReplace={setReplaceTarget}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Replace modal */}
            <ReplaceModal
                open={!!replaceTarget}
                target={replaceTarget}
                onClose={() => setReplaceTarget(null)}
                onConfirm={handleReplace}
                isLoading={isModifying}
            />

            {/* Add recipient modal */}
            <AddRecipientModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onConfirm={handleAdd}
                isLoading={isModifying}
            />
        </>
    );
}