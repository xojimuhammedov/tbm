import useOrderDocument from "@/pages/tbp/hujjatlar/hooks/useApplicationDocument.ts";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { get } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import createOrderColumns from "../helpers/createApplicationColumns";
import { OrderApplication } from "../interfaces/order.interface";

const useApplicationDocuments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<OrderApplication["_id"] | null>(null);

  const { removeWithConfirm } = useDelete([KEYS.TBP_Order_Application]);
  const { query, handleFilter, params } = useLists<OrderApplication>({
    url: [URLS.TBP_Order_Application],
    queryKey: [KEYS.TBP_Order_Application],
  });

  const { applicationDocumentQuery } = useOrderDocument(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/tbp/hujjatlar/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      navigate(`/tbp/hujjatlar/edit/${docId}`);
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

  const columns: ColumnType<OrderApplication>[] = useMemo(
    () =>
      createOrderColumns(
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
    currentItem: applicationDocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useApplicationDocuments;
