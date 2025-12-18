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
import { DApplicationInterface } from "@/pages/rh-252/d-252/interfaces/d-252.interface.ts";
import {
  createDApplicationSchema,
  DApplicationDto,
} from "@/pages/rh-252/d-252/schemas/createDApplicationSchema.ts";

export type RequestFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useDApplicationForm = ({ id, onSave }: RequestFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const schema = useMemo(() => createDApplicationSchema(t), [t]);

  const form = useForm<DApplicationDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      action_type: [],
    },
  });

  const query = useGetOne<{ data: DApplicationInterface }>({
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
        sender: item.sender,
        recipient: item.recipient,
        leader: item.leader,
        action_type: item.action_type,
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: DApplicationDto) => {
      save.mutate(data);
    },
    [save],
  );

  return { form, onSubmit, isLoading: query.isLoading || save.isPending };
};

export default useDApplicationForm;
