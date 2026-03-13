import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { POSITION_QUERY_KEY } from "@/pages/position/constants/position.constants.ts";
import { PositionInterface } from "@/pages/position/interfaces/position.interface.ts";
import createPositionColumns from "@/pages/position/helpers/createPositionColumns.tsx";
import { useFlowDeleteActions } from "@/shared/hooks/flow/useFlowDeleteActions.ts";

const usePositions = () => {
  const { t } = useTranslation();
  const [id, setId] = useState<PositionInterface["_id"] | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { removeWithConfirm, remove } = useDelete([POSITION_QUERY_KEY]);
  const { toast } = useToast();
  const { query, handleFilter, params }: any = useLists<PositionInterface>({
    url: [POSITION_QUERY_KEY],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const {
    handleDeleteAll: handleDeleteAllAction,
    handleDeleteMany: handleDeleteManyAction,
  } = useFlowDeleteActions({
    refetch: query.refetch,
    onSuccess: () => {
      setSelectedRowKeys([]);
    },
  });

  const toggleSelectRow = useCallback((id: string) => {
    setSelectedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const toggleSelectAll = useCallback((ids: string[]) => {
    setSelectedRowKeys((prev) => (prev.length === ids.length ? [] : ids));
  }, []);

  const allIds = useMemo(
    () => query.data?.docs?.map((item: any) => item._id) || [],
    [query.data],
  );

  const handleDelete = useCallback(
    (id: string) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t("Success"),
            description: t("Position removed successfully"),
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: t(`${get(error, "response.statusText", "Error")}`),
            description: t(
              `${get(error, "response.data.message", "An error occurred.")}`,
            ),
          });
        });
    },
    [removeWithConfirm, t, toast, query.refetch],
  );

  const handleDeleteMany = useCallback(() => {
    handleDeleteManyAction(selectedRowKeys, (_endpoint: string, data: any) =>
      remove("hard", data),
    );
  }, [selectedRowKeys, handleDeleteManyAction, remove]);

  const handleDeleteAll = useCallback(() => {
    handleDeleteAllAction(remove);
  }, [handleDeleteAllAction, remove]);

  const handleAdd = useCallback(() => {
    setOpenForm(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenForm(false);
    setId(null);
  }, []);

  const handleSave = useCallback(() => {
    query.refetch();
    handleClose();
  }, [handleClose, query]);

  const handleEdit = useCallback((id: string) => {
    setId(id);
    setOpenForm(true);
  }, []);

  const columns = useMemo(
    () =>
      createPositionColumns(
        t,
        handleDelete,
        handleEdit,
        selectedRowKeys,
        toggleSelectRow,
        toggleSelectAll,
        allIds,
      ),
    [
      t,
      handleDelete,
      handleEdit,
      selectedRowKeys,
      toggleSelectRow,
      toggleSelectAll,
      allIds,
    ],
  );

  return {
    loading: query.isLoading || query.isFetching,
    columns,
    dataSource: query.data,
    params,
    handleFilter,
    handleSave,
    handleAdd,
    handleClose,
    openForm,
    id,
    handleDeleteMany,
    handleDeleteAll,
    selectedRowKeys,
  };
};

export default usePositions;
