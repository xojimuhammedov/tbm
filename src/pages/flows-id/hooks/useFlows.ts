import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { FLOWS_ID_QUERY_KEY } from "@/pages/flows-id/constants/flows.constants.ts";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface.ts";
import createFlowColumns from "@/pages/flows-id/helpers/createFlowColumns.tsx";
import { useNavigate } from "react-router-dom";
import { useFlowDeleteActions } from "@/shared/hooks/flow/useFlowDeleteActions.ts";

const useFlows = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { removeWithConfirm, remove } = useDelete([FLOWS_ID_QUERY_KEY]);
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<string | null>(null);
  const { query, handleFilter, params }: any = useLists<FlowInterface>({
    url: [FLOWS_ID_QUERY_KEY],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const { handleDeleteAll: handleDeleteAllAction, handleDeleteMany: handleDeleteManyAction } = useFlowDeleteActions({
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

  const currentItem = useMemo(() => {
    if (!viewId || !query.data) return null;
    const list = query.data.docs || get(query.data, "data.docs") || [];
    return list.find((item: FlowInterface) => (item._id || item.id) === viewId);
  }, [query.data, viewId]);

  const handleDelete = useCallback(
      (id: string) => {
        removeWithConfirm(id)
            .then(() => {
              query.refetch();
              toast({
                variant: "success",
                title: t("Success"),
                description: t("Flow removed successfully"),
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
      [removeWithConfirm, t, toast, query.refetch],
  );



  const handleDeleteMany = useCallback(() => {
    handleDeleteManyAction(selectedRowKeys, remove);
  }, [selectedRowKeys, handleDeleteManyAction, remove]);

  const handleDeleteAll = useCallback(() => {
    handleDeleteAllAction(remove);
  }, [handleDeleteAllAction, remove]);

  const handleAdd = useCallback(() => {
    navigate("/flows-id/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (id: string) => {
        navigate(`/flows-id/edit/${id}`);
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

  const columns = useMemo(
      () =>
          createFlowColumns(
              t,
              handleDelete,
              handleEdit,
              handleView,
              selectedRowKeys,
              toggleSelectRow,
              toggleSelectAll,
              allIds
          ),
      [
        t,
        handleDelete,
        handleEdit,
        handleView,
        selectedRowKeys,
        toggleSelectRow,
        toggleSelectAll,
        allIds
      ],
  );

  return {
    loading: query.isLoading || query.isFetching,
    columns,
    dataSource: query.data,
    params,
    handleFilter,
    handleAdd,
    handleDelete,
    handleDeleteMany,
    handleDeleteAll,
    openView,
    handleCloseView,
    currentItem,
    selectedRowKeys,
    setSelectedRowKeys,
    toggleSelectRow,
    toggleSelectAll,
    refetch: query.refetch
  };
};

export default useFlows;