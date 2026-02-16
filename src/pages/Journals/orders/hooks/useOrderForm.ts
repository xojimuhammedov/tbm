import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import {createOrdersSchema, OrdersDto} from "@/pages/Journals/orders/schemas/createExternalInboundSchema.ts";
import {ORDERS_QUERY_KEY} from "@/pages/Journals/orders/constants/orders.constants.ts";
import {OrdersInterface} from "@/pages/Journals/orders/interfaces/orders.interface.ts";

export type OrdersFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useOrderForm = ({ id, onSave }: OrdersFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createOrdersSchema(t), [t]);
  const form = useForm<OrdersDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: OrdersInterface }>({
    url: [ORDERS_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });
  const { query: save } = useMutate({
    url: [ORDERS_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PATCH : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(get(error, "response.statusText", "Error")),
          description: t(
              get(
                  error,
                  "response.data.message",
                  "An error occurred. Contact the administrator",
              ),
          ),
        });
      },
      onSuccess: () => {
        form.reset();
        onSave?.();
        toast({
          variant: "success",
          title: t("Success"),
          description: id
              ? t("External inbound updated successfully")
              : t("External inbound created successfully"),
        });
      },
    },
  });
  useEffect(() => {
    const item = query.data?.data;
    const formatDate = (dateString?: string | null) => {
      if (!dateString) return "";
      return dateString.split("T")[0];
    };
    if (item) {
      form.reset({
        registration_date: formatDate(item.registration_date),
        summary: item.summary ?? "",
        prepared_by: item.prepared_by ?? "",
        signed_by: item.signed_by ?? "",
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
      (data: OrdersDto) => {
        save.mutate(data);
      },
      [save],
  );
  return {
    form,
    onSubmit,
    isLoading: query.isLoading || save.isPending,
  };
};

export default useOrderForm;
