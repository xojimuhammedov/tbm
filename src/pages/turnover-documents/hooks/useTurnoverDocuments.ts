import useLists from "@/shared/hooks/useLists";
import { TurnoverDocument } from "../interfaces/turnover.interface";
import { useMemo } from "react";
import createTurnoverColumns from "../helpers/createTurnoverColumns";
import { useTranslation } from "react-i18next";
import { TranslationArgsType } from "dgz-ui-shared/types";

const useTurnoverDocuments = () => {
  const { t } = useTranslation();

  const { query, handleFilter, params } = useLists<TurnoverDocument>({
    url: ["rh-252/orderv2/inbox"],
    queryKey: ["turnover-documents-inbox"],
  });

  const columns = useMemo(
    () =>
      createTurnoverColumns(
        t as unknown as (...args: TranslationArgsType) => string,
      ),
    [t],
  );

  return {
    query,
    handleFilter,
    params,
    columns,
    dataSource: query.data,
    loading: query.isLoading,
  };
};

export default useTurnoverDocuments;
