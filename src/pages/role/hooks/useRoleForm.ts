import { useCallback, useEffect, useMemo } from "react";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "lodash";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { ROLE_QUERY_KEY } from "@/pages/role/constants/role.constants.ts";
import {
  createRoleSchema,
  RoleDto,
} from "@/pages/role/schemas/createRoleSchema.ts";
import { RoleInterface } from "@/pages/role/interfaces/role.interface.ts";

export type FormProps = {
  id: string | null;
  onSave?: () => void;
};

const useRoleForm = ({ id, onSave }: FormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const schema = useMemo(() => createRoleSchema(t), [t]);
  const form = useForm<RoleDto>({
    resolver: zodResolver(schema),
  });

  const query = useGetOne<RoleInterface>({
    url: [ROLE_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  const { query: save } = useMutate({
    url: [ROLE_QUERY_KEY, id || ""],
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
            ? t(`Staff updated successfully`)
            : t(`Staff created successfully`),
        });
      },
    },
  });

  useEffect(() => {
    const item = query.data;
    if (item) {
      form.reset({
        name: item.name,
        permissions: item.permissions,
      });
    }
  }, [query.data, form]);

  const onSubmit = useCallback(
    (data: RoleDto) => {
      save.mutate(data);
    },
    [save],
  );

  return {
    form,
    onSubmit,
  };
};

export default useRoleForm;
