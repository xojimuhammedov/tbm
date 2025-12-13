import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import createF56Columns from "@/pages/rtsi/f-56/helpers/createF56Columns.tsx";
import { F56DocumentInterface } from "@/pages/rtsi/f-56/interfaces/f56Document.interface.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { F56_QUERY_KEY } from "@/pages/rtsi/f-56/constants/f56.constants.ts";
import { useNavigate } from "react-router-dom";
import useF56Document from "@/pages/rtsi/f-56/hooks/useF56Document.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast.ts";

const useF56Documents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [id, setId] = useState<F56DocumentInterface["_id"] | null>(null);
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<F56DocumentInterface["_id"] | null>(
    null,
  );
  const { removeWithConfirm } = useDelete([F56_QUERY_KEY]);
  const { query, handleFilter, params } = useLists<F56DocumentInterface>({
    url: [F56_QUERY_KEY],
  });

  const { f56DocumentQuery } = useF56Document(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/rtsi/f-56/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      setId(docId);
      navigate(`/rtsi/f-56/edit/${docId}`);
    },
    [navigate],
  );

  const handleDelete = useCallback(
    (id: F56DocumentInterface["_id"]) => {
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

  const columns: ColumnType<F56DocumentInterface>[] = useMemo(
    () =>
      createF56Columns(
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
    id,
    openView,
    currentItem: f56DocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useF56Documents;
