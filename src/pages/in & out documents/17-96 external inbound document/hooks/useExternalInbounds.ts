import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  EXTERNAL_INBOUND_QUERY_KEY,
} from "@/pages/in & out documents/17-96 external inbound document/constants/external-inbound.constants.ts";
import {
  ExternalInboundDocument,
} from "@/pages/in & out documents/17-96 external inbound document/interfaces/ex-in.interface.ts";
import createExternalInboundColumns
    from "@/pages/in & out documents/17-96 external inbound document/helpers/createExternalInboundColumns.tsx";
const useExternalInbounds = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { removeWithConfirm } = useDelete([
    EXTERNAL_INBOUND_QUERY_KEY,
  ]);

  const { query, handleFilter, params } =
      useLists<ExternalInboundDocument>({
        url: [EXTERNAL_INBOUND_QUERY_KEY],
      });

  const handleDelete = useCallback(
      (id: ExternalInboundDocument["_id"]) => {
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
    navigate("/inout/exin-96/create");
  }, [navigate]);

  const handleEdit = useCallback(
      (id: string) => {
        navigate(`/inout/exin-96/edit/${id}`);
      },
      [navigate],
  );

  const columns = useMemo(
      () => createExternalInboundColumns(t, handleDelete, handleEdit),
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

export default useExternalInbounds;
