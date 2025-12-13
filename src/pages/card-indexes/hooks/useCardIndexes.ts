import useLists from "@/shared/hooks/useLists.ts";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useDelete from "@/shared/hooks/api/useDelete.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import { CARD_INDEXES_QUERY_KEY } from "@/pages/card-indexes/constants/card-indexes.constants.ts";
import { CardIndexInterface } from "@/pages/card-indexes/interfaces/card-index.interface.ts";
import createCardIndexColumns from "@/pages/card-indexes/helpers/createCardIndexColumns.tsx";
import { useNavigate } from "react-router-dom";

const useCardIndexes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { removeWithConfirm } = useDelete([CARD_INDEXES_QUERY_KEY]);
  const { toast } = useToast();
  const { query, handleFilter, params } = useLists<CardIndexInterface>({
    url: [CARD_INDEXES_QUERY_KEY],
  });

  const handleDelete = useCallback(
    (id: CardIndexInterface["_id"]) => {
      removeWithConfirm(id)
        .then(() => {
          query.refetch();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`Card index removed successfully`),
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
    [removeWithConfirm, t, toast, query],
  );

  const handleAdd = useCallback(() => {
    navigate("/card-indexes/create");
  }, [navigate]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/card-indexes/edit/${id}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () => createCardIndexColumns(t, handleDelete, handleEdit),
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

export default useCardIndexes;
