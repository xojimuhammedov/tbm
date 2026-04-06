import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import URLS from "@/shared/constants/urls";
import { OrderApplication } from "../interfaces/order.interface";

const useOrderDocument = (id: string) => {
  const applicationDocumentQuery = useGetOne<{
    data: OrderApplication;
  }>({
    url: [URLS.RH_Order_Application, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    applicationDocumentQuery,
  };
};

export default useOrderDocument;
