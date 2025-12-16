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
  createFApplicationSchema,
  FApplicationDto,
} from "../schemas/createFApplicationSchema";
import { FApplicationInterface } from "../interfaces/f-252.interface";

export type RequestFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useFApplicationForm = ({ id, onSave }: RequestFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const schema = useMemo(() => createFApplicationSchema(t), [t]);

  const form = useForm<FApplicationDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      actionType: [],
    },
  });

  const query = useGetOne<{ data: FApplicationInterface }>({
    url: [URLS.RH_F_Application, id || ""],
    options: { enabled: Boolean(id) },
  });

  const { query: save } = useMutate({
    url: [URLS.RH_F_Application, id || ""],
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
        requestNumber: item.requestNumber,
        sender: item.sender,
        recipient: item.recipient,
        leader: item.leader,
        actionType: item.actionType,
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: FApplicationDto) => {
      save.mutate(data);
    },
    [save],
  );

  return { form, onSubmit, isLoading: query.isLoading || save.isPending };
};

export default useFApplicationForm;
