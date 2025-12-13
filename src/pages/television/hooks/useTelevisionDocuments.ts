import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import createTelevisionColumns from "@/pages/television/helpers/createTelevisionColumns.tsx";
import { TelevisionDocumentInterface } from "@/pages/television/interfaces/televisionDocument.interface.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { TELEVISION_QUERY_KEY } from "@/pages/television/constants/television.constants.ts";
import { useNavigate } from "react-router-dom";
import useTelevisionDocument from "@/pages/television/hooks/useTelevisionDocument.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";

const useTelevisionDocuments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<
    TelevisionDocumentInterface["_id"] | null
  >(null);
  const { removeWithConfirm } = useDelete([TELEVISION_QUERY_KEY]);
  const { query, handleFilter, params } = useLists<TelevisionDocumentInterface>(
    {
      url: [TELEVISION_QUERY_KEY],
    },
  );

  const { televisionDocumentQuery } = useTelevisionDocument(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/television/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      navigate(`/television/edit/${docId}`);
    },
    [navigate],
  );

  const handleView = useCallback((docId: string) => {
    setViewId(docId);
    setOpenView(true);
  }, []);

  const handleCloseView = useCallback((open: boolean) => {
    setOpenView(open);
    if (!open) setViewId(null);
  }, []);

  const handleDelete = useCallback(
    (id: TelevisionDocumentInterface["_id"]) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`F56 document successfully`),
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: t(`${get(error, "response.statusText", "Error")}`),
            description: t(
              `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
            ),
          });
        });
    },
    [removeWithConfirm, t, toast],
  );

  const columns: ColumnType<TelevisionDocumentInterface>[] = useMemo(
    () =>
      createTelevisionColumns(
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
    loading: query.isLoading,
    dataSource: query.data,
    columns,
    openView,
    currentItem: televisionDocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useTelevisionDocuments;
