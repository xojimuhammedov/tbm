import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import { useApi } from "@/shared/hooks/api/useApi";

export const useManageRecipients = () => {
  const { mutate, loading } = useApi([]);

  // Endpoints updated to user's specified requirement
  const addRecipient = async (
    documentId: string,
    userId: string,
    isEditor: boolean,
    type: "APPROVAL" | "SIGNING" = "APPROVAL",
  ) => {
    // We now send to /bulk API, but wrapped in single user payload
    const payload = {
      document_id: documentId,
      isQueue: false,
      users: type === "APPROVAL" ? [{ user_id: userId, isEditor }] : [],
      signer: type === "SIGNING" ? userId : undefined,
    };
    return await mutate({
      url: ["rh-252", "share", "bulk"],
      data: payload,
      options: { method: MutateRequestMethod.POST },
    });
  };

  const removeRecipient = async (targetId: string) => {
    // Only pass the shared_id as targetId in url for cancel
    return await mutate({
      url: ["rh-252", "share", "cancel", targetId],
      data: {},
      options: { method: MutateRequestMethod.PATCH },
    });
  };

  return {
    addRecipient,
    removeRecipient,
    isModifying: loading,
  };
};
