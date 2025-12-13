import { useCallback, useMemo, useState } from "react";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { useTranslation } from "react-i18next";
import useLists from "@/shared/hooks/useLists.ts";
import createInboxColumns from "@/pages/inbox/helpers/createInboxColumns.tsx";
import { INBOX_QUERY_KEY } from "@/pages/inbox/constants/television.constants.ts";
import { InboxInterface } from "@/pages/inbox/interfaces/inbox.interface.ts";
import useInbox from "@/pages/inbox/hooks/useInbox.ts";

const useInboxes = () => {
  const { t } = useTranslation();
  const [openView, setOpenView] = useState(false);
  const [viewId, setViewId] = useState<InboxInterface["_id"] | null>(null);
  const { query, handleFilter, params } = useLists<InboxInterface>({
    url: [INBOX_QUERY_KEY],
    defaultParams: {
      inbox: true,
    },
  });

  const { inboxQuery } = useInbox(viewId as string);

  const handleView = useCallback((docId: string) => {
    setViewId(docId);
    setOpenView(true);
  }, []);

  const handleAccept = useCallback((docId: string) => {
    console.log(docId);
  }, []);

  const handleReject = useCallback((docId: string) => {
    console.log(docId);
  }, []);

  const handleCloseView = useCallback((open: boolean) => {
    setOpenView(open);
    if (!open) setViewId(null);
  }, []);

  const columns: ColumnType<InboxInterface>[] = useMemo(
    () =>
      createInboxColumns(
        t as unknown as (...args: TranslationArgsType) => string,
        handleView,
      ),
    [handleView, t],
  );

  return {
    params,
    handleFilter,
    loading: query.isLoading,
    dataSource: query.data,
    columns,
    openView,
    currentItem: inboxQuery.data?.data,
    handleCloseView,
    handleAccept,
    handleReject,
  };
};

export default useInboxes;
