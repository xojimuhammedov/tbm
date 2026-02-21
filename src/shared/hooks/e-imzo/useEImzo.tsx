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
    | "signing"
    | "timestamping"
    | "verifying"
    | "done"
    | "error";

const useEImzoSign = (documentId: string) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const { listAllKeys, signKey, install } = useEImzo();

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
        const response = await fetch(filePath, {
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`PDF yuklanmadi: ${response.status} ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = "";
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }, []);

    /** E-IMZO ni ishga tushirish */
    const initEImzo = useCallback(async () => {
        try {
            await install();
            const allKeys = await listAllKeys();
            setKeys(allKeys as Cert[]);
        } catch {
            throw new Error(
                t("E-IMZO dasturi topilmadi. Iltimos, dasturni ishga tushiring.")
            );
        }
    }, [install, listAllKeys, t]);

    /** PDF ni oldindan yuklash */
    const preloadPdf = useCallback(async () => {
        try {
            const pdfName = await generatePdf(documentId);
            const pdfPath = `/api/temp-pdf/${pdfName}`;
            setPdfUrl(pdfPath);
        } catch (err) {
            console.error("Preload error:", err);
        }
    }, [documentId, generatePdf]);

    /** Asosiy imzolash jarayoni */
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

        try {
            let currentPdfUrl = pdfUrl;
            if (!currentPdfUrl) {
                setStep("generating-pdf");
                const pdfName = await generatePdf(documentId);
                currentPdfUrl = `/api/temp-pdf/${pdfName}`;
                setPdfUrl(currentPdfUrl);
            }

            // 2. Base64 ga aylantirish
            setStep("loading-pdf");
            const base64 = await fetchPdfAsBase64(currentPdfUrl);

            // 3. E-IMZO bilan imzolash
            setStep("signing");
            const signedPkcs7 = (await signKey(selectedCert, base64)) as string;
            setPkcs7(signedPkcs7);

            // 4. Timestamp qo'shish
            setStep("timestamping");
            const timedPkcs7 = await addTimestamp(signedPkcs7);
            setPkcs7WithTimestamp(timedPkcs7);

            // 5. Verifikatsiya (Serverga yuborish)
            setStep("verifying");
            await verifySignature(documentId, timedPkcs7);

            setStep("done");
            toast({
                variant: "success",
                title: t("Muvaffaqiyatli"),
                description: t("Hujjat muvaffaqiyatli imzolandi va tasdiqlandi."),
            });
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : t("Noma'lum xatolik yuz berdi.");
            setError(message);
            setStep("error");
            toast({
                variant: "destructive",
                title: t("Xatolik"),
                description: message,
            });
        }
    }, [
        selectedCert,
        documentId,
        pdfUrl,
        generatePdf,
        fetchPdfAsBase64,
        signKey,
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
        step,
        error,
        pdfUrl,
        pkcs7,
        pkcs7WithTimestamp,
        preloadPdf,
        handleSign,
        reset,
        isLoading: !["idle", "done", "error"].includes(step),
    };
};

export default useEImzoSign;