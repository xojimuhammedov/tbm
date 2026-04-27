import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { MAINTENANCE_LOG_QUERY_KEY } from "../constants/maintenance-log.constants";
import {
  createMaintenanceLogSchema,
  MaintenanceLogDto,
} from "../schemas/createMaintenanceLogSchema";
import { MaintenanceLogDocument } from "../interfaces/maintenance-log.interface";

export type MaintenanceLogFormProps = {
  id: string | null;
  onSave?: () => void;
};

const useMaintenanceLogForm = ({ id, onSave }: MaintenanceLogFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createMaintenanceLogSchema(t), [t]);
  const form = useForm<MaintenanceLogDto>({
    resolver: zodResolver(schema),
  });
  const query = useGetOne<{ data: MaintenanceLogDocument }>({
    url: [MAINTENANCE_LOG_QUERY_KEY, id || ""],
    options: { enabled: Boolean(id) },
  });
  const { query: save } = useMutate({
    url: [MAINTENANCE_LOG_QUERY_KEY, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(get(error, "response.statusText", "Error")),
          description: t(get(error, "response.data.message", "Xatolik yuz berdi")),
        });
      },
      onSuccess: () => {
        form.reset();
        onSave?.();
        toast({
          variant: "success",
          title: t("Success"),
          description: id
            ? t("Maintenance log updated successfully")
            : t("Maintenance log created successfully"),
        });
      },
    },
  });
  useEffect(() => {
    const item = query.data?.data;
    if (item) {
      form.reset({
        scheduled_at: item.scheduled_at?.slice(0, 16) || "",
        actual_at: item.actual_at?.slice(0, 16) || "",
        actual_duration: item.actual_duration,
        ko_number: item.ko_number,
        channel_designation: item.channel_designation,
        work_section: item.work_section,
        maintenance_type: item.maintenance_type,
        work_reason: item.work_reason,
        mbb_zone: item.mbb_zone,
        notes: item.notes,
      });
    }
  }, [query.data, form]);
  const onSubmit = useCallback(
    (data: MaintenanceLogDto) => {
      save.mutate(data);
    },
    [save],
  );
  return { form, onSubmit, isLoading: query.isLoading || save.isPending };
};

export default useMaintenanceLogForm;
