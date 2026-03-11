import useDocumentSocket, {
    DocumentSocketPayload,
    DocumentStatus,
    SocketRecipient,
} from "@/pages/imzolash/hooks/useDocumentSocket";
import { Loader2, UserPlusIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";

const TIMELINE: { id: string; label: string; color: string }[] = [
  { id: "APPROVAL", label: "Tasdiqlash", color: "#f59e0b" },
  { id: "SIGNING", label: "Imzolash", color: "#3b82f6" },
  { id: "DONE", label: "Yakunlandi", color: "#10b981" },
];

const STATUS_META: Record<
  string,
  { label: string; bg: string; color: string; dot: string; pulse: boolean }
> = {
  PENDING: {
    label: "Kutilmoqda",
    bg: "#fef3c7",
    color: "#92400e",
    dot: "#f59e0b",
    pulse: true,
  },
  ACCEPTED: {
    label: "Tasdiqladi",
    bg: "#dcfce7",
    color: "#166534",
    dot: "#10b981",
    pulse: false,
  },
  REJECTED: {
    label: "Rad etdi",
    bg: "#fee2e2",
    color: "#991b1b",
    dot: "#ef4444",
    pulse: false,
  },
  CANCEL: {
    label: "Bekor",
    bg: "#f1f5f9",
    color: "#64748b",
    dot: "#94a3b8",
    pulse: false,
  },
};

const TYPE_META: Record<string, { label: string; color: string }> = {
  APPROVAL: { label: "Ko'rib chiquvchi", color: "#f59e0b" },
  SIGNING: { label: "Imzolovchi", color: "#6366f1" },
};

const fullName = (r: SocketRecipient) =>
  [r.first_name, r.second_name].filter(Boolean).join(" ") || "—";

const getInitials = (r: SocketRecipient) =>
  [r.first_name?.[0], r.second_name?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

function Avatar({ recipient }: { recipient: SocketRecipient }) {
  const color = TYPE_META[recipient.type]?.color ?? "#94a3b8";
  return (
    <div
      style={{
        background: color + "18",
        color,
        border: `1.5px solid ${color}30`,
      }}
      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 select-none relative"
    >
      {getInitials(recipient)}
      {recipient.is_current && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-white" />
      )}
    </div>
  );
}

interface RecipientRowProps {
  r: SocketRecipient;
  delay: number;
  canModify: boolean;
  onRemove?: (r: SocketRecipient) => void;
  onShowReason?: () => void;
}

function RecipientRow({ r, delay, canModify, onRemove, onShowReason }: RecipientRowProps) {
  const typeMeta = TYPE_META[r.type] ?? TYPE_META.APPROVAL;
  const statusMeta = STATUS_META[r.status] ?? STATUS_META.PENDING;
  const isApproval = r.type === "APPROVAL";
  const canReplace =
    canModify && (isApproval || r.type === "SIGNING") && r.status === "PENDING";

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
        <p
          className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
          style={{ color: typeMeta.color + "cc" }}
        >
          {typeMeta.label}
          {r.isEditor && (
            <span className="ml-1.5 text-slate-400 normal-case font-semibold">
              · tahrirlash huquqi
            </span>
          )}
        </p>
        <p className="text-xs font-semibold text-slate-800 truncate">
          {fullName(r)}
        </p>
        {r.middle_name && (
          <p className="text-[10px] text-slate-400 truncate">{r.middle_name}</p>
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
            animation: statusMeta.pulse
              ? "pulseDot 1.8s ease infinite"
              : "none",
          }}
        />
        <span
          className="text-[10px] font-semibold"
          style={{ color: statusMeta.color }}
        >
          {statusMeta.label}
        </span>
      </div>

      {r.status === "REJECTED" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onShowReason) onShowReason();
          }}
          className="flex items-center justify-center w-6 h-6 rounded-md bg-red-100 hover:bg-red-200 text-red-600 font-extrabold text-[13px] transition-colors ml-[-4px]"
          title="Rad etish sababini ko'rish"
        >
          !
        </button>
      )}

      {canReplace && onRemove && (
        <button
          onClick={() => onRemove(r)}
          className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 transition-colors"
          title="Olib tashlash"
        >
          <XIcon size={12} />
        </button>
      )}
    </div>
  );
}

function TimelineTrack({ status, stage }: { status: DocumentStatus; stage?: string }) {
  const resolvedStage = stage || "APPROVAL";
  const idx = TIMELINE.findIndex((s) => s.id === resolvedStage);
  const safeIdx = idx < 0 ? 0 : idx;
  const fillPct = safeIdx <= 0 ? 0 : (safeIdx / (TIMELINE.length - 1)) * 100;
  const currentStage = TIMELINE[safeIdx];
  const isTerminal = status === "CANCELLED" || status === "REJECTED";
  const isDone = stage === "DONE" || status === "SIGNED" || status === "EXECUTED" || status === "APPROVED";

  return (
    <div className="px-4 pt-4 pb-3">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-slate-400">
          Hujjat holati
        </span>
        <div className="flex items-center gap-2">
          {isTerminal && (
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.8"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
          {isDone && (
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {!isTerminal && !isDone && (
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: currentStage?.color }}
              />
              <span
                className="relative inline-flex rounded-full h-full w-full"
                style={{ background: currentStage?.color }}
              />
            </span>
          )}
          <span
            className="text-sm font-bold tracking-tight"
            style={{
              color: isTerminal
                ? "#ef4444"
                : isDone
                  ? "#10b981"
                  : (currentStage?.color ?? "#10b981"),
            }}
          >
            {isTerminal
              ? status === "CANCELLED"
                ? "Bekor qilindi"
                : "Rad etildi"
              : currentStage?.label}
          </span>
        </div>
      </div>

      <div className="relative flex items-start justify-between w-full mx-auto">
        <div className="absolute top-[18px] sm:top-[20px] left-[10%] right-[10%] h-[3px] sm:h-[4px] -translate-y-1/2 bg-slate-100 z-0" />
        <div
          className="absolute top-[18px] sm:top-[20px] left-[10%] h-[3px] sm:h-[4px] -translate-y-1/2 z-[1]"
          style={{
            width: `${fillPct * 0.8}%`,
            background: isTerminal
              ? "#fca5a5"
              : "linear-gradient(90deg, #34d399, #10b981)",
            transition: "width 0.8s cubic-bezier(0.34, 1.1, 0.64, 1)",
          }}
        />
        {TIMELINE.map((s, i) => {
          const done = i <= safeIdx && (isDone || i < safeIdx);
          const active = i === safeIdx && !isTerminal && !isDone;
          return (
            <div
              key={s.id}
              className="relative z-[2] flex flex-col items-center flex-1"
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out"
                style={{
                  background: done ? "#10b981" : "#fff",
                  border: done
                    ? "2px solid #10b981"
                    : active
                      ? `3px solid ${s.color}`
                      : "2px solid #e2e8f0",
                  boxShadow: active ? `0 0 0 6px ${s.color}20` : "none",
                }}
              >
                {done && (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {active && (
                  <div
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full"
                    style={{
                      background: s.color,
                      animation: "pulseDot 1.8s ease-in-out infinite",
                    }}
                  />
                )}
                {!done && !active && (
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-200" />
                )}
              </div>
              <span
                className="text-[10px] sm:text-[11px] md:text-xs font-bold whitespace-nowrap text-center leading-tight mt-3 pl-1"
                style={{
                  color: done ? "#10b981" : active ? s.color : "#94a3b8",
                  transition: "color 0.3s ease",
                }}
              >
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
  onRemoveRecipient?: (sharedId: string) => Promise<void>;
  isModifying?: boolean;
  staffOptions?: { value: string; label: string }[];
  onOpenAddModal?: () => void;
}

export function DocumentStatusBar({
  documentId,
  onAddRecipient,
  onRemoveRecipient,
  isModifying = false,
  staffOptions: _staffOptions,
  onOpenAddModal,
}: Props) {
  const [socketData, setSocketData] = useState<DocumentSocketPayload | null>(
    null,
  );
  const [removeTarget, setRemoveTarget] = useState<SocketRecipient | null>(
    null,
  );
  const [reasonTarget, setReasonTarget] = useState<SocketRecipient | null>(
    null,
  );

  const handleUpdate = useCallback((payload: DocumentSocketPayload) => {
    setSocketData(payload);
  }, []);

  useDocumentSocket({ documentId, onUpdate: handleUpdate });

  const handleRemove = async () => {
    if (!removeTarget || !onRemoveRecipient) return;
    await onRemoveRecipient(removeTarget.shared_id || removeTarget._id);
    setRemoveTarget(null);
  };

  const status = socketData?.document_status ?? "DRAFT";
  const stage = socketData?.document_stage ?? "APPROVAL";
  const users = socketData?.users ?? [];
  const signers = socketData?.signers ?? (socketData?.signer ? [socketData.signer] : []);
  const allRecipients = [...users, ...signers] as SocketRecipient[];
  const hasRecipients = allRecipients.length > 0;
  const canCancel = !["DRAFT", "EXECUTED", "SIGNED", "CANCELLED"].includes(
    status,
  );
  const canAddMore = status === "IN_REVIEW" && !!onAddRecipient;

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
        <TimelineTrack status={status} stage={stage} />

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
                {canAddMore && onOpenAddModal && (
                  <button
                    onClick={onOpenAddModal}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    <UserPlusIcon size={12} />
                    Qo'shish
                  </button>
                )}
              </div>
            </div>

            {/* Recipient list */}
            <div className="px-4 pb-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {allRecipients
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((r, i) => (
                  <RecipientRow
                    key={r.shared_id || r._id || i}
                    r={r}
                    delay={i * 0.06}
                    canModify={canCancel}
                    onRemove={
                      canCancel && !!onRemoveRecipient
                        ? setRemoveTarget
                        : undefined
                    }
                    onShowReason={() => setReasonTarget(r)}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Remove confirmation modal */}
      {removeTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setRemoveTarget(null)}
          />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            style={{ animation: "modalIn 0.2s ease both" }}
          >
            <div className="mb-4">
              <h3 className="text-[14px] font-extrabold text-slate-800 mb-1">
                Tekshiruvchini olib tashlash
              </h3>
              <p className="text-[12px] text-slate-500">
                Rostdan ham{" "}
                <span className="font-bold text-slate-700">
                  {fullName(removeTarget)}
                </span>
                ni jarayondan olib tashlamoqchimisiz?
              </p>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setRemoveTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[12.5px] font-bold hover:bg-slate-200 transition-colors"
              >
                Yo'q
              </button>
              <button
                onClick={handleRemove}
                disabled={isModifying}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white text-[12.5px] font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isModifying ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  "Ha, olib tashlash"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {reasonTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setReasonTarget(null)}
          />
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
            style={{ animation: "modalIn 0.2s ease both" }}
          >
            <div className="mb-4">
              <h3 className="text-[14px] font-extrabold text-slate-800 mb-1">
                Rad etish sababi
              </h3>
              <p className="text-[13px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-3 whitespace-pre-wrap">
                {reasonTarget.comment || "Sabab ko'rsatilmagan"}
              </p>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setReasonTarget(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-[12.5px] font-bold hover:bg-slate-200 transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
