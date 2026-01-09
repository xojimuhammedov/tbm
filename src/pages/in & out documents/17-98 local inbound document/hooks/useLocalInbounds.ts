import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import {
    LOCAL_INBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-98 local inbound document/constants/local.inbound.constants.ts";
import {
    LocalInboundInterface
} from "@/pages/in & out documents/17-98 local inbound document/interfaces/local.inbound.interface.ts";
import createLocalInboundColumns
    from "@/pages/in & out documents/17-98 local inbound document/helpers/createLocalInboundColumns.tsx";
const useLocalInbounds = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { removeWithConfirm } = useDelete([
    LOCAL_INBOUND_QUERY_KEY,
  ]);

  const { query, handleFilter, params } =
      useLists<LocalInboundInterface>({
        url: [LOCAL_INBOUND_QUERY_KEY],
      });

  const handleDelete = useCallback(
      (id: LocalInboundInterface["_id"]) => {
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
    navigate("/inout/locin-98/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (id: string) => {
        navigate(`/inout/locin-98/edit/${id}`);
      },
      [navigate],
  );

  const columns = useMemo(
      () => createLocalInboundColumns(t, handleDelete, handleEdit),
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

export default useLocalInbounds;
