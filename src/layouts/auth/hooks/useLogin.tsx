import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useMutate from "@/shared/hooks/api/useMutate.ts";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod.ts";
import { createLoginSchema, LoginDto } from "@/layouts/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import useAuthStore from "@/shared/store/useAuthStore.ts";
import useUserStore from "@/shared/store/useUserStore.ts";
import { useNavigate } from "react-router-dom";
import usePasswordConfirmTokenStore from "@/shared/store/usePasswordConfirmTokenStore.ts";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { UserInterface } from "@/layouts/auth/interfaces/user.interface.ts";
import {
  PROFILE_KEY,
  USER_KEY,
} from "@/layouts/auth/constants/user.constants.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useEImzo } from "use-eimzo";
import useChallenge from "@/shared/hooks/e-imzo/useChallenge";

export type Cert = {
  disk: string;
  path: string;
  name: string;
  alias: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
  CN: string;
  TIN: string;
  UID: string;
  O: string;
  T: string;
  type: string;
};

const useLogin = () => {
  const { t } = useTranslation(["common", "ERROR", "validation"]);
  const { toast } = useToast();
  const getChallenge = useChallenge();
  const { accessToken, setAccessToken, setRefreshToken } = useAuthStore();
  const { listAllKeys, signKey, install } = useEImzo();
  const [keys, setKeys] = useState<Cert[]>([]);
  const [pkcs7, setPkcs7] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setMe } = useUserStore();
  const { setPasswordToken } = usePasswordConfirmTokenStore();
  const queryClient = useQueryClient();

  const schema = useMemo(() => createLoginSchema(t), [t]);
  const form = useForm<LoginDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getMe = useGetOne({
    url: [USER_KEY, PROFILE_KEY],
    options: { enabled: false },
  });

  const handleSuccess = (data: { token: string; refresh_token: string }) => {
    setAccessToken(data?.token || null);
    setRefreshToken(data?.refresh_token || null);
    getMe.refetch();
  };

  const { query: login } = useMutate<{
    token: string;
    refresh_token: string;
    ttl: string;
    user: UserInterface;
  }>({
    url: ["auth", "login"],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(`${get(error, "response.statusText", "Error")}`),
          description: t(
            `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
          ),
        });
      },
    },
  });

  const { query: eImzoLogin } = useMutate<{
    token: string;
    refresh_token: string;
    ttl: string;
    user: UserInterface;
  }>({
    url: ["auth", "eimzo-login"],
    method: MutateRequestMethod.POST,
    options: {
      onSuccess: handleSuccess,
      onError: (error) => {
        toast({
          variant: "destructive",
          title: t(`${get(error, "response.statusText", "Error")}`),
          description: t(
            `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
          ),
        });
      },
    },
  });

  useEffect(() => {
    if (accessToken && getMe.data) {
      setMe(get(getMe.data, "user", null));
    }
  }, [getMe.data, accessToken]);

  const onSubmit = (data: LoginDto) => {
    login.mutate(data);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setMe(null);
    setPasswordToken(null);
    queryClient.removeQueries({ queryKey: [USER_KEY, PROFILE_KEY] });
    navigate("/auth");
  };

  const handleSignKey = async (cert: Cert) => {
    try {
      const challenge = await getChallenge();
      const result = await signKey(cert, challenge);
      setPkcs7(result);
      eImzoLogin.mutate({
        pkcs7: result,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await install();
        const allKeys = await listAllKeys();
        setKeys(allKeys);
      } catch (err) {
        console.error("E-IMZO init xatolik:", err);
      }
    };
    init();
  }, []);

  return {
    form,
    onSubmit,
    logout,
    loading: login.isPending,
    keys,
    pkcs7,
    handleSignKey,
  };
};

export default useLogin;
