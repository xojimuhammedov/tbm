import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import createF51Columns from "@/pages/rtsi/f-51/helpers/createF51Columns.tsx";
import { F51DocumentInterface } from "@/pages/rtsi/f-51/interfaces/f51Document.interface.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { F51_QUERY_KEY } from "@/pages/rtsi/f-51/constants/f51.constants.ts";
import { useNavigate } from "react-router-dom";
import useF51Document from "@/pages/rtsi/f-51/hooks/useF51Document.ts";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";

const useF51Documents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<F51DocumentInterface["_id"] | null>(
    null,
  );
  const { removeWithConfirm } = useDelete([F51_QUERY_KEY]);
  const { query, handleFilter, params } = useLists<F51DocumentInterface>({
    url: [F51_QUERY_KEY],
  });

  const { f51DocumentQuery } = useF51Document(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/gras/b-231/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      navigate(`/gras/b-231/edit/${docId}`);
    },
    [navigate],
  );

  const handleDelete = useCallback(
    (id: F51DocumentInterface["_id"]) => {
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

  const handleView = useCallback((docId: string) => {
    setViewId(docId);
    setOpenView(true);
  }, []);

  const handleCloseView = useCallback((open: boolean) => {
    setOpenView(open);
    if (!open) setViewId(null);
  }, []);

  const columns: ColumnType<F51DocumentInterface>[] = useMemo(
    () =>
      createF51Columns(
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
    currentItem: f51DocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useF51Documents;
