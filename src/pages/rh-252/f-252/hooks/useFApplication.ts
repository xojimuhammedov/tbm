import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import useLists from "@/shared/hooks/useLists.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import URLS from "@/shared/constants/urls";
import KEYS from "@/shared/constants/keys";
import { FApplicationInterface } from "../interfaces/f-252.interface";
import createFApplicationColumns from "@/pages/rh-252/f-252/helpers/createFApplicationColumns.tsx";

const useFApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { removeWithConfirm } = useDelete([URLS.RH_F_Application]);

  const { query, handleFilter, params } = useLists<FApplicationInterface>({
    url: [URLS.RH_F_Application],
    queryKey: [KEYS.RH_F_Application],
  });

  const handleDelete = useCallback(
    (id: string) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t("Success"),
            description: t("Successfully deleted"),
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: t(`${get(error, "response.statusText", "Error")}`),
            description: t(
              `${get(error, "response.data.message", "An error occurred")}`,
            ),
          });
        });
    },
    [removeWithConfirm, t, toast, query],
  );

  const handleAdd = useCallback(() => {
    navigate("/rh-252/f-252/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/rh-252/f-252/edit/${id}`);
    },
    [navigate],
  );

  const handleView = useCallback(
    (id: string) => {
      navigate(`/rh-252/f-252/view/${id}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () => createFApplicationColumns(t, handleEdit, handleDelete, handleView),
    [t, handleEdit, handleDelete, handleView],
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

export default useFApplication;
