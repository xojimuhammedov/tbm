import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "dgz-ui-shared/hooks";
import { LOCAL_INBOUND_QUERY_KEY } from "@/pages/in & out documents/17-98 local inbound document/constants/local.inbound.constants.ts";
import { LocalInboundInterface } from "@/pages/in & out documents/17-98 local inbound document/interfaces/local.inbound.interface.ts";
import createLocalInboundColumns from "@/pages/in & out documents/17-98 local inbound document/helpers/createLocalInboundColumns.tsx";
import { ROW_CHECK_DELETE } from "@/shared/constants/rowCheck.delete.ts";

const useLocalInbounds = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { confirm }: any = useConfirm();
  const { removeWithConfirm, remove } = useDelete([LOCAL_INBOUND_QUERY_KEY]);

  const { query, handleFilter, params } = useLists<LocalInboundInterface>({
    url: [LOCAL_INBOUND_QUERY_KEY],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

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

  const handleDeleteMany = useCallback(() => {
    if (selectedRowKeys.length === 0) {
      toast({
        variant: "destructive",
        title: t("Xatolik"),
        description: t("Hech qanday element tanlanmagan"),
      });
      return;
    }

    return new Promise((resolve, reject) => {
      confirm({
        title: t("Tasdiqlash"),
        description: t(
          "{{count}} ta hujjatni o'chirishga ishonchingiz komilmi?",
          {
            count: selectedRowKeys.length,
          },
        ),
        onConfirm: () => {
          remove(ROW_CHECK_DELETE, { ids: selectedRowKeys })
            .then(() => {
              toast({
                variant: "success",
                title: t("Muvaffaqiyatli"),
                description: t("Tanlangan hujjatlar o'chirildi"),
              });
              setSelectedRowKeys([]);
              query.refetch();
              resolve(true);
            })
            .catch((error) => {
              toast({
                variant: "destructive",
                title: t(get(error, "response.statusText", "Error")),
                description: t(get(error, "response.data.message", "Xatolik")),
              });
              reject(error);
            });
        },
        onCancel: () => reject(new Error("Cancelled")),
      });
    });
  }, [selectedRowKeys, remove, confirm, query, t, toast]);

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
    handleDeleteMany,
    selectedRowKeys,
    setSelectedRowKeys,
    toggleSelectRow,
    toggleSelectAll,
  };
};

export default useLocalInbounds;
