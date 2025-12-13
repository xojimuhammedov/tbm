import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import { OperativeDocumentInterface } from "@/pages/operative/interfaces/operativeDocument.interface.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { OPERATIVE_QUERY_KEY } from "@/pages/operative/constants/operative.constants.ts";
import { useNavigate } from "react-router-dom";
import createOperativeColumns from "@/pages/operative/helpers/createOperativeColumns.tsx";
import useOperativeDocument from "@/pages/operative/hooks/useOperativeDocument.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { get } from "lodash";

const useOperativeDocuments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<
    OperativeDocumentInterface["_id"] | null
  >(null);
  const { removeWithConfirm } = useDelete([OPERATIVE_QUERY_KEY]);
  const { query, handleFilter, params } = useLists<OperativeDocumentInterface>({
    url: [OPERATIVE_QUERY_KEY],
  });

  const { operativeDocumentQuery } = useOperativeDocument(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/operational-work/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      navigate(`/operational-work/edit/${docId}`);
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
    (id: OperativeDocumentInterface["_id"]) => {
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

  const columns: ColumnType<OperativeDocumentInterface>[] = useMemo(
    () =>
      createOperativeColumns(
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
    currentItem: operativeDocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useOperativeDocuments;
