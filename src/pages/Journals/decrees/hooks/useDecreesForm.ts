import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import {createDecreesSchema, DecreesDto} from "@/pages/Journals/decrees/schemas/createDecreesSchema.ts";
import {DecreesInterface} from "@/pages/Journals/decrees/interfaces/decrees.interface.ts";
import {DECREES_QUERY_KEY} from "@/pages/Journals/decrees/constants/decrees.constants.ts";

export type DecreesFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useDecreesForm = ({ id, onSave }: DecreesFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createDecreesSchema(t), [t]);

  const form = useForm<DecreesDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      registration_date: "",
      summary: "",
      prepared_by: "",
      signed_by: "",
    },
  });

  const query = useGetOne<{ data: DecreesInterface }>({
    url: id ? [DECREES_QUERY_KEY, id] : [DECREES_QUERY_KEY],
    options: {
      enabled: Boolean(id),
    },
  });

  const { query: save } = useMutate({
    url: id ? [DECREES_QUERY_KEY, id] : [DECREES_QUERY_KEY],
    method: id ? MutateRequestMethod.PATCH  : MutateRequestMethod.POST,
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
              ? t("Order updated successfully")
              : t("Order created successfully"),
        });
      },
    },
  });
  const formatDateForInput = (dateString?: string | null): string => {
    if (!dateString) return "";
    const match = dateString.match(/^(\d{2})[.\-/](\d{2})[.\-/](\d{4})$/);
    if (match) {
      const [, day, month, year] = match;
      return `${year}-${month}-${day}`;
    }
    if (dateString.includes("T")) return dateString.split("T")[0];
    return dateString;
  };

  const formatDateForServer = (dateString: string): string => {
    if (!dateString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}.${year}`;
    }
    return dateString;
  };

  useEffect(() => {
    const item = query.data?.data;
    if (item) {
      form.reset({
        registration_date: formatDateForInput(item.registration_date),
        summary: item.summary ?? "",
        prepared_by: item.prepared_by ?? "",
        signed_by: item.signed_by ?? "",
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
      (data: DecreesDto) => {
        save.mutate({
          ...data,
          registration_date: formatDateForServer(data.registration_date),
        });
      },
      [save],
  );

  return {
    form,
    onSubmit,
    isLoading: query.isLoading || save.isPending,
  };
};

export default useDecreesForm;