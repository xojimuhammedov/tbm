import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ChevronDownIcon,
  KeyRoundIcon,
  LoaderCircleIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// UI komponentlar va layoutlar

// Hooklar
import useEImzoSign, { Cert } from "@/shared/hooks/e-imzo/useEImzo.tsx";

// Yordamchi funksiyalar
function formatDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function isExpired(validTo: string) {
  return new Date(validTo) < new Date();
}

// SignProgress komponenti
function SignProgress({ step }: { step: string }) {
  const signing = ["signing", "timestamping", "verifying"].includes(step);
  const done = step === "done";
  if (!signing && !done) return null;
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${done ? "bg-emerald-500" : "bg-blue-500"}`}
      >
        {done ? (
          <CheckCircle2Icon className="size-4 text-white" />
        ) : (
          <LoaderCircleIcon className="size-4 text-white animate-spin" />
        )}
      </div>
      <span
        className={`text-sm font-medium ${done ? "text-emerald-700" : "text-blue-700"}`}
      >
        {done
          ? "Hujjat muvaffaqiyatli imzolandi!"
          : "Imzolanyapti, iltimos kuting..."}
      </span>
    </div>
  );
}

// CertDropdown komponenti
function CertDropdown({
  keys,
  selected,
  onSelect,
  disabled,
}: {
  keys: Cert[];
  selected: Cert | null;
  onSelect: (c: Cert) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled || keys.length === 0}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm transition-all text-left ${selected ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"} disabled:opacity-50`}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-emerald-100" : "bg-slate-100"}`}
        >
          <KeyRoundIcon
            className={`size-4 ${selected ? "text-emerald-600" : "text-slate-400"}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          {keys.length === 0 ? (
            <span className="text-slate-400">Kalitlar topilmadi</span>
          ) : selected ? (
            <>
              <p className="font-semibold text-slate-800 truncate">
                {selected.CN}
              </p>
            </>
          ) : (
            <span className="text-slate-500">Kalitni tanlang...</span>
          )}
        </div>
        <ChevronDownIcon
          className={`size-4 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && keys.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
              {keys.map((cert) => {
                const expired = isExpired(cert.validTo);
                const isSelected = selected?.serialNumber === cert.serialNumber;
                return (
                  <button
                    key={cert.serialNumber}
                    type="button"
                    disabled={expired}
                    onClick={() => {
                      onSelect(cert);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors ${isSelected ? "bg-emerald-50" : "hover:bg-slate-50"} ${expired ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">
                        {cert.CN}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {formatDate(cert.validFrom)} -{" "}
                        {formatDate(cert.validTo)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// SignActions komponenti
const SignActions = ({ documentId }: { documentId: string }) => {
  const navigate = useNavigate();

  const {
    keys,
    selectedCert,
    setSelectedCert,
    initEImzo,
    preloadPdf,
    step,
    error,
    handleSign,
    reset,
    isLoading,
  } = useEImzoSign(documentId);

  const [initError, setInitError] = useState<string | null>(null);
  const [initLoading, setInitLoading] = useState(true);
  const [, setPdfLoading] = useState(false);

  useEffect(() => {
    setInitLoading(true);
    initEImzo()
      .catch((err: Error) => setInitError(err.message))
      .finally(() => setInitLoading(false));
  }, []);

  useEffect(() => {
    setPdfLoading(true);
    preloadPdf().finally(() => setPdfLoading(false));
  }, []);

  const isDone = step === "done";
  const isError = step === "error";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit">
      <div className="p-5 border-b border-slate-100 flex items-center gap-2">
        <KeyRoundIcon className="size-4 text-slate-500" />
        <span className="font-semibold text-slate-700 text-sm">
          Elektron kalitni tanlang
        </span>
        {initLoading && (
          <LoaderCircleIcon className="size-4 text-emerald-500 animate-spin ml-auto" />
        )}
      </div>
      <div className="p-5">
        {initError && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 text-sm text-red-700">
            <AlertCircleIcon className="size-5 shrink-0 mt-0.5 text-red-500" />
            <div>
              <p className="font-semibold">E-IMZO ulanmadi</p>
              <p className="mt-0.5">{initError}</p>
            </div>
          </div>
        )}

        <CertDropdown
          keys={keys}
          selected={selectedCert}
          onSelect={setSelectedCert}
          disabled={initLoading || isLoading || isDone}
        />

        <SignProgress step={step} />

        {isError && error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 text-sm">
            <AlertCircleIcon className="size-5 shrink-0 mt-0.5 text-red-500" />
            <div>
              <p className="font-semibold text-red-700">Xatolik yuz berdi</p>
              <p className="mt-0.5 text-red-600">{error}</p>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          {(isError || isDone) && (
            <button
              onClick={() => {
                reset();
                if (isDone) navigate(-1);
              }}
              className="flex-1 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors shadow-sm"
            >
              {isDone ? "Orqaga qaytish" : "Qayta urinish"}
            </button>
          )}

          {!isDone && (
            <button
              onClick={handleSign}
              disabled={isLoading || !selectedCert || !!initError}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-200/60 text-sm"
            >
              {isLoading ? (
                <>
                  <LoaderCircleIcon className="size-4 animate-spin" />
                  Jarayonda...
                </>
              ) : (
                <>
                  <ShieldCheckIcon className="size-4" />
                  Hujjatni imzolash
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignActions;
