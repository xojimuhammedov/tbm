import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import {
    LOCAL_OUTBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-99 local outbound document/constants/local.outbound.constants.ts";
import {
    LocalOutboundInterface
} from "@/pages/in & out documents/17-99 local outbound document/interfaces/local.outbound.interface.ts";
import {
    ExternalOutboundInterface
} from "@/pages/in & out documents/17-97 external outbound document/interfaces/external.outbound.interface.ts";
import createLocalOutboundColumns
    from "@/pages/in & out documents/17-99 local outbound document/helpers/createLocalOutboundColumns.tsx";
const useLocalOutbounds = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { removeWithConfirm } = useDelete([
      LOCAL_OUTBOUND_QUERY_KEY,
  ]);

  const { query, handleFilter, params } =
      useLists<LocalOutboundInterface>({
        url: [LOCAL_OUTBOUND_QUERY_KEY],
      });

  const handleDelete = useCallback(
      (id: ExternalOutboundInterface["_id"]) => {
        removeWithConfirm(id)
            .then(() => {
              query.refetch();
              toast({
                variant: "success",
                title: t("Success"),
                description: t("Channel removed successfully"),
              });
            })
            .catch((error) => {
              toast({
                variant: "destructive",
                title: t(get(error, "response.statusText", "Error")),
                description: t(
                    get(
                        error,
                        "response.data.message",
                        "An error occurred. Contact the administrator",
                    ),
                ),
              });
            });
      },
      [removeWithConfirm, query, t, toast],
  );

  const handleAdd = useCallback(() => {
    navigate("/inout/locout-99/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (id: string) => {
        navigate(`/inout/locout-99/edit/${id}`);
      },
      [navigate],
  );

  const columns = useMemo(
      () => createLocalOutboundColumns(t, handleDelete, handleEdit),
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

export default useLocalOutbounds;
