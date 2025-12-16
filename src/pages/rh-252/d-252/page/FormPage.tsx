import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "dgz-ui/button";
import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { FormContainerFooter } from "@/shared/components/templates/form";

import useDApplicationForm from "../hooks/useDApplicationForm.ts";

const RHDApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { form, onSubmit, isLoading } = useDApplicationForm({
    id: id || null,
    onSave: () => {
      navigate(-1);
    },
  });

  const actionOptions = [
    { value: "create", label: "Create" },
    { value: "update", label: "Update" },
    { value: "delete", label: "Delete" },
    { value: "read", label: "Read" },
  ];
  const underlineInputStyle =
    "border-0 border-b border-gray-400 dark:border-gray-600 rounded-none focus:ring-0 px-0 shadow-none bg-transparent text-[#202020] dark:text-white placeholder:text-gray-400 focus:border-[#202020] dark:focus:border-white transition-colors";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col font-inter bg-gray-50 dark:bg-black/10"
      >
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div
            className="max-w-4xl mx-auto p-12 shadow-lg min-h-[800px] transition-colors duration-200
                                    bg-white dark:bg-[#202020]
                                    text-[#202020] dark:text-white
                                    border border-transparent dark:border-gray-700"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">RH 45-252:2013</h1>
              <p className="text-lg mt-2 font-medium">D илова</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                (мажбурий)
              </p>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-xl font-bold underline uppercase tracking-wide">
                Алоқаларни блокировкалаш/блокдан чиқариш учун талабнома шакли
              </h2>
              <p className="text-sm mt-2 font-medium text-gray-600 dark:text-gray-400">
                ИД/7-шакл
              </p>
            </div>

            <div className="text-center mb-8 space-y-2">
              <p className="font-bold uppercase text-sm leading-relaxed">
                O'ZBEKISTON RESPUBLIKASI ALOQA, AXBOROTLASHTIRISH VA
                TELEKOMMUNIKATSIYA TEXNOLOGIYALARI DAVLAT QO'MITASI
              </p>
              <p className="font-bold text-lg mt-4">
                «O'ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI BOSHQARISH
                RESPUBLIKA MARKAZI» DAVLAT UNITAR KORXONASI
              </p>
            </div>
            <div
              className="text-center border-t-2 border-b-2 py-4 mb-12 text-sm space-y-1
                                        border-[#202020] dark:border-gray-500"
            >
              <p>
                O'zbekiston Respublikasi, Toshkent sh., 100000, Olov ko'chasi 23
              </p>
              {/* eslint-disable-next-line no-irregular-whitespace */}
              <p>☎: +998 71 233-36-63  ☎: +998 71 233-72-78</p>
              <p>E-mail: tmc@rtmc.uz</p>
            </div>

            <div className="text-center font-bold text-2xl mb-12 tracking-wider">
              ТАЛАБНОМА
            </div>
            <div className="space-y-10 text-lg px-2 md:px-8">
              <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="flex gap-4 items-end w-full md:w-1/2">
                  <span className="font-bold whitespace-nowrap">SANA:</span>
                  <div className="w-full border-b border-gray-400 dark:border-gray-600 pb-1 text-center font-medium">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-4 items-end w-full md:w-1/2">
                  <span className="font-bold whitespace-nowrap">№</span>
                  <div className="w-full">
                    <MyInput
                      control={form.control}
                      name="requestNumber"
                      placeholder="001"
                      className={`${underlineInputStyle} text-center font-bold`}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <span className="font-bold whitespace-nowrap w-24">Kimga:</span>
                <div className="w-full">
                  <MyInput
                    control={form.control}
                    name="recipient"
                    placeholder="Qabul qiluvchi tashkilot yoki shaxs"
                    className={underlineInputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-end">
                <span className="font-bold whitespace-nowrap w-24">
                  Kimdan:
                </span>
                <div className="w-full">
                  <MyInput
                    control={form.control}
                    name="sender"
                    placeholder="Yuboruvchi tashkilot yoki shaxs"
                    className={underlineInputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <span className="font-bold whitespace-nowrap w-24">
                  Rahbar:
                </span>
                <div className="w-full">
                  <MyInput
                    control={form.control}
                    name="leader"
                    placeholder="Rahbar F.I.Sh"
                    className={underlineInputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center pt-4">
                <span className="font-bold whitespace-nowrap w-32 self-start md:self-center">
                  Harakat turi:
                </span>
                <div className="w-full">
                  <MySelect
                    control={form.control}
                    name="actionType"
                    placeholder="Tanlang..."
                    options={actionOptions}
                    isDisabled={isLoading}
                    isMulti={true}
                    className="react-select-container"
                  />
                </div>
              </div>
            </div>

            <div className="mt-24 text-sm text-gray-500 dark:text-gray-400 text-center italic">
              Ushbu shaklni chop etib, to'ldirib foydalanishingiz mumkin.
            </div>
          </div>
        </div>
        <FormContainerFooter
          className="border-t py-4 px-8 sticky bottom-0 z-10 transition-colors
                                                bg-white dark:bg-[#202020]
                                                border-gray-200 dark:border-gray-800"
        >
          <div className="flex justify-between w-full max-w-4xl mx-auto">
            <Button
              size="sm"
              variant="ghost"
              type="button"
              onClick={() => navigate(-1)}
              disabled={isLoading}
              className="flex items-center gap-2 font-medium text-[#202020] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              {t("Back")}
            </Button>

            {/*<Button*/}
            {/*    size="sm"*/}
            {/*    type="submit"*/}
            {/*    disabled={isLoading}*/}
            {/*    className="flex items-center gap-2 font-medium text-white*/}
            {/*               bg-[#202020] hover:bg-black*/}
            {/*               dark:bg-blue-700 dark:hover:bg-blue-600"*/}
            {/*>*/}
            {/*    <Save className="h-4 w-4" />*/}
            {/*    {t("Save")}*/}
            {/*</Button>*/}
          </div>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default RHDApplication;
