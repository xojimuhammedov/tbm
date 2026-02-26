import { useCallback, useState } from "react";
import { useEImzo } from "use-eimzo";
import { useToast } from "@/shared/hooks/useToast";
import { useTranslation } from "react-i18next";
import useGeneratePdf from "./useGeneratePdf";
import useTimestamp from "./useTimestamp";
import useVerifySignature from "./useVerifySignature";

export type Cert = {
    disk: string;
    path: string;
    name: string;
    alias: string;
    serialNumber: string;
    validFrom: string;
    validTo: string;
    CN: string;
    TIN: string;
    UID: string;
    O: string;
    T: string;
    type: string;
};

export type SignStep =
    | "idle"
    | "generating-pdf"
    | "loading-pdf"
    | "loading-key"
    | "signing"
    | "timestamping"
    | "verifying"
    | "done"
    | "error";

const PLUGIN_MAP: Record<string, string> = {
    pfx: "pfx",
    certkey: "certkey",
    ytks: "ytks",
    idcard: "idcard",
    baikey: "baikey",
};

const capiCall = <T = unknown>(plugin: string, name: string, args: unknown[] = []): Promise<T> =>
    new Promise<T>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const CAPIWS = (window as any).CAPIWS;
        if (!CAPIWS) {
            reject(new Error("CAPIWS topilmadi. E-IMZO ishga tushmagan."));
            return;
        }
        CAPIWS.callFunction(
            { plugin, name, arguments: args },
            (_: unknown, data: T) => resolve(data),
            (err: unknown) => reject(new Error(String(err)))
        );
    });

const useEImzoSign = (documentId: string) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const { listAllKeys, install, addApiKey } = useEImzo();
    const { generatePdf } = useGeneratePdf();
    const { addTimestamp } = useTimestamp();
    const { verifySignature } = useVerifySignature();
    const [step, setStep] = useState<SignStep>("idle");
    const [keys, setKeys] = useState<Cert[]>([]);
    const [selectedCert, setSelectedCert] = useState<Cert | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [pkcs7, setPkcs7] = useState<string | null>(null);
    const [pkcs7WithTimestamp, setPkcs7WithTimestamp] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchPdfAsBase64 = useCallback(async (filePath: string): Promise<string> => {
        const response = await fetch(filePath, { credentials: "include" });
        if (!response.ok) {
            throw new Error(`PDF yuklanmadi: ${response.status} ${response.statusText}`);
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        return btoa(binary);
    }, []);

    const initEImzo = useCallback(async () => {
        try {
            await install();
            addApiKey(window.location.hostname, import.meta.env.VITE_EIMZO_API_KEY);
            setKeys((await listAllKeys()) as Cert[]);
        } catch {
            throw new Error(t("E-IMZO dasturi topilmadi. Iltimos, dasturni ishga tushiring."));
        }
    }, [install, addApiKey, listAllKeys, t]);

    const preloadPdf = useCallback(async () => {
        try {
            const pdfName = await generatePdf(documentId);
            setPdfUrl(`/api/temp-pdf/${pdfName}`);
        } catch (err) {
            console.error("Preload xatosi:", err);
        }
    }, [documentId, generatePdf]);

    const handleSign = useCallback(async () => {
        if (!selectedCert) {
            toast({
                variant: "destructive",
                title: t("Xatolik"),
                description: t("Iltimos, avval kalitni tanlang."),
            });
            return;
        }

        setError(null);
        const plugin = PLUGIN_MAP[selectedCert.type?.toLowerCase()] ?? "pfx";
        let loadedKeyId: string | null = null;

        try {
            // 1. PDF yaratish
            let currentPdfUrl = pdfUrl;
            if (!currentPdfUrl) {
                setStep("generating-pdf");
                const pdfName = await generatePdf(documentId);
                currentPdfUrl = `/api/temp-pdf/${pdfName}`;
                setPdfUrl(currentPdfUrl);
            }

            // 2. PDF → base64
            setStep("loading-pdf");
            const base64 = await fetchPdfAsBase64(currentPdfUrl);

            // 3. Kalitni yuklash → keyId (PIN dialog)
            setStep("loading-key");
            const loadData = await capiCall<{ id?: string; keyId?: string }>(plugin, "load_key", [
                selectedCert.disk,
                selectedCert.path,
                selectedCert.name,
                selectedCert.alias,
            ]);

            loadedKeyId = loadData?.id ?? loadData?.keyId ?? null;
            if (!loadedKeyId) throw new Error(t("Kalit yuklanmadi."));

            // 4. PKCS#7 imzolash
            setStep("signing");
            const signData = await capiCall<{ pkcs7_64: string }>("pkcs7", "create_pkcs7", [
                base64,
                loadedKeyId,
                "no",
            ]);

            if (!signData?.pkcs7_64) throw new Error(t("Imzolash muvaffaqiyatsiz yakunlandi."));
            setPkcs7(signData.pkcs7_64);

            // 5. Timestamp
            setStep("timestamping");
            const timedPkcs7 = await addTimestamp(signData.pkcs7_64);
            setPkcs7WithTimestamp(timedPkcs7);

            // 6. Server verifikatsiya
            setStep("verifying");
            await verifySignature(documentId, timedPkcs7);

            setStep("done");
            toast({
                variant: "success",
                title: t("Muvaffaqiyatli"),
                description: t("Hujjat muvaffaqiyatli imzolandi va tasdiqlandi."),
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : t("Noma'lum xatolik yuz berdi.");
            setError(message);
            setStep("error");
            toast({ variant: "destructive", title: t("Xatolik"), description: message });
        } finally {
            if (loadedKeyId) {
                capiCall(plugin, "unload_key", [loadedKeyId]).catch(() => null);
            }
        }
    }, [
        selectedCert,
        documentId,
        pdfUrl,
        generatePdf,
        fetchPdfAsBase64,
        addTimestamp,
        verifySignature,
        t,
        toast,
    ]);

    const reset = useCallback(() => {
        setStep("idle");
        setSelectedCert(null);
        setPdfUrl(null);
        setPkcs7(null);
        setPkcs7WithTimestamp(null);
        setError(null);
    }, []);

    return {
        keys,
        selectedCert,
        setSelectedCert,
        initEImzo,
        preloadPdf,
        handleSign,
        reset,
        step,
        error,
        pdfUrl,
        pkcs7,
        pkcs7WithTimestamp,
        isLoading: !["idle", "done", "error"].includes(step),
    };
};

export default useEImzoSign;