import { useApi } from "@/shared/hooks/api/useApi";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";

const useCancelProcess = () => {
    const { mutate, loading } = useApi(["rh-252", "share", "cancel"]);

    const cancelProcess = async (documentId: string): Promise<{ success: boolean; message: string }> => {
        return await mutate({
            data: { document_id: documentId },
            options: { method: MutateRequestMethod.POST },
        });
    };

    return {
        cancelProcess,
        isCancelling: loading,
    };
};

export default useCancelProcess;