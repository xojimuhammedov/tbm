import useLogin from "../hooks/useLogin.tsx";
import { useTranslation } from "react-i18next";
import { LoginDto } from "@/layouts/auth/schemas";
import { Card, CardContent } from "dgz-ui/card";
import { Spin } from "@/shared/components/atoms/loading";
import { Button } from "dgz-ui/button";
import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useState } from "react";
import { KeyRoundIcon, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "dgz-ui/dropdown";

const Login = () => {
  const [loginForm, setLoginForm] = useState("login");
  const { form, onSubmit, loading, keys, pkcs7, handleSignKey } = useLogin();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  function CertDropdown() {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={loading || keys.length === 0}
            className={`w-full flex justify-between items-center gap-3 px-4 py-3.5 rounded-xl border text-sm transition-all text-left ${pkcs7 ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"} disabled:opacity-50`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0`}
              >
                <KeyRoundIcon
                  className={`size-4 ${pkcs7 ? "text-emerald-500" : "text-slate-500"}`}
                />
              </div>
              {keys.length === 0 && pkcs7 === null ? (
                <span className="text-slate-400">Kalitlar topilmadi</span>
              ) : (
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-ellipsis overflow-hidden whitespace-nowrap text-sm">
                    {pkcs7 ? "Kalit tanlandi" : "Tanlang"}
                  </p>
                </div>
              )}
            </div>
            <ChevronDownIcon className="size-4 text-slate-400 shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[300px] sm:w-[355px] max-h-64 overflow-y-auto p-2"
          align="center"
          sideOffset={4}
        >
          {keys.map((cert) => (
            <DropdownMenuItem
              key={cert.serialNumber}
              onClick={() => {
                handleSignKey(cert);
                setOpen(false);
              }}
              className="px-3 py-3 rounded-xl cursor-pointer hover:bg-slate-50"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {cert.CN}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Serial Number: {cert.serialNumber}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Card className="overflow-hidden shadow-lg bg-white w-[440px] text-gray-900">
      <CardContent className="grid p-0">
        <div className={"space-y-4 p-5 md:p-10"}>
          <div
            className={"flex flex-col items-center justify-center gap-2 mb-2"}
          >
            <img src="/images/logo.png" alt="Logo" />
            <h3 className="text-xl font-bold text-center">{t("Login")}</h3>
          </div>
          <p className={"text-gray-600 text-body-sm-regular mb-10 text-center"}>
            {t(
              "Make sure you have entered your email and password and click the login button",
            )}
          </p>
          <div className="flex w-full p-1.5 mb-6 bg-slate-100 rounded-xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setLoginForm("login")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${loginForm === "login" ? "bg-white text-blue-500 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
            >
              {t("Login")}
            </button>
            <button
              type="button"
              onClick={() => setLoginForm("cert")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${loginForm === "cert" ? "bg-white text-blue-500 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
            >
              E-Imzo
            </button>
          </div>
          {loginForm === "login" ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={"space-y-8"}
              >
                <MyInput<LoginDto>
                  className={"dark:border-gray-300"}
                  required
                  floatingError
                  label={t("Email")}
                  placeholder={t("Enter your Email")}
                  control={form.control}
                  name={"email"}
                />
                <MyInput<LoginDto>
                  className={"dark:border-gray-300"}
                  required
                  floatingError
                  control={form.control}
                  label={t("Password")}
                  placeholder={t("Enter your Password")}
                  type={"password"}
                  name={"password"}
                />
                <Button
                  type="submit"
                  className={"w-full rounded-lg dark:bg-blue-400"}
                >
                  {loading && <Spin />} {t("Login")}
                </Button>
              </form>
            </Form>
          ) : (
            <div
              className={`bg-white rounded-2xl border shadow-sm mb-4 transition-all ${pkcs7 ? "border-emerald-200" : "border-slate-200"}`}
            >
              <div className="p-5 border-b border-slate-100 flex items-center gap-2">
                <KeyRoundIcon className="size-4 text-slate-500" />
                <span className="font-semibold text-slate-700 text-sm">
                  Elektron kalitni tanlang
                </span>
              </div>
              <div className="p-5">
                <CertDropdown />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
