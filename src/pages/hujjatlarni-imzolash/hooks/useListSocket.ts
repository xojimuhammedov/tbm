import { connectEventsSocket } from "@/lib/socket";
import useGetAllQuery from "@/shared/hooks/query/useGetAllQuery";
import useQueryParams from "@/shared/hooks/useQueryParams.ts";
import { FilterInterface } from "dgz-ui-shared/components/filters";
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
  filters: FilterInterface[];
}

const useListSocket = (onView?: (record: any) => void): UseListSocketReturn => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Pagination va filter parametrlari
  const [params, setParams] = useState<any>({ limit: 10, page: 1 });

  // URL dan sanalarni olamiz
  const { params: queryParams } = useQueryParams({ dateRangeKey: "hujjatlarni-imzolash-list" });

  const handleView = useCallback((record: any) => {
    if (onView) {
      onView(record);
    } else {
      const docId = typeof record?.document_id === "string" ? record.document_id : record?.document_id?._id;
      const allUsers = [...(record?.users || []), ...(record?.signers || [])];
      const me = allUsers.find(u => u.is_current || u.status === 'PENDING');
      const sharedId = record?.shared_id || me?.shared_id;
      navigate(`/rh-252/hujjatlarni-imzolash/${docId}/shared/${sharedId}`);
    }
  }, [navigate, onView]);

  const columns = useMemo(() => createSharedColumns(t, handleView), [t, handleView]);

  const handleFilter = (newParams: any) => {
    setParams((prev: any) => {
      // Yangi parametrlar kelganda sahifani 1 ga tushiramiz (faqat pagination o'zgarmasa)
      const page = newParams.page || 1;
      return { ...prev, ...newParams, page };
    });
  };

  const { data, isLoading, refetch } = useGetAllQuery<any>({
    key: "hujjatlarni-imzolash-list",
    url: "/api/rh-252/share/my-shared",
    params: {
      ...params,
      type: "SIGNING",
      from: queryParams?.from,
      to: queryParams?.to
    },
  });

  useEffect(() => {
    const socket = connectEventsSocket();

    // Dastlab join-shared emmit qilinadi. E'tibor bering, params qabul qilishi mumkin bo'lsa uni yuboramiz.
    socket.emit("join-shared", { ...params, from: queryParams?.from, to: queryParams?.to });

    const handleSharedList = () => {
      // Ma'lumot yangilanganini bilsak rest orqali qayta fetch qilamiz
      refetch();
    };

    socket.on("shared:list", handleSharedList);

    // Component unmount bo'lganda yoki params o'zgarganda tozalaymiz
    return () => {
      socket.off("shared:list", handleSharedList);
      socket.emit("leave-shared", { ...params, from: queryParams?.from, to: queryParams?.to });
    };
  }, [params, refetch, queryParams]);

  const filters = useMemo(
    () => [
      {
        name: "status",
        label: t("Holat"),
        isMulti: false,
        options: [
          { value: "PENDING", label: t("Kutilmoqda") },
          { value: "WAITING", label: t("Jarayonda") },
          { value: "ACCEPTED", label: t("Qabul qilingan") },
          { value: "REJECTED", label: t("Rad etilgan") },
        ],
      },
    ],
    [t],
  );

  const dataSource = useMemo(() => {
    // Agar api pagination ob'yekti qaytarsa (docs bilan)
    if (data?.docs && Array.isArray(data.docs)) {
      return data;
    }
    // Agar { data: { docs } } bo'lsa
    if (data?.data?.docs && Array.isArray(data.data.docs)) {
      return data.data;
    }
    // Agar to'g'ridan to'g'ri array bo'lsa
    if (data?.data && Array.isArray(data.data)) {
      return {
        docs: data.data,
        totalDocs: data.data.length,
        limit: params.limit,
        page: params.page,
        totalPages: Math.ceil(data.data.length / params.limit) || 1,
      };
    }
    return { docs: [], totalDocs: 0 };
  }, [data, params]);

  return {
    dataSource,
    loading: isLoading,
    params,
    handleFilter,
    columns,
    filters,
  };
};

export default useListSocket;