import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import useLists from "@/shared/hooks/useLists.ts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/shared/hooks/useToast.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { get } from "lodash";
import URLS from "@/shared/constants/urls";
import KEYS from "@/shared/constants/keys";
import { OrderApplication } from "../interfaces/order.interface";
import createOrderColumns from "../helpers/createApplicationColumns";
import useOrderDocument from "@/pages/rh-252/a-252/hooks/useApplicationDocument.ts";

const useApplicationDocuments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [openView, setOpenView] = useState(false);
  const [openEditCode, setOpenEditCode] = useState(false);
  const [editCodeId, setEditCodeId] = useState<string | null>(null);
  const [editCodeValue, setEditCodeValue] = useState<string>("");
  const [viewId, setViewId] = useState<OrderApplication["_id"] | null>(null);

  const { removeWithConfirm } = useDelete([KEYS.RH_Order_Application]);
  const { query, handleFilter, params } = useLists<OrderApplication>({
    url: [URLS.RH_Order_Application],
    queryKey: [KEYS.RH_Order_Application],
  });

  const { applicationDocumentQuery } = useOrderDocument(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/rh-252/a-252/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (docId: string) => {
        navigate(`/rh-252/a-252/edit/${docId}`);
      },
      [navigate],
  );

  const handleEditCode = useCallback((docId: string, currentCode: string) => {
    setEditCodeId(docId);
    setEditCodeValue(currentCode);
    setOpenEditCode(true);
  }, []);

  const handleCloseEditCode = useCallback((open: boolean) => {
    setOpenEditCode(open);
    if (!open) {
      setEditCodeId(null);
      setEditCodeValue("");
    }
  }, []);

  const handleEditCodeSuccess = useCallback(() => {
    query.refetch();
  }, [query]);

  const handleView = useCallback((docId: string) => {
    setViewId(docId);
    setOpenView(true);
  }, []);

  const handleCloseView = useCallback((open: boolean) => {
    setOpenView(open);
    if (!open) setViewId(null);
  }, []);

  const handleDelete = useCallback(
      (id: OrderApplication["_id"]) => {
        if (!id) return;
        removeWithConfirm(id)
            .then(() => {
              query.refetch();
              toast({
                variant: "success",
                title: t(`Success`),
                description: t(`Application document successfully deleted`),
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
      [query, removeWithConfirm, t, toast],
  );

  /** E-IMZO sahifasiga yo'naltirish */
  const handleEImzo = useCallback(
      (docId: string) => {
        navigate(`/rh-252/a-252/sign/${docId}`);
      },
      [navigate],
  );


  const handleEImzoProgress = useCallback(
      (docId: string) => {
        navigate(`/rh-252/a-252/progress/${docId}`);
      },
      [navigate],
  );

  const columns: ColumnType<OrderApplication>[] = useMemo(
      () =>
          createOrderColumns(
              t as unknown as (...args: TranslationArgsType) => string,
              handleEdit,
              handleDelete,
              handleView,
              handleEditCode,
              handleEImzo,
              handleEImzoProgress
          ),
      [handleDelete, handleEdit, handleView, handleEditCode, handleEImzo, t],
  );

  return {
    params,
    handleAdd,
    handleFilter,
    loading: query.isLoading,
    dataSource: query.data,
    columns,
    openView,
    currentItem: applicationDocumentQuery.data?.data,
    handleCloseView,
    openEditCode,
    handleEImzoProgress,
    editCodeId,
    editCodeValue,
    handleCloseEditCode,
    handleEditCodeSuccess,
  };
};

export default useApplicationDocuments;