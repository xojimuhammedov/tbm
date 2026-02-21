import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ShieldCheckIcon,
    KeyRoundIcon,
    ChevronDownIcon,
    CheckCircle2Icon,
    AlertCircleIcon,
    LoaderCircleIcon,
    ArrowLeftIcon,
    FileTextIcon,
} from "lucide-react";
import useEImzoSign, {Cert} from "@/shared/hooks/e-imzo/useEImzo.tsx";
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
function SignProgress({ step }: { step: string }) {
    const signing = [
        "signing",
        "timestamping",
        "verifying",
    ].includes(step);
    const done = step === "done";

    if (!signing && !done) return null;

    return (
        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all
          ${done ? "bg-emerald-500" : "bg-blue-500"}`}
            >
                {done ? (
                    <CheckCircle2Icon className="size-4 text-white" />
                ) : (
                    <LoaderCircleIcon className="size-4 text-white animate-spin" />
                )}
            </div>
            <span className={`text-sm font-medium ${done ? "text-emerald-700" : "text-blue-700"}`}>
        {done ? "Hujjat muvaffaqiyatli imzolandi!" : "Imzolanyapti, iltimos kuting..."}
      </span>
        </div>
    );
}
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
                className={`
          w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm transition-all text-left
          ${selected ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
            >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-emerald-100" : "bg-slate-100"}`}>
                    <KeyRoundIcon className={`size-4 ${selected ? "text-emerald-600" : "text-slate-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                    {keys.length === 0 ? (
                        <span className="text-slate-400">Kalitlar topilmadi</span>
                    ) : selected ? (
                        <>
                            <p className="font-semibold text-slate-800 truncate">{selected.CN}</p>
                            <p className="text-xs text-slate-500">STIR: {selected.TIN}</p>
                        </>
                    ) : (
                        <span className="text-slate-500">Kalitni tanlang...</span>
                    )}
                </div>
                <ChevronDownIcon className={`size-4 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && keys.length > 0 && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Mavjud kalitlar ({keys.length})
                            </p>
                        </div>
                        <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                            {keys.map((cert) => {
                                const expired = isExpired(cert.validTo);
                                const isSelected = selected?.serialNumber === cert.serialNumber;
                                return (
                                    <button
                                        key={cert.serialNumber}
                                        type="button"
                                        disabled={expired}
                                        onClick={() => { onSelect(cert); setOpen(false); }}
                                        className={`
                      w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors
                      ${isSelected ? "bg-emerald-50" : "hover:bg-slate-50"}
                      ${expired ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                    `}
                                    >
                                        <div className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                      ${isSelected ? "bg-emerald-100" : expired ? "bg-red-100" : "bg-slate-100"}`}>
                                            <KeyRoundIcon className={`size-4 ${isSelected ? "text-emerald-600" : expired ? "text-red-400" : "text-slate-500"}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-semibold text-slate-800 text-sm truncate">{cert.CN}</p>
                                                {isSelected && <CheckCircle2Icon className="size-3.5 text-emerald-500 shrink-0" />}
                                                {expired && (
                                                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md font-medium">
                            Muddati o'tgan
                          </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                STIR: {cert.TIN}{cert.O ? ` · ${cert.O}` : ""}
                                            </p>
                                            <p className={`text-xs mt-0.5 ${expired ? "text-red-400" : "text-slate-400"}`}>
                                                {formatDate(cert.validFrom)} – {formatDate(cert.validTo)}
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

function PdfPreview({ url }: { url: string }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
                <FileTextIcon className="size-4 text-slate-500" />
                <span className="font-semibold text-slate-700 text-sm">Hujjat</span>
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                    Yangi oynada ochish ↗
                </a>
            </div>
            <iframe
                src={url}
                className="w-full"
                style={{ height: "500px", border: "none" }}
                title="Hujjat PDF"
            />
        </div>
    );
}

const EImzoSignPage = () => {
    const { id: documentId = "" } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        keys,
        selectedCert,
        setSelectedCert,
        initEImzo,
        preloadPdf,
        step,
        error,
        pdfUrl,
        handleSign,
        reset,
        isLoading,
    } = useEImzoSign(documentId);

    const [initError, setInitError] = useState<string | null>(null);
    const [initLoading, setInitLoading] = useState(true);
    const [pdfLoading, setPdfLoading] = useState(false);

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-blue-50/20 p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <ArrowLeftIcon className="size-4 text-slate-600" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                            <ShieldCheckIcon className="size-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800 leading-tight">
                                E-IMZO bilan imzolash
                            </h1>
                            <p className="text-xs text-slate-500 font-mono">{documentId}</p>
                        </div>
                    </div>
                </div>
                {initError && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 text-sm text-red-700">
                        <AlertCircleIcon className="size-5 shrink-0 mt-0.5 text-red-500" />
                        <div>
                            <p className="font-semibold">E-IMZO ulanmadi</p>
                            <p className="mt-0.5">{initError}</p>
                        </div>
                    </div>
                )}
                <div className={`bg-white rounded-2xl border shadow-sm mb-4 transition-all ${isDone ? "border-emerald-200" : "border-slate-200"}`}>
                    <div className="p-5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <KeyRoundIcon className="size-4 text-slate-500" />
                            <span className="font-semibold text-slate-700 text-sm">Elektron kalit tanlang</span>
                            {initLoading && <LoaderCircleIcon className="size-4 text-emerald-500 animate-spin ml-auto" />}
                        </div>
                    </div>
                    <div className="p-5">
                        <CertDropdown
                            keys={keys}
                            selected={selectedCert}
                            onSelect={setSelectedCert}
                            disabled={initLoading || isLoading || isDone}
                        />
                        {selectedCert && (
                            <div className="mt-3 grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4 text-xs">
                                {[
                                    { label: "F.I.SH", value: selectedCert.CN },
                                    { label: "STIR", value: selectedCert.TIN },
                                    ...(selectedCert.O ? [{ label: "Tashkilot", value: selectedCert.O }] : []),
                                    {
                                        label: "Amal qilish muddati",
                                        value: `${formatDate(selectedCert.validFrom)} – ${formatDate(selectedCert.validTo)}`,
                                    },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <p className="text-slate-400 mb-0.5">{item.label}</p>
                                        <p className="font-semibold text-slate-700 truncate">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {pdfLoading && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 flex items-center justify-center gap-3 py-16">
                        <LoaderCircleIcon className="size-5 text-emerald-500 animate-spin" />
                        <span className="text-sm text-slate-500">Hujjat yuklanmoqda...</span>
                    </div>
                )}
                {!pdfLoading && pdfUrl && <PdfPreview url={pdfUrl} />}

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

                <div className="flex gap-3">
                    {(isError || isDone) && (
                        <button
                            onClick={() => { reset(); if (isDone) navigate(-1); }}
                            className="flex-1 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
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

export default EImzoSignPage;