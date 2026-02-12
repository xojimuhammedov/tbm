import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import {ORDERS_QUERY_KEY} from "@/pages/Journals/orders/constants/external-inbound.constants.ts";
import {OrdersInterface} from "@/pages/Journals/orders/interfaces/orders.interface.ts";

const useOrder = (id: string) => {
  const query = useGetOne<{ data: OrdersInterface }>({
    url: [ORDERS_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useOrder;
