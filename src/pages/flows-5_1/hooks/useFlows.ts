import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useConfirm } from "dgz-ui-shared/hooks";
import {
  FLOWS_5_1_QUERY_KEY,
} from "@/pages/flows-5_1/constants/flows.constants.ts";
import { FlowInterface } from "@/pages/flows-5_1/interfaces/flow.interface.ts";
import createFlowColumns from "@/pages/flows-5_1/helpers/createFlowColumns.tsx";
import { useNavigate } from "react-router-dom";
import { CHANNELS_ID_DELETE } from "@/pages/channels-id/constants/channels.constants.ts";

const useFlows = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { removeWithConfirm, remove } = useDelete([FLOWS_5_1_QUERY_KEY]);
  const { toast } = useToast();
  const { confirm }: any = useConfirm();

  const { query, handleFilter, params } = useLists<FlowInterface>({
    url: [FLOWS_5_1_QUERY_KEY],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const toggleSelectRow = useCallback((id: string) => {
    setSelectedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback((ids: string[]) => {
    setSelectedRowKeys((prev) => (prev.length === ids.length ? [] : ids));
  }, []);

  const allIds = useMemo(
    () => query.data?.docs?.map((item) => item._id) || [],
    [query.data]
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
              `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`
            ),
          });
        });
    },
    [removeWithConfirm, t, toast, query]
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

    confirm({
      title: t("Tasdiqlash"),
      description: t("{{count}} ta oqimni o'chirishga ishonchingiz komilmi?", {
        count: selectedRowKeys.length,
      }),
      onConfirm: () => {
        remove(CHANNELS_ID_DELETE, { ids: selectedRowKeys })
          .then(() => {
            toast({
              variant: "success",
              title: t("Muvaffaqiyatli"),
              description: t("{{count}} ta oqim o'chirildi", {
                count: selectedRowKeys.length,
              }),
            });
            setSelectedRowKeys([]);
            query.refetch();
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: t(`${get(error, "response.statusText", "Error")}`),
              description: t(
                `${get(error, "response.data.message", "An error occurred.")}`
              ),
            });
          });
      },
    });
  }, [selectedRowKeys, remove, confirm, query, t, toast]);

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
        allIds
      ),
    [t, handleDelete, handleEdit, selectedRowKeys, toggleSelectRow, toggleSelectAll, allIds]
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
    selectedRowKeys,
    setSelectedRowKeys,
    toggleSelectRow,
    toggleSelectAll,
  };
};

export default useFlows;