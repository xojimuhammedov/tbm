import useGetOne from "@/shared/hooks/api/useGetOne.ts";

const useSignDocumentData = (id: string) => {
  const applicationDocumentQuery = useGetOne<any>({
    url: ["document_mbb", id || ""],
    queryKey: ["document_mbb", id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    applicationDocumentQuery,
  };
};

export default useSignDocumentData;
