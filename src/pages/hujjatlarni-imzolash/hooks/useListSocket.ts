import { connectEventsSocket } from "@/lib/socket";
import { ColumnType } from "dgz-ui-shared/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import createSharedColumns from "../helpers/createColumnShared";
import { SharedItemInterface } from "../interfaces/shared.interface";

interface UseListSocketReturn {
  dataSource: any;
  loading: boolean;
  params: any;
  handleFilter: (newParams: any) => void;
  columns: ColumnType<SharedItemInterface>[];
}

const useListSocket = (onView?: (record: any) => void): UseListSocketReturn => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Pagination va filter parametrlari
  const [params, setParams] = useState<any>({ limit: 10, page: 1 });

  const handleView = useCallback((record: any) => {
    if (onView) {
      onView(record);
    } else {
      navigate(`/rh-252/hujjatlarni-imzolash/${record?.document_id?._id}/shared/${record?.shared_id}`);
    }
  }, [navigate, onView]);

  const columns = useMemo(() => createSharedColumns(t, handleView), [t]);

  const handleFilter = (newParams: any) => {
    setParams((prev: any) => ({ ...prev, ...newParams }));
  };

  useEffect(() => {
    const socket = connectEventsSocket();

    setLoading(true);

    // 1. Dastlab join-shared emmit qilinadi. E'tibor bering, params qabul qilishi mumkin bo'lsa uni yuboramiz.
    socket.emit("join-shared", params || ({} as any));

    const handleSharedList = (response: any) => {
      // Filter for type "SIGNING"
      const filteredData = response?.data ? {
        ...response,
        data: response.data.filter((item: SharedItemInterface) => item.type === "SIGNING")
      } : response;
      setData(filteredData);
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