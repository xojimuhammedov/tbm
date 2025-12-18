import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import URLS from "@/shared/constants/urls";
import {
  createNum3ApplicationSchema,
  Num3ApplicationDto,
} from "@/pages/rh-252/rh-3_3/schemas/createNum3ApplicationSchema.ts";
import { Num3ApplicationInterface } from "../interfaces/Num3.interface";

export type RequestFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useNum3ApplicationForm = ({ id, onSave }: RequestFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const schema = useMemo(() => createNum3ApplicationSchema(t), [t]);

  const form = useForm<Num3ApplicationDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      action_type: [],
    },
  });

  const query = useGetOne<{ data: Num3ApplicationInterface }>({
    url: [URLS.RH_D_Application, id || ""],
    options: { enabled: Boolean(id) },
  });

  const { query: save } = useMutate({
    url: [URLS.RH_D_Application, id || ""],
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
            ? t(`Request updated successfully`)
            : t(`Request created successfully`),
        });
      },
    },
  });

  useEffect(() => {
    const item = query.data?.data;

    if (item) {
      form.reset({
        request_number: item.request_number,
        ubp_input: item.ubp_input,
        ap_input: item.ap_input,
        action_type: item.action_type,
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: Num3ApplicationDto) => {
      save.mutate(data);
    },
    [save],
  );

  return { form, onSubmit, isLoading: query.isLoading || save.isPending };
};

export default useNum3ApplicationForm;
