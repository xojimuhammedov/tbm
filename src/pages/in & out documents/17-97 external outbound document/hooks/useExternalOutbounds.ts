import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import {
    EXTERNAL_OUTBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-97 external outbound document/constants/external.outbound.constants.ts";
import {
    ExternalOutboundInterface
} from "@/pages/in & out documents/17-97 external outbound document/interfaces/external.outbound.interface.ts";
import createExternalOutboundColumns
    from "@/pages/in & out documents/17-97 external outbound document/helpers/createExternalOutboundColumns.tsx";
const useExternalOutbounds = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { removeWithConfirm } = useDelete([
      EXTERNAL_OUTBOUND_QUERY_KEY,
  ]);

  const { query, handleFilter, params } =
      useLists<ExternalOutboundInterface>({
        url: [EXTERNAL_OUTBOUND_QUERY_KEY],
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
    navigate("/inout/exout-97/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (id: string) => {
        navigate(`/inout/exout-97/edit/${id}`);
      },
      [navigate],
  );

  const columns = useMemo(
      () => createExternalOutboundColumns(t, handleDelete, handleEdit),
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

export default useExternalOutbounds;
