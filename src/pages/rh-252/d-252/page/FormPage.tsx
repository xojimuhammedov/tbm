import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, Save } from "lucide-react";
import { Button } from "dgz-ui/button";
import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useDApplicationForm from "@/pages/rh-252/d-252/hooks/useDApplicationForm.ts";

const RHDApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { form, actionOptions, isLoading, onSubmit } = useDApplicationForm({
    id,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-4xl mx-auto p-8 bg-white text-black shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">RH 45-252:2013</h1>
            <p className="text-lg mt-4">D илова</p>
            <p className="text-sm">(мажбурий)</p>
          </div>

          <div className="text-center mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xl font-bold underline mb-2">
              <span>Алоқаларни</span>
              <div className="w-[300px] text-left no-underline font-normal inline-block">
                <MySelect
                  control={form.control}
                  name="action_type"
                  options={actionOptions}
                  placeholder={t("Tanlang...")}
                  isClearable
                  isMulti
                  required
                />
              </div>
              <span>учун талабнома шакли</span>
            </div>
            <p className="text-sm mt-2">ИД/7-шакл</p>
          </div>

          <div className="text-center mb-8">
            <p className="font-bold">
              O'ZBEKISTON RESPUBLIKASI ALOQA, AXBOROTLASHTIRISH VA
              TELEKOMMUNIKATSIYA TEXNOLOGIYALARI DAVLAT QO'MITASI
            </p>
            <p className="font-bold text-lg mt-4 uppercase">
              «O'ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI BOSHQARISH RESPUBLIKA
              MARKAZI» DAVLAT UNITAR KORXONASI
            </p>
          </div>

          <div className="text-center border-y-2 border-black py-2 mb-8">
            <p>
              O'zbekiston Respublikasi, Toshkent sh., 100000, Olov ko'chasi 23
            </p>
            {/* eslint-disable-next-line no-irregular-whitespace */}
            <p>☎: +998 71 233-36-63  ☎: +998 71 233-72-78</p>
            <p>E-mail: tmc@rtmc.uz</p>
          </div>

          <div className="text-center font-bold text-xl mb-8">ТАЛАБНОМА</div>

          <div className="space-y-8 text-lg">
            <div className="flex justify-between">
              <div className="flex items-end flex-1">
                <span className="whitespace-nowrap">SANA:</span>
                <MyInput
                  control={form.control}
                  name="request_number"
                  className="border-x-0 border-t-0 border-b border-black rounded-none ml-2"
                />
              </div>
              <div className="flex items-end flex-1 justify-end">
                <span>№</span>
                <MyInput
                  control={form.control}
                  name="recipient"
                  className="border-x-0 border-t-0 border-b border-black rounded-none w-[150px] ml-2"
                />
              </div>
            </div>

            <div className="flex items-end">
              <span className="whitespace-nowrap">Kimga:</span>
              <MyInput
                control={form.control}
                name="sender"
                className="border-x-0 border-t-0 border-b border-black rounded-none w-full ml-2"
              />
            </div>

            <div className="flex items-end">
              <span className="whitespace-nowrap">Kimdan:</span>
              <MyInput
                control={form.control}
                name="leader"
                className="border-x-0 border-t-0 border-b border-black rounded-none w-full ml-2"
              />
            </div>
          </div>
        </div>

        <FormContainerFooter>
          <Button disabled={isLoading} type="submit">
            <Save className="mr-2 h-4 w-4" /> {t("Saqlash")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            {t("Back")}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default RHDApplication;
