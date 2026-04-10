import useGetOne from "@/shared/hooks/api/useGetOne.ts";

const useSignDocumentData = (id: string, docModel: string) => {
  const baseUrl = docModel === "Requisition" ? "requistion" : "memo";
  
  const applicationDocumentQuery = useGetOne<any>({
    url: [baseUrl, id || ""],
    queryKey: [baseUrl, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    applicationDocumentQuery,
  };
};

export default useSignDocumentData;
