import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { LOCAL_INBOUND_QUERY_KEY } from "@/pages/in & out documents/17-98 local inbound document/constants/local.inbound.constants.ts";
import { LocalInboundInterface } from "@/pages/in & out documents/17-98 local inbound document/interfaces/local.inbound.interface.ts";
import createLocalInboundColumns from "@/pages/in & out documents/17-98 local inbound document/helpers/createLocalInboundColumns.tsx";
import { useFlowDeleteActions } from "@/shared/hooks/flow/useFlowDeleteActions.ts";

const useLocalInbounds = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { removeWithConfirm, remove } = useDelete([LOCAL_INBOUND_QUERY_KEY]);

  const { query, handleFilter, params } = useLists<LocalInboundInterface>({
    url: [LOCAL_INBOUND_QUERY_KEY],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const { handleDeleteMany: handleDeleteManyAction, handleDeleteAll: handleDeleteAllAction } =
      useFlowDeleteActions({
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

  // Single delete (old logic)
  const handleDelete = useCallback(
      (id: LocalInboundInterface["_id"]) => {
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

  // Many delete -> useFlowDeleteActions
  const handleDeleteMany = useCallback(() => {
    handleDeleteManyAction(selectedRowKeys, remove);
  }, [selectedRowKeys, handleDeleteManyAction, remove]);

  // Optional: delete all (agar UI ishlatsa)
  const handleDeleteAll = useCallback(() => {
    handleDeleteAllAction(remove);
  }, [handleDeleteAllAction, remove]);

  const handleAdd = useCallback(() => {
    navigate("/inout/locin-98/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (id: string) => {
        navigate(`/inout/locin-98/edit/${id}`);
      },
      [navigate],
  );

  const columns = useMemo(
      () =>
          createLocalInboundColumns(
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

export default useLocalInbounds;
