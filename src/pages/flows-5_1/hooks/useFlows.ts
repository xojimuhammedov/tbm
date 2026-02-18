import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { FLOWS_5_1_QUERY_KEY } from "@/pages/flows-5_1/constants/flows.constants.ts";
import { FlowInterface } from "@/pages/flows-5_1/interfaces/flow.interface.ts";
import createFlowColumns from "@/pages/flows-5_1/helpers/createFlowColumns.tsx";
import { useNavigate } from "react-router-dom";
import { useFlowDeleteActions } from "@/shared/hooks/flow/useFlowDeleteActions.ts";

const useFlows = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { removeWithConfirm, remove } = useDelete([FLOWS_5_1_QUERY_KEY]);
  const { toast } = useToast();

  const { query, handleFilter, params } = useLists<FlowInterface>({
    url: [FLOWS_5_1_QUERY_KEY],
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
    () => query.data?.docs?.map((item) => item._id) || [],
    [query.data],
  );

  const handleDelete = useCallback(
    (id: FlowInterface["_id"]) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`Flow removed successfully`),
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
    [removeWithConfirm, t, toast, query],
  );

  const handleDeleteMany = useCallback(() => {
    handleDeleteManyAction(selectedRowKeys, remove);
  }, [selectedRowKeys, handleDeleteManyAction, remove]);

  const handleDeleteAll = useCallback(() => {
    handleDeleteAllAction(remove);
  }, [handleDeleteAllAction, remove]);

  const handleUpdateManySuccess = useCallback(() => {
    query.refetch();
    setSelectedRowKeys([]);
  }, [query]);

  const handleAdd = useCallback(() => {
    navigate("/flows-5_1/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/flows-5_1/edit/${id}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () =>
      createFlowColumns(
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
    loading: query.isLoading,
    columns,
    dataSource: query.data,
    params,
    handleFilter,
    handleAdd,
    handleDelete,
    handleDeleteMany,
    handleDeleteAll,
    handleUpdateManySuccess,
    selectedRowKeys,
    setSelectedRowKeys,
    toggleSelectRow,
    toggleSelectAll,
  };
};

export default useFlows;
