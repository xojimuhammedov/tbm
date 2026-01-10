import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import URLS from "@/shared/constants/urls";
import {rh_231_Interface} from "@/pages/rh-231/a-231/interfaces/rh-231.interface.ts";


const useA231Document = (id: string) => {
  const applicationDocumentQuery = useGetOne<{
    data: rh_231_Interface;
  }>({
    url: [URLS.RH_231_Application, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    applicationDocumentQuery,
  };
};

export default useA231Document;
