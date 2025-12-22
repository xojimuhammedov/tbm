import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import { FApplicationInterface } from "../interfaces/f-252.interface";
import useLists from "@/shared/hooks/useLists.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import KEYS from "@/shared/constants/keys";
import createFApplicationColumns from "@/pages/rh-252/f-252/helpers/createFApplicationColumns.tsx";
import URLS from "@/shared/constants/urls";
import useFApplication from "@/pages/rh-252/f-252/hooks/useFApplication.ts";

  const useFApplications = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<string | null>(null);
  const { removeWithConfirm } = useDelete([URLS.RH_F_Application]);
  const { query, handleFilter, params } = useLists<FApplicationInterface>({
    url: [URLS.RH_F_Application],
    queryKey: [KEYS.RH_F_Application],
  });
  const { applicationDocumentQuery } = useFApplication(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/rh-252/f-252/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (id: string) => {
        navigate(`/rh-252/f-252/edit/${id}`);
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

  const columns: ColumnType<FApplicationInterface>[] = useMemo(
      () =>
          createFApplicationColumns(
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

export default useFApplications;