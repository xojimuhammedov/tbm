import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { ROLE_QUERY_KEY } from "@/pages/role/constants/role.constants.ts";
import { RoleInterface } from "@/pages/role/interfaces/role.interface.ts";
import { createRoleColumns } from "@/pages/role/helpers";

const useRoles = () => {
  const { t } = useTranslation();
  const [id, setId] = useState<RoleInterface["_id"] | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { removeWithConfirm } = useDelete([ROLE_QUERY_KEY]);
  const { toast } = useToast();
  const { query, handleFilter, params } = useLists<RoleInterface>({
    url: [ROLE_QUERY_KEY],
  });

  const handleDelete = useCallback(
    (id: RoleInterface["_id"]) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`System user removed successfully`),
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
    [removeWithConfirm, t, toast],
  );

  const handleAdd = useCallback(() => {
    setOpenForm(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenForm(false);
    setId(null);
  }, []);

  const handleSave = useCallback(() => {
    query.refetch();
    handleClose();
  }, [handleClose]);

  const handleEdit = useCallback((id: string) => {
    setId(id);
    setOpenForm(true);
  }, []);

  const columns = useMemo(
    () => createRoleColumns(t, handleDelete, handleEdit),
    [t, handleDelete, handleEdit],
  );

  return {
    loading: query.isLoading,
    columns,
    dataSource: query.data,
    params,
    handleFilter,
    handleSave,
    handleAdd,
    handleClose,
    openForm,
    id,
  };
};

export default useRoles;
