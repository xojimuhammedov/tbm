import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { GroupInterface } from "@/pages/groups/interfaces/group.interface.ts";
import { GROUPS_QUERY_KEY } from "@/pages/groups/constants/groups.constants.ts";
import createGroupColumns from "@/pages/groups/helpers/createGroupColumns.tsx";

const useGroups = () => {
  const { t } = useTranslation();
  const [id, setId] = useState<GroupInterface["_id"] | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [viewId, setViewId] = useState<GroupInterface["_id"] | null>(null);
  const [openView, setOpenView] = useState<boolean>(false);
  const { removeWithConfirm } = useDelete([GROUPS_QUERY_KEY]);
  const { toast } = useToast();
  const { query, handleFilter, params } = useLists<GroupInterface>({
    url: [GROUPS_QUERY_KEY],
  });

  const handleDelete = useCallback(
    (id: GroupInterface["_id"]) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`Group removed successfully`),
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

  const handleView = useCallback((id: string) => {
    setViewId(id);
    setOpenView(true);
  }, []);

  const handleCloseView = useCallback(() => {
    setOpenView(false);
    setViewId(null);
  }, []);

  const columns = useMemo(
    () => createGroupColumns(t, handleEdit, handleDelete, handleView),
    [t, handleDelete, handleEdit, handleView],
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
    openView,
    viewId,
    handleCloseView,
  };
};

export default useGroups;
