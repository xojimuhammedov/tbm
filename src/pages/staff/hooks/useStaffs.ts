import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { STAFF_QUERY_KEY } from "../constants/staff.constants.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { StaffInterface } from "@/pages/staff/interfaces/staff.interface.ts";
import createStaffFilters from "../helpers/createStaffFilters.tsx";
import { createStaffColumns } from "@/pages/staff/helpers";

const useStaffs = () => {
  const { t } = useTranslation();
  const [id, setId] = useState<StaffInterface["_id"] | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [viewId, setViewId] = useState<StaffInterface["_id"] | null>(null);
  const [openView, setOpenView] = useState<boolean>(false);
  const { removeWithConfirm } = useDelete([STAFF_QUERY_KEY]);
  const { toast } = useToast();
  const { query, handleFilter, params } = useLists<StaffInterface>({
    url: [STAFF_QUERY_KEY],
  });

  const handleDelete = useCallback(
    (id: StaffInterface["_id"]) => {
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

  const handleView = useCallback((id: string) => {
    setViewId(id);
    setOpenView(true);
  }, []);

  const handleCloseView = useCallback(() => {
    setOpenView(false);
    setViewId(null);
  }, []);

  const columns = useMemo(
    () => createStaffColumns(t, handleDelete, handleEdit, handleView),
    [t, handleDelete, handleEdit, handleView],
  );

  const filters = useMemo(() => createStaffFilters(t), [t]);

  return {
    loading: query.isLoading,
    columns,
    dataSource: query.data,
    filters,
    params,
    handleFilter,
    handleSave,
    handleAdd,
    handleClose,
    openForm,
    id,
    // view modal controls
    openView,
    viewId,
    handleCloseView,
  };
};

export default useStaffs;
