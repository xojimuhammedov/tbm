import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import { ApplicationDocumentInterface } from "@/pages/rtsi/application/interfaces/applicationDocument.interface.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { APPLICATION_QUERY_KEY } from "@/pages/rtsi/application/constants/application.constants.ts";
import { useNavigate } from "react-router-dom";
import createApplicationColumns from "@/pages/rtsi/application/helpers/createApplicationColumns.tsx";
import useApplicationDocument from "@/pages/rtsi/application/hooks/useApplicationDocument.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { get } from "lodash";

const useApplicationDocuments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<
    ApplicationDocumentInterface["_id"] | null
  >(null);
  const { removeWithConfirm } = useDelete([APPLICATION_QUERY_KEY]);
  const { query, handleFilter, params } =
    useLists<ApplicationDocumentInterface>({
      url: [APPLICATION_QUERY_KEY],
    });

  const { applicationDocumentQuery } = useApplicationDocument(viewId as string);

  const handleAdd = useCallback(() => {
    navigate("/gras/a-231/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (docId: string) => {
      navigate(`/gras/a-231/edit/${docId}`);
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
    (id: ApplicationDocumentInterface["_id"]) => {
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

  const columns: ColumnType<ApplicationDocumentInterface>[] = useMemo(
    () =>
      createApplicationColumns(
        t as unknown as (...args: TranslationArgsType) => string,
        handleEdit,
        handleDelete,
        handleView,
        [APPLICATION_QUERY_KEY],
        () => {
          query.refetch();
        },
      ),
    [handleDelete, handleEdit, handleView, query, t],
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

export default useApplicationDocuments;
