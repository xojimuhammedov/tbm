import useLogin from "../hooks/useLogin.tsx";
import { useTranslation } from "react-i18next";
import { LoginDto } from "@/layouts/auth/schemas";
import { Card, CardContent } from "dgz-ui/card";
import { Spin } from "@/shared/components/atoms/loading";
import { Button } from "dgz-ui/button";
import { Form, MyInput } from "dgz-ui-shared/components/form";

const Login = () => {
  const { form, onSubmit, loading } = useLogin();
  const { t } = useTranslation();

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
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
