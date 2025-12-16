import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import useLists from "@/shared/hooks/useLists.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import URLS from "@/shared/constants/urls";
import KEYS from "@/shared/constants/keys";
import { Num3ApplicationInterface } from "@/pages/rh-252/rh-3_3/interfaces/Num3.interface.ts";
import createNum3ApplicationColumns from "@/pages/rh-252/rh-3_3/helpers/createNum3ApplicationColumns.tsx";

const useNum3Application = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { removeWithConfirm } = useDelete([URLS.RH_B_Application]);

  const { query, handleFilter, params } = useLists<Num3ApplicationInterface>({
    url: [URLS.RH_B_Application],
    queryKey: [KEYS.RH_B_Application],
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
    navigate("/rh-252/rh-3_3/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/rh-252/rh-3_3/edit/${id}`);
    },
    [navigate],
  );

  const handleView = useCallback(
    (id: string) => {
      navigate(`/rh-252/rh-3_3/view/${id}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () => createNum3ApplicationColumns(t, handleEdit, handleDelete, handleView),
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

export default useNum3Application;
