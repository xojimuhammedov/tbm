import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, MyInput } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useFApplicationForm from "@/pages/rh-252/f-252/hooks/useFApplicationForm.ts";

const FApplicationPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSave = useCallback(() => {
    navigate("/rh-252/f-252");
  }, [navigate]);

  const { form, onSubmit, isLoading } = useFApplicationForm({
    id: id || null,
    onSave: handleSave,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 h-full flex flex-col font-inter"
      >
        <div
          className="flex-1 w-full max-w-7xl mx-auto p-6 rounded-lg shadow-sm transition-colors duration-200
                        bg-white dark:bg-[#202020] border border-gray-200 dark:border-gray-700"
        >
          <h1
            className="text-2xl font-bold text-center mb-8 transition-colors
                         text-[#202020] dark:text-white"
          >
            {t("F-252 Shakl bo'yicha ma'lumot")}
          </h1>
          <div className="flex flex-col mb-10 items-center">
            <p
              className="text-center text-sm font-medium mb-2 transition-colors
                          text-gray-500 dark:text-gray-400"
            >
              {t("Hujjat raqamini kiriting")}
            </p>

            <div className="flex items-end gap-3 justify-center">
              <MyInput
                control={form.control}
                placeholder={t("№")}
                name="requestNumber"
                className="border-0 border-b-2 rounded-none w-[160px] text-center text-xl transition-colors
                           border-gray-400 dark:border-gray-600
                           text-[#202020] dark:text-white
                           bg-transparent
                           placeholder:font-normal placeholder:text-gray-400
                           focus:ring-0 focus:border-[#202020] dark:focus:border-white"
              />
              <span
                className="text-lg font-bold uppercase tracking-wide transition-colors
                               text-[#202020] dark:text-gray-300"
              >
                {t("sonli SO'ROVNOMA")}
              </span>
            </div>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-xl border transition-colors
                          border-gray-200 dark:border-gray-700"
          >
            <div
              className="col-span-1 md:col-span-2 border-b pb-4 mb-2
                            border-gray-200 dark:border-gray-700"
            >
              <h3
                className="text-lg font-bold transition-colors
                             text-[#202020] dark:text-gray-100"
              >
                {t("Asosiy ma'lumotlar")}
              </h3>
            </div>

            <div className="space-y-1">
              <MyInput
                control={form.control}
                name="sender"
                label={t("Jo'natuvchi")}
                placeholder={t("Bo'lim yoki shaxs nomini kiriting")}
                className="w-full font-normal transition-colors
                           text-[#202020] dark:text-white
                           bg-gray-50 dark:bg-[#202020]
                           border-gray-300 dark:border-gray-600
                           focus:border-[#202020] dark:focus:border-gray-400"
              />
            </div>

            <div className="space-y-1">
              <MyInput
                control={form.control}
                name="recipient"
                label={t("Qabul qiluvchi")}
                placeholder={t("Bo'lim nomini kiriting")}
                className="w-full font-normal transition-colors
                           text-[#202020] dark:text-white
                           bg-gray-50 dark:bg-[#202020]
                           border-gray-300 dark:border-gray-600
                           focus:border-[#202020] dark:focus:border-gray-400"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <MyInput
                control={form.control}
                name="leader"
                label={t("Tasdiqlovchi Rahbar")}
                placeholder={t("F.I.Sh")}
                className="w-full font-normal transition-colors
                           text-[#202020] dark:text-white
                           bg-gray-50 dark:bg-[#202020]
                           border-gray-300 dark:border-gray-600
                           focus:border-[#202020] dark:focus:border-gray-400"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              {/* Custom Label: Weight 700 (Bold) */}
              <label
                className="text-sm font-bold leading-none mb-3 block
                                  text-[#202020] dark:text-gray-300"
              >
                {t("Harakat turlari")}
              </label>

              <div
                className="flex flex-col gap-2 p-5 border rounded-lg transition-colors
                                bg-gray-50 dark:bg-[#202020]
                                border-gray-200 dark:border-gray-700"
              >
                <MyInput
                  control={form.control}
                  name="actionType.0"
                  placeholder={t(
                    "Harakat turini yozing (masalan: Yangi ulash)",
                  )}
                  className="w-full font-normal
                                   bg-white dark:bg-[#202020]
                                   text-[#202020] dark:text-white
                                   border-gray-300 dark:border-gray-600"
                />
                <p
                  className="text-xs font-medium mt-1
                                   text-gray-500 dark:text-gray-500"
                >
                  * {t("Hozircha bitta harakat turi kiritish imkoniyati")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <FormContainerFooter
          className="mt-6 border-t pt-4 sticky bottom-0 transition-colors
                                        bg-white dark:bg-[#202020]
                                        border-gray-200 dark:border-gray-800"
        >
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
            disabled={isLoading}
            className="flex items-center gap-2 font-medium transition-colors
                       text-[#202020] hover:bg-gray-100
                       dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ArrowLeftIcon size={18} />
            {t("Orqaga")}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default FApplicationPage;
