import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import useLists from "@/shared/hooks/useLists.ts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/shared/hooks/useToast.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { get } from "lodash";
import URLS from "@/shared/constants/urls";
import KEYS from "@/shared/constants/keys";
import createOrderColumns from "../helpers/createApplicationColumns";
import {rh_231_Interface} from "@/pages/rh-231/a-231/interfaces/rh-231.interface.ts";
import useA231Document from "@/pages/rh-231/a-231/hooks/useApplicationDocument.ts";

const useA231Documents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<rh_231_Interface["_id"] | null>(null);
  const { removeWithConfirm } = useDelete([KEYS.RH_231_Application]);
  const { query, handleFilter, params } = useLists<rh_231_Interface>({
    url: [URLS.RH_231_Application],
    queryKey: [KEYS.RH_231_Application],
  });

  const { applicationDocumentQuery } = useA231Document(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/rh-231/a-231/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      navigate(`/rh-231/a-231/edit/${docId}`);
    },
    [navigate],
  );

  const handleView = useCallback((docId: string) => {
    setViewId(docId);
    setOpenView(true);
  }, []);

  const handleCloseView = useCallback((open: boolean) => {
    setOpenView(open);
    if (!open) setViewId(null);
  }, []);

  const handleDelete = useCallback(
    (id: rh_231_Interface["_id"]) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`Application document successfully deleted`),
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
    [query, removeWithConfirm, t, toast],
  );

  const columns: ColumnType<rh_231_Interface>[] = useMemo(
    () =>
      createOrderColumns(
        t as unknown as (...args: TranslationArgsType) => string,
        handleEdit,
        handleDelete,
        handleView,
      ),
    [handleDelete, handleEdit, handleView, t],
  );

  return {
    params,
    handleAdd,
    handleFilter,
    loading: query.isLoading,
    dataSource: query.data,
    columns,
    openView,
    currentItem: applicationDocumentQuery.data?.data,
    handleCloseView,
  };
};

export default useA231Documents;
