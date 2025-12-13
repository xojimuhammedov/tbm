import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { FLOWS_ID_QUERY_KEY } from "@/pages/flows-id/constants/flows.constants.ts";
import {
  createFlowSchema,
  FlowDto,
} from "@/pages/flows-id/schemas/createFlowSchema.ts";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface.ts";

export type FlowFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useFlowForm = ({ id, onSave }: FlowFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createFlowSchema(t), [t]);
  const form = useForm<FlowDto>({
    resolver: zodResolver(schema),
  });

  const query = useGetOne<{ data: FlowInterface }>({
    url: [FLOWS_ID_QUERY_KEY, id || ""],
    options: { enabled: Boolean(id) },
  });

  const { query: save } = useMutate({
    url: [FLOWS_ID_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(`${get(error, "response.statusText", "Error")}`),
          description: t(
            `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
          ),
        });
      },
      onSuccess: () => {
        form.reset();
        onSave?.();
        toast({
          variant: "success",
          title: t(`Success`),
          description: id
            ? t(`Flow updated successfully`)
            : t(`Flow created successfully`),
        });
      },
    },
  });

  useEffect(() => {
    const item = query.data?.data;
    if (item) {
      form.reset({
        consumer_id_point_a: item.consumer_id_point_a,
        id_number: item.id_number,
        consumer_name_point_b: item.consumer_name_point_b,
        point_a: item.point_a,
        point_b: item.point_b,
        signal_level: item.signal_level,
        organization_order_number: item.organization_order_number,
        deciphering_order_number: item.deciphering_order_number,
        note: item.note,
        deciphering_archive: item.deciphering_archive,
        organization_archive: item.organization_archive,
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: FlowDto) => {
      save.mutate(data);
    },
    [save],
  );

  return { form, onSubmit };
};

export default useFlowForm;
