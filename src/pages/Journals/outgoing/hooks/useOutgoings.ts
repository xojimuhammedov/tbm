import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useFlowDeleteActions } from "@/shared/hooks/flow/useFlowDeleteActions.ts";
import {OUTGOING_QUERY_KEY} from "@/pages/Journals/outgoing/constants/outgoing.constants.ts";
import {OutgoingInterface} from "@/pages/Journals/outgoing/interfaces/outgoing.interface.ts";
import createOutgoingColumns from "@/pages/Journals/outgoing/helpers/createOutgoingColumns.tsx";

const useOutgoings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { removeWithConfirm, remove } = useDelete([OUTGOING_QUERY_KEY]);
  const { query, handleFilter, params } = useLists<OutgoingInterface>({
    url: [OUTGOING_QUERY_KEY],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const { handleDeleteMany: handleDeleteManyAction, handleDeleteAll: handleDeleteAllAction } = useFlowDeleteActions({
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
      (id: OutgoingInterface["_id"]) => {
        removeWithConfirm(id)
            .then(() => {
              query.refetch();
              toast({
                variant: "success",
                title: t("Muvaffaqiyatli"),
                description: t("Hujjat muvaffaqiyatli o'chirildi"),
              });
            })
            .catch((error) => {
              toast({
                variant: "destructive",
                title: t(get(error, "response.statusText", "Error")),
                description: t(
                    get(error, "response.data.message", "Xatolik yuz berdi"),
                ),
              });
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
    navigate("/journals/outgoing/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (id: string) => {
        navigate(`/journals/outgoing/edit/${id}`);
      },
      [navigate],
  );

  const columns = useMemo(
      () =>
          createOutgoingColumns(
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
    selectedRowKeys,
    setSelectedRowKeys,
    toggleSelectRow,
    toggleSelectAll,
  };
};

export default useOutgoings;