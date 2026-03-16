import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { POSITION_QUERY_KEY } from "@/pages/position/constants/position.constants.ts";
import {
  createPositionSchema,
  PositionDto,
} from "@/pages/position/schemas/createPositionSchema.ts";
import { PositionInterface } from "@/pages/position/interfaces/position.interface.ts";

export type FormProps = {
  id: string | null;
  onSave?: () => void;
};

const usePositionForm = ({ id, onSave }: FormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createPositionSchema(t), [t]);
  const form = useForm<PositionDto>({
    resolver: zodResolver(schema),
  });

  const query = useGetOne<PositionInterface>({
    url: [POSITION_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  const { query: save } = useMutate({
    url: [POSITION_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PATCH : MutateRequestMethod.POST,
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
            ? t(`Successfully updated`)
            : t(`Successfully created`),
        });
      },
    },
  });

  useEffect(() => {
    const item = query.data;
    if (item) {
      form.reset({
        name: item.name,
        description: item.description || "",
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: PositionDto) => {
      save.mutate(data);
    },
    [save],
  );

  return {
    form,
    onSubmit,
  };
};

export default usePositionForm;
