import { ConfirmPasswordDto } from "@/shared/schemas/createConfirmPasswordSchema.ts";
import { useCallback } from "react";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import useLogin from "@/layouts/auth/hooks/useLogin.tsx";
import { v4 as uuidv4 } from "uuid";
import usePasswordConfirmTokenStore from "@/shared/store/usePasswordConfirmTokenStore.ts";
import { useConfirm } from "dgz-ui-shared/hooks";

const usePasswordCheck = () => {
  const { logout } = useLogin();
  const { setPasswordToken } = usePasswordConfirmTokenStore();
  const { confirmPassword } = useConfirm();

  const { query } = useMutate({
    url: ["user", "passcheck"],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: () => {
        setPasswordToken(uuidv4());
      },
      onError: (_error) => {
        console.log(_error);
        logout();
      },
    },
  });

  const onSubmit = useCallback(
    (data: ConfirmPasswordDto) => {
      query.mutate(data);
    },
    [query],
  );

  const passwordCheck = useCallback(() => {
    return new Promise((resolve, reject) => {
      confirmPassword({
        onSubmit: (data) => {
          query.mutateAsync(data).then(resolve).catch(reject);
        },
      });
    });
  }, [confirmPassword, query]);

  return { onSubmit, passwordCheck };
};

export default usePasswordCheck;
