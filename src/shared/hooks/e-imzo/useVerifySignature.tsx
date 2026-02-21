import useMutate from "@/shared/hooks/api/useMutate";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";

interface VerifyPayload {
    document_id: string;
    pkcs7wtst: string;
}

interface VerifyResponse {
    success: boolean;
    message?: string;
    [key: string]: unknown;
}

const useVerifySignature = () => {
    const { query } = useMutate<VerifyResponse>({
        url: ["rh-252", "orderv2", "verify-signature"],
        method: MutateRequestMethod.POST,
    });

    const verifySignature = async (
        documentId: string,
        pkcs7wtst: string,
    ): Promise<VerifyResponse> => {
        return query.mutateAsync({ document_id: documentId, pkcs7wtst } as VerifyPayload);
    };

    return {
        verifySignature,
        isLoading: query.isPending,
    };
};

export default useVerifySignature;