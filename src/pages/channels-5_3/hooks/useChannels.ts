import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useConfirm } from "dgz-ui-shared/hooks"; // Confirm hook qo'shildi
import {
  CHANNELS_5_3_QUERY_KEY,
} from "@/pages/channels-5_3/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";
import createChannelColumns from "@/pages/channels-5_3/helpers/createChannelColumns.tsx";
import { useNavigate } from "react-router-dom";
import { CHANNELS_ID_DELETE } from "@/pages/channels-id/constants/channels.constants.ts";

const useChannels = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { removeWithConfirm, remove } = useDelete([CHANNELS_5_3_QUERY_KEY]);
  const { toast } = useToast();
  const { confirm }: any = useConfirm();

  const { query, handleFilter, params } = useLists<ChannelInterface>({
    url: [CHANNELS_5_3_QUERY_KEY],
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
    (id: ChannelInterface["_id"]) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`Channel removed successfully`),
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
      description: t("{{count}} ta kanalni o'chirishga ishonchingiz komilmi?", {
        count: selectedRowKeys.length,
      }),
      onConfirm: () => {
        remove(CHANNELS_ID_DELETE, { ids: selectedRowKeys })
          .then(() => {
            toast({
              variant: "success",
              title: t("Muvaffaqiyatli"),
              description: t("{{count}} ta kanal o'chirildi", {
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
    navigate("/channels-5_3/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/channels-5_3/edit/${id}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () =>
      createChannelColumns(
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

export default useChannels;