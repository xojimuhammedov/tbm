import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon, SaveIcon } from "lucide-react";

// UI Components
import { Button } from "dgz-ui/button";
import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { FormContainerFooter } from "@/shared/components/templates/form"; // Footer komponenti

// Hook (Biz oldin yaratgan mantiqiy hook)
import useDApplicationForm from "../hooks/useDApplicationForm.ts";

const RHDApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Barcha mantiq (Get, Post, Put, Validation) shu hook ichida
  const { form, onSubmit, isLoading } = useDApplicationForm({
    id: id || null,
    onSave: () => {
      navigate(-1);
    },
  });

  // Select uchun options
  const actionOptions = [
    { value: "create", label: "Create" },
    { value: "update", label: "Update" },
    { value: "delete", label: "Delete" },
    { value: "read", label: "Read" },
  ];

  // Inputlar uchun maxsus stil (ostki chiziq)
  const underlineInputStyle =
    "border border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0 shadow-none border-black/50 bg-transparent";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-screen bg-gray-50 py-8"
      >
        {/* --- HUJJAT SHAKLI (OQ QOG'OZ) --- */}
        <div className="max-w-4xl mx-auto p-12 bg-white shadow-lg min-h-[800px]">
          {/* 1. Header qismi */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">RH 45-252:2013</h1>
            <p className="text-lg mt-2">D илова</p>
            <p className="text-sm text-gray-500">(мажбурий)</p>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-xl font-bold underline uppercase">
              Алоқаларни блокировкалаш/блокдан чиқариш uchun талабнома шакли
            </h2>
            <p className="text-sm mt-2 font-medium">ИД/7-шакл</p>
          </div>

          <div className="text-center mb-8 space-y-2">
            <p className="font-bold uppercase text-sm">
              O'ZBEKISTON RESPUBLIKASI ALOQA, AXBOROTLASHTIRISH VA
              TELEKOMMUNIKATSIYA TEXNOLOGIYALARI DAVLAT QO'MITASI
            </p>
            <p className="font-bold text-lg">
              «O'ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI BOSHQARISH RESPUBLIKA
              MARKAZI» DAVLAT UNITAR KORXONASI
            </p>
          </div>

          <div className="text-center border-t-2 border-b-2 border-black py-4 mb-12 text-sm space-y-1">
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

          {/* 2. Inputlar qismi */}
          <div className="space-y-8 text-lg px-8">
            {/* Sana va Raqam */}
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="flex gap-4 items-end w-full md:w-1/2">
                <span className="font-bold whitespace-nowrap">SANA:</span>
                {/* Hozircha "created_at" avtomatik bo'lgani uchun bu yerga shunchaki sana input qo'ydim */}
                <div
                  className={`w-full border-b border-black/50 pb-1 text-center`}
                >
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
                    className={underlineInputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Kimga (Recipient) */}
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

            {/* Kimdan (Sender) */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <span className="font-bold whitespace-nowrap w-24">Kimdan:</span>
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

            {/* Rahbar (Leader) */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <span className="font-bold whitespace-nowrap w-24">Rahbar:</span>
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

            {/* Harakat turi (Action Type) */}
            <div className="flex flex-col md:flex-row gap-4 items-end pt-4">
              <span className="font-bold whitespace-nowrap w-32">
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
                  // Select stilini oddiyroq qilish uchun
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>

          <div className="mt-20 text-sm text-gray-500 text-center italic">
            Ushbu shaklni chop etib, to'ldirib foydalanishingiz mumkin.
          </div>
        </div>

        {/* --- FOOTER (BUTTONLAR) --- */}
        <FormContainerFooter>
          <div className="flex justify-between w-full max-w-4xl mx-auto">
            <Button
              size="sm"
              variant="secondary"
              type="button"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              {t("Back")}
            </Button>

            <Button size="sm" type="submit" disabled={isLoading}>
              <SaveIcon className="mr-2 h-4 w-4" />
              {t("Save")}
            </Button>
          </div>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default RHDApplication;
