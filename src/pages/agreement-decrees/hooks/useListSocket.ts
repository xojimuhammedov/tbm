import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ColumnType } from "dgz-ui-shared/types";
import { connectEventsSocket } from "@/lib/socket";
import createSharedColumns from "../helpers/createColumnShared";
import { SharedItemInterface } from "../interfaces/shared.interface";

interface UseListSocketReturn {
  dataSource: any;
  loading: boolean;
  params: any;
  handleFilter: (newParams: any) => void;
  columns: ColumnType<SharedItemInterface>[];
}

const useListSocket = (): UseListSocketReturn => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Pagination va filter parametrlari
  const [params, setParams] = useState<any>({ limit: 10, page: 1 });

  const columns = useMemo(() => createSharedColumns(t), [t]);

  const handleFilter = (newParams: any) => {
    setParams((prev: any) => ({ ...prev, ...newParams }));
  };

  useEffect(() => {
    const socket = connectEventsSocket();

    setLoading(true);

    // 1. Dastlab join-shared emmit qilinadi. E'tibor bering, params qabul qilishi mumkin bo'lsa uni yuboramiz.
    socket.emit("join-shared", params || ({} as any));

    const handleSharedList = (response: any) => {
      setData(response);
      setLoading(false); // Data kelganida loadingni o'chiramiz
    };

    // 2. Keyin shared:list eventini eshitishni boshlaymiz
    socket.on("shared:list", handleSharedList);

    // Component unmount bo'lganda yoki params o'zgarganda tozalaymiz
    return () => {
      socket.off("shared:list", handleSharedList);
      socket.emit("leave-shared", params || ({} as any));
    };
  }, [params]);

  const dataSource = useMemo(() => {
    if (Array.isArray(data?.data)) {
      return {
        docs: data?.data,
        totalDocs: data?.data?.length,
        limit: params.limit,
        page: params.page,
        totalPages: Math.ceil(data?.data?.length / params.limit) || 1,
      };
    }
    return data?.data || { docs: [], totalDocs: 0 };
  }, [data, params]);

  return {
    dataSource,
    loading,
    params,
    handleFilter,
    columns,
  };
};

export default useListSocket;
