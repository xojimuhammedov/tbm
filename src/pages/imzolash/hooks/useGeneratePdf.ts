import { useApi } from "@/shared/hooks/api/useApi";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import { get } from "lodash";
import { GeneratePdfResponse } from "../interfaces/detail.interface";

/** PDF fayl nomini serverdan olib, to'liq URL qaytaradi */
const useGeneratePdf = () => {
  const { mutate, loading } = useApi(["rh-252", "orderv2", "generate-pdf"]);

  const generatePdf = async (documentId: string): Promise<string> => {
    const response = await mutate<GeneratePdfResponse>({
      data: {},
      url: [documentId],
      options: { method: MutateRequestMethod.POST },
    });

    const fileName = get(response, "fileName");

    if (!fileName) {
      throw new Error(
        `PDF nomi topilmadi. Response: ${JSON.stringify(response)}`,
      );
    }

    // Agar fileName allaqachon to'liq URL bo'lsa (http bilan boshlansa) — shundayicha qaytaramiz
    if (fileName.startsWith("http")) {
      return fileName;
    }

    // Aks holda: asosiy URL + fayl nomi
    const baseUrl = (import.meta.env.VITE_FILE_BASE_URL ?? "").replace(
      /\/$/,
      "",
    );
    return `${baseUrl}/${fileName}`;
  };

  return {
    generatePdf,
    isGenerating: loading,
  };
};

export default useGeneratePdf;
