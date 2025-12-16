import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon, Save } from "lucide-react";
import { Button } from "dgz-ui/button";
import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useNum3ApplicationForm from "@/pages/rh-252/rh-3_3/hooks/useNum3ApplicationForm.ts";

const Num3ApplicationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { form, onSubmit, isLoading } = useNum3ApplicationForm({
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
    "border-0 border-b border-gray-400 dark:border-gray-600 rounded-none focus:ring-0 px-0 shadow-none bg-transparent text-[#202020] dark:text-white placeholder:text-gray-400 focus:border-[#202020] dark:focus:border-white transition-colors font-medium";

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
              <h1 className="text-xl font-bold uppercase leading-relaxed">
                «O'ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI BOSHQARISH
                RESPUBLIKA MARKAZI» DAVLAT UNITAR KORXONASI
              </h1>
            </div>

            <div className="text-center mb-10 border-b-2 border-[#202020] dark:border-gray-500 pb-6">
              <h2 className="text-lg font-bold uppercase tracking-wide mb-4">
                Фармойишлари бажарилганлиги тўғрисида маълумот шакли
              </h2>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 italic px-8">
                «ЎзТТБРМ» ДУКнинг алоқалари шакллантириш / тугатиш / қайта
                шакллантириш / блокировкалаш / блокдан чиқариш бўйича
                фармойишларининг бажарилиши тўғрисида
              </p>
            </div>

            <div className="text-center font-bold text-2xl mb-12 tracking-wider uppercase">
              МАЪЛУМОТНОМА
            </div>
            <div className="space-y-10 text-lg px-2 md:px-8">
              <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="flex gap-4 items-end w-full md:w-1/2">
                  <span className="font-bold whitespace-nowrap text-[#202020] dark:text-gray-200">
                    SANA:
                  </span>
                  <div className="w-full border-b border-gray-400 dark:border-gray-600 pb-1 text-center font-medium">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-4 items-end w-full md:w-1/2">
                  <span className="font-bold whitespace-nowrap text-[#202020] dark:text-gray-200">
                    №
                  </span>
                  <div className="w-full">
                    <MyInput
                      control={form.control}
                      name="requestNumber"
                      placeholder="001"
                      className={`${underlineInputStyle} text-center font-bold text-xl`}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <span className="font-bold whitespace-nowrap w-32 text-[#202020] dark:text-gray-200">
                  Кимдан:
                </span>
                <div className="w-full">
                  <MyInput
                    control={form.control}
                    name="sender"
                    placeholder="Маълумот юборувчи бўлим ёки шахс"
                    className={underlineInputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <span className="font-bold whitespace-nowrap w-32 text-[#202020] dark:text-gray-200">
                  Кимга:
                </span>
                <div className="w-full">
                  <MyInput
                    control={form.control}
                    name="recipient"
                    placeholder="Қабул қилувчи"
                    className={underlineInputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <span className="font-bold whitespace-nowrap w-32 text-[#202020] dark:text-gray-200">
                  Раҳбар:
                </span>
                <div className="w-full">
                  <MyInput
                    control={form.control}
                    name="leader"
                    placeholder="Тасдиқловчи раҳбар Ф.И.Ш"
                    className={underlineInputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center pt-4">
                <span className="font-bold whitespace-nowrap w-40 self-start md:self-center text-[#202020] dark:text-gray-200">
                  Ҳаракат тури:
                </span>
                <div className="w-full">
                  <MySelect
                    control={form.control}
                    name="actionType"
                    placeholder="Танланг..."
                    options={actionOptions}
                    isDisabled={isLoading}
                    isMulti={true}
                    className="react-select-container text-left"
                  />
                </div>
              </div>
            </div>
            <div className="mt-24 border-t border-gray-300 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center italic">
                Ушbu ҳужжат электрон тизим орқали шакллантирилди.
              </p>
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

            <Button
              size="sm"
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 font-medium text-white
                                       bg-[#202020] hover:bg-black
                                       dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              <Save className="h-4 w-4" />
              {t("Save")}
            </Button>
          </div>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default Num3ApplicationPage;
