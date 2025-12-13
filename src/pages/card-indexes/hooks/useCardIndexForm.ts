import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { CARD_INDEXES_QUERY_KEY } from "@/pages/card-indexes/constants/card-indexes.constants.ts";
import {
  createCardIndexSchema,
  CardIndexDto,
} from "@/pages/card-indexes/schemas/createCardIndexSchema.ts";
import { CardIndexInterface } from "@/pages/card-indexes/interfaces/card-index.interface.ts";

export type CardIndexFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useCardIndexForm = ({ id, onSave }: CardIndexFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createCardIndexSchema(t), [t]);
  const form = useForm<CardIndexDto>({
    resolver: zodResolver(schema),
  });

  const query = useGetOne<{ data: CardIndexInterface }>({
    url: [CARD_INDEXES_QUERY_KEY, id || ""],
    options: { enabled: Boolean(id) },
  });

  const { query: save } = useMutate({
    url: [CARD_INDEXES_QUERY_KEY, id || ""],
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
            ? t(`Card index updated successfully`)
            : t(`Card index created successfully`),
        });
      },
    },
  });

  useEffect(() => {
    const item = query.data?.data;
    if (item) {
      form.reset({
        code: item.code,
        verification: item.verification,
        consumer: item.consumer,
        zone2: item.zone2,
        track: item.track,
        id: item.id,
        international: item.international,
        start: item.start,
        end: item.end,
        signal_level: item.signal_level,
        order_number_for_stream: item.order_number_for_stream,
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: CardIndexDto) => {
      save.mutate(data);
    },
    [save],
  );

  return { form, onSubmit };
};

export default useCardIndexForm;
