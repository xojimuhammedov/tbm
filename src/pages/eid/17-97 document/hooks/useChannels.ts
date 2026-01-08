import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { CHANNELS_ID_QUERY_KEY } from "@/pages/channels-id/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface.ts";
import createChannelColumns from "@/pages/channels-id/helpers/createChannelColumns.tsx";
import { useNavigate } from "react-router-dom";

const useChannels = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { removeWithConfirm } = useDelete([CHANNELS_ID_QUERY_KEY]);
  const { toast } = useToast();
  const { query, handleFilter, params } = useLists<ChannelInterface>({
    url: [CHANNELS_ID_QUERY_KEY],
  });

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
              `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
            ),
          });
        });
    },
    [removeWithConfirm, t, toast, query],
  );

  const handleAdd = useCallback(() => {
    navigate("/eid/eid-97/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/eid/eid-97/edit/${id}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () => createChannelColumns(t, handleDelete, handleEdit),
    [t, handleDelete, handleEdit],
  );

  return {
    loading: query.isLoading,
    columns,
    dataSource: query.data,
    params,
    handleFilter,
    handleAdd,
  };
};

export default useChannels;
