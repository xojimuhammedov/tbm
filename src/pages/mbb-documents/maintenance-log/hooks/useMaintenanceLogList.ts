import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { MAINTENANCE_LOG_QUERY_KEY } from "../constants/maintenance-log.constants";
import { MaintenanceLogDocument } from "../interfaces/maintenance-log.interface";
import createMaintenanceLogColumns from "../helpers/createMaintenanceLogColumns";
import { useFlowDeleteActions } from "@/shared/hooks/flow/useFlowDeleteActions.ts";

const useMaintenanceLogList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { removeWithConfirm, remove } = useDelete([MAINTENANCE_LOG_QUERY_KEY]);
  const { query, handleFilter, params } = useLists<MaintenanceLogDocument>({
    url: [MAINTENANCE_LOG_QUERY_KEY],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const {
    handleDeleteMany: handleDeleteManyAction,
    handleDeleteAll: handleDeleteAllAction,
  } = useFlowDeleteActions({
    refetch: query.refetch,
    onSuccess: () => setSelectedRowKeys([]),
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
    (id: string) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({ variant: "success", title: t("Muvaffaqiyatli"), description: t("Hujjat muvaffaqiyatli o'chirildi") });
        })
        .catch((error) => {
          toast({ variant: "destructive", title: t(get(error, "response.statusText", "Error")), description: t(get(error, "response.data.message", "Xatolik yuz berdi")) });
        });
    },
    [removeWithConfirm, query, t, toast],
  );

  const handleDeleteMany = useCallback(() => {
    handleDeleteManyAction(selectedRowKeys, remove);
  }, [selectedRowKeys, handleDeleteManyAction, remove]);

  const handleDeleteAll = useCallback(() => {
    handleDeleteAllAction(remove);
  }, [handleDeleteAllAction, remove]);

  const handleAdd = useCallback(() => {
    navigate("/mbb/mbb-reg-documents/maintenance-log/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/mbb/mbb-reg-documents/maintenance-log/edit/${id}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () => createMaintenanceLogColumns(t, handleDelete, handleEdit, selectedRowKeys, toggleSelectRow, toggleSelectAll, allIds),
    [t, handleDelete, handleEdit, selectedRowKeys, toggleSelectRow, toggleSelectAll, allIds],
  );

  return {
    loading: query.isLoading, columns, dataSource: query.data, params, handleFilter,
    handleAdd, handleDelete, handleDeleteMany, handleDeleteAll,
    selectedRowKeys, setSelectedRowKeys, toggleSelectRow, toggleSelectAll,
  };
};

export default useMaintenanceLogList;
