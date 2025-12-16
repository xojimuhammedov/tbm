import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "dgz-ui/button";
import { Form, MyInput } from "dgz-ui-shared/components/form";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/shared/hooks/useToast.ts";
import usePostQuery from "@/shared/hooks/query/usePostQuery.ts";
import KEYS from "@/shared/constants/keys.ts";
import URLS from "@/shared/constants/urls.ts";
import { get } from "lodash";

const RHDApplication = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<any>({
    defaultValues: {
      requestNumber: "",
      actionType: ["create", "update"],
      sender: "",
      recipient: "",
      leader: "",
    },
  });

  const { mutate } = usePostQuery({
    listKeyId: KEYS.RH_D_Application,
  });

  const onSubmit = (data: any) => {
    mutate(
      {
        url: URLS.RH_D_Application,
        attributes: data,
      },
      {
        onSuccess: () => {
          form.reset();
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`Application created successfully`),
          });
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: t(`${get(error, "response.statusText", "Error")}`),
            description: t(
              `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
            ),
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-4xl mx-auto p-8 bg-white font-serif text-black">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">RH 45-252:2013</h1>
            <p className="text-lg mt-4">D илова</p>
            <p className="text-sm">(мажбурий)</p>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-xl font-bold underline">
              Алоқаларни блокировкалаш/блокдан чиқариш учун талабнома шакли
            </h2>
            <p className="text-sm mt-2">ИД/7-шакл</p>
          </div>

          <div className="text-center mb-8">
            <p className="font-bold">
              O'ZBEKISTON RESPUBLIKASI ALOQA, AXBOROTLASHTIRISH VA
              TELEKOMMUNIKATSIYA TEXNOLOGIYALARI DAVLAT QO'MITASI
            </p>
            <p className="font-bold text-lg mt-4">
              «O'ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI BOSHQA RISH
              RESPUBLIKA MARKAZI» DAVLAT UNITAR KORXONASI
            </p>
          </div>

          <div className="text-center border-t-2 border-b-2 border-black py-2 mb-8">
            <p>
              O'zbekiston Respublikasi, Toshkent sh., 100000, Olov ko'chasi 23
            </p>
            <p>☎: +998 71 233-36-63  ☎: +998 71 233-72-78</p>
            <p>E-mail: tmc@rtmc.uz</p>
          </div>

          <div className="text-center font-bold text-xl mb-8">ТАЛАБНОМА</div>

          <div className="space-y-8 text-lg">
            <div className="flex justify-between">
              <div className="flex items-end">
                <span>SANA:</span>
                <MyInput
                  control={form.control}
                  placeholder={t("")}
                  name={"requestNumber"}
                  className="border border-t-0 border-l-0 border-r-0 rounded-none"
                />
              </div>
              <div className="flex items-end">
                <span>№</span>
                <MyInput
                  control={form.control}
                  placeholder={t("")}
                  name={"recipient"}
                  className="border border-t-0 border-l-0 border-r-0 rounded-none"
                />
              </div>
            </div>

            <div className="flex items-end">
              <span>Kimga:</span>
              <MyInput
                control={form.control}
                placeholder={t("")}
                name={"sender"}
                className="border border-t-0 border-l-0 border-r-0 rounded-none"
              />
            </div>

            <div className="flex items-end">
              <span>Kimdan:</span>
              <MyInput
                control={form.control}
                placeholder={t("")}
                name={"leader"}
                className="border border-t-0 border-l-0 border-r-0 rounded-none"
              />
            </div>
          </div>

          <div className="mt-16 text-sm text-gray-600 text-center">
            Ushbu shaklni chop etib, to'ldirib foydalanishingiz mumkin.
          </div>
        </div>
        <FormContainerFooter>
          <Button size={"sm"} variant={"ghost"} type={"button"}>
            <ArrowLeftIcon />
            {t("Back")}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default RHDApplication;
