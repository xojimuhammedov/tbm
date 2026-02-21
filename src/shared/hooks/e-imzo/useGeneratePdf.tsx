import { useApi } from "@/shared/hooks/api/useApi";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import { get } from "lodash";

interface GeneratePdfResponse {
    success: boolean;
    message: string;
    fileName: string;
}

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
            throw new Error(`PDF nomi topilmadi. Response: ${JSON.stringify(response)}`);
        }

        return fileName;
    };

    return {
        generatePdf,
        isLoading: loading,
    };
};

export default useGeneratePdf;