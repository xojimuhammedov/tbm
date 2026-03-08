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
    return await mutate({
      url: ["rh-252", "share"],
      data: { document_id: documentId, to_id: userId, type, isEditor },
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
