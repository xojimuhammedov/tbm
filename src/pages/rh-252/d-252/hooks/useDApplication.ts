import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import useLists from "@/shared/hooks/useLists.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import URLS from "@/shared/constants/urls";
import KEYS from "@/shared/constants/keys";
import { DApplicationInterface } from "@/pages/rh-252/d-252/interfaces/d-252.interface.ts";
import createDApplicationColumns from "@/pages/rh-252/d-252/helpers/createDApplicationColumns.tsx";

const useDApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { removeWithConfirm } = useDelete([URLS.RH_D_Application]);

  const { query, handleFilter, params } = useLists<DApplicationInterface>({
    url: [URLS.RH_D_Application],
    queryKey: [KEYS.RH_D_Application],
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
    navigate("/rh-252/d-252/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/rh-252/d-252/edit/${id}`);
    },
    [navigate],
  );

  const handleView = useCallback(
    (id: string) => {
      navigate(`/rh-252/d-252/view/${id}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () => createDApplicationColumns(t, handleEdit, handleDelete, handleView),
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

export default useDApplication;
