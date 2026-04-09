import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import { TalabnomaInterface } from "@/pages/mbb/talabnoma/interfaces/Talabnoma.interface.ts";
import useLists from "@/shared/hooks/useLists.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import KEYS from "@/shared/constants/keys";
import createTalabnomaColumns from "@/pages/mbb/talabnoma/helpers/createTalabnomaColumns.tsx";
import useTalabnomaDocumentQuery from "@/pages/mbb/talabnoma/hooks/useTalabnomaDocument.ts";
import URLS from "@/shared/constants/urls.ts";

const useTalabnoma = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<string | null>(null);
  const { removeWithConfirm } = useDelete([URLS.MBB_Talabnoma]);
  const { query, handleFilter, params } = useLists<TalabnomaInterface>({
    url: [URLS.MBB_Talabnoma],
    queryKey: [KEYS.MBB_Talabnoma],
  });
  const { applicationDocumentQuery } = useTalabnomaDocumentQuery(
    viewId as string,
  );
  const handleAdd = useCallback(() => {
    navigate("/mbb/talabnoma/create");
  }, [navigate]);
  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/mbb/talabnoma/edit/${id}`);
    },
    [navigate],
  );
  const handleView = useCallback((id: string) => {
    setViewId(id);
    setOpenView(true);
  }, []);
  const handleCloseView = useCallback((open: boolean) => {
    setOpenView(open);
    if (!open) setViewId(null);
  }, []);
  const handleDelete = useCallback(
    (id: string) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t("Success"),
            description: t("Successfully deleted"),
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: t(`${get(error, "response.statusText", "Error")}`),
            description: t(
              `${get(error, "response.data.message", "An error occurred")}`,
            ),
          });
        });
    },
    [query, removeWithConfirm, t, toast],
  );

  const columns: ColumnType<TalabnomaInterface>[] = useMemo(
    () =>
      createTalabnomaColumns(
        t as unknown as (...args: TranslationArgsType) => string,
        handleEdit,
        handleDelete,
        handleView,
      ),
    [handleDelete, handleEdit, handleView, t],
  );

  return {
    params,
    handleAdd,
    handleFilter,
    loading: query.isLoading || applicationDocumentQuery.isFetching,
    dataSource: query.data,
    columns,
    openView,
    currentItem: applicationDocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useTalabnoma;
