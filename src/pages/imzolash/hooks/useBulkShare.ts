import { useApi } from "@/shared/hooks/api/useApi";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import { BulkShareResponse } from "../interfaces/detail.interface";

const BULK_SHARE_URL = ["rh-252", "share", "bulk"];

const useBulkShare = () => {
    const { mutate, loading } = useApi(BULK_SHARE_URL);

    const sendForApproval = async (payload: {
        document_id: string;
        isQueue: boolean;
        users: { user_id: string; isEditor: boolean }[];
        signer: string;
    }): Promise<BulkShareResponse> => {
        return await mutate<BulkShareResponse>({
            data: payload,
            options: { method: MutateRequestMethod.POST },
        });
    };

    return {
        sendForApproval,
        isSending: loading,
    };
};

export default useBulkShare;