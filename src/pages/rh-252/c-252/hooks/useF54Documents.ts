import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import createF54Columns from "@/pages/rtsi/f-54/helpers/createF54Columns.tsx";
import { F54DocumentInterface } from "@/pages/rtsi/f-54/interfaces/f54Document.interface.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { F54_QUERY_KEY } from "@/pages/rtsi/f-54/constants/f54.constants.ts";
import { useNavigate } from "react-router-dom";
import useF54Document from "@/pages/rtsi/f-54/hooks/useF54Document.ts";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";

const useF54Documents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<F54DocumentInterface["_id"] | null>(
    null,
  );
  const { removeWithConfirm } = useDelete([F54_QUERY_KEY]);
  const { query, handleFilter, params } = useLists<F54DocumentInterface>({
    url: [F54_QUERY_KEY],
  });

  const { f54DocumentQuery } = useF54Document(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/rh-252/c-252/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      navigate(`/rh-252/c-252/edit/${docId}`);
    },
    [navigate],
  );

  const handleDelete = useCallback(
    (id: F54DocumentInterface["_id"]) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`F54 document successfully`),
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

  const handleView = useCallback((docId: string) => {
    setViewId(docId);
    setOpenView(true);
  }, []);

  const handleCloseView = useCallback((open: boolean) => {
    setOpenView(open);
    if (!open) setViewId(null);
  }, []);

  const columns: ColumnType<F54DocumentInterface>[] = useMemo(
    () =>
      createF54Columns(
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
    currentItem: f54DocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useF54Documents;
