import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { FLOWS_5_1_QUERY_KEY } from "@/pages/flows-5_1/constants/flows.constants.ts";
import {
  createFlowSchema,
  FlowDto,
} from "@/pages/flows-5_1/schemas/createFlowSchema.ts";
import { FlowInterface } from "@/pages/flows-5_1/interfaces/flow.interface.ts";

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
    // Default values bo'sh obyekt bo'lsa, nested qiymatlarda xatolik bermaydi
    defaultValues: {
      flow_id: {
        code: ""
      }
    }
  });

  const query = useGetOne<{ data: FlowInterface }>({
    url: [FLOWS_5_1_QUERY_KEY, id || ""],
    options: { enabled: Boolean(id) },
  });

  const { query: save } = useMutate({
    url: [FLOWS_5_1_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(`${get(error, "response.statusText", "Error")}`),
          description: t(
              `${get(error, "response.data.message", "An error occurred")}`,
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
        flow_id: {
          code: item.flow_id?.code || "",
          signal_level: item.flow_id?.signal_level || "",
          _id: item.flow_id?._id
        },
        column1: item.column1,
        outs_id: item.outs_id,
        international: item.international,
        forward: item.forward,
        reverse: item.reverse,
        start: item.start,
        port_a: item.port_a,
        mux_a: item.mux_a,
        pa: item.pa,
        final_ms_name: item.final_ms_name,
        signal_transmission_level: item.signal_transmission_level,
        au4: item.au4,
        ts: item.ts,
        pb: item.pb,
        transit: item.transit,
        mux_b: item.mux_b,
        port_b: item.port_b,
        end: item.end,
        consumer: item.consumer,
        order_number: item.order_number,
        interest_level: item.interest_level,
        mt: item.mt,
        speed: item.speed,
        protection_mode: item.protection_mode,
        sp: item.sp,
        additional_information: item.additional_information,
        payment_status: item.payment_status,
        e1_name_in_vs: item.e1_name_in_vs,
        ms_name_in_vs: item.ms_name_in_vs,
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
      (data: FlowDto) => {
        save.mutate(data);
      },
      [save],
  );

  return { form, onSubmit, isLoading: query.isLoading };
};

export default useFlowForm;