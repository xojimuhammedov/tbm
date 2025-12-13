import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import createRTTSIColumns from "@/pages/rttsi/helpers/createRTTSIColumns.tsx";
import { RTTSIDocumentInterface } from "@/pages/rttsi/interfaces/rttsiDocument.interface.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { RTTSI_QUERY_KEY } from "@/pages/rttsi/constants/rttsi.constants.ts";
import { useNavigate } from "react-router-dom";
import useRTTSIDocument from "@/pages/rttsi/hooks/useRTTSIDocument.ts";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";

const useRTTSIDocuments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<RTTSIDocumentInterface["_id"] | null>(
    null,
  );
  const { removeWithConfirm } = useDelete([RTTSI_QUERY_KEY]);
  const { query, handleFilter, params } = useLists<RTTSIDocumentInterface>({
    url: [RTTSI_QUERY_KEY],
  });

  const { rttsiDocumentQuery } = useRTTSIDocument(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/rttsi/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      navigate(`/rttsi/edit/${docId}`);
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
    (id: RTTSIDocumentInterface["_id"]) => {
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

  const columns: ColumnType<RTTSIDocumentInterface>[] = useMemo(
    () =>
      createRTTSIColumns(
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
    currentItem: rttsiDocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useRTTSIDocuments;
