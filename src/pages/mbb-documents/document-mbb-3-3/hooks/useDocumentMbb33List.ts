import useLists from "@/shared/hooks/useLists.ts";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DOCUMENT_MBB_3_3_QUERY_KEY } from "../constants/document-mbb-3-3.constants";
import { DocumentMbb33 } from "../interfaces/document-mbb-3-3.interface";
import createDocumentMbb33Columns from "../helpers/createDocumentMbb33Columns";

const useDocumentMbb33List = () => {
  const { t } = useTranslation();

  const { query, handleFilter, params } = useLists<DocumentMbb33>({
    url: [DOCUMENT_MBB_3_3_QUERY_KEY],
  });

  const columns = useMemo(
    () => createDocumentMbb33Columns(t),
    [t],
  );

  return {
    loading: query.isLoading,
    columns,
    dataSource: query.data,
    params,
    handleFilter,
  };
};

export default useDocumentMbb33List;
