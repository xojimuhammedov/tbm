import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import useApplicationDocumentForm from "@/pages/rtsi/application/hooks/useApplicationDocumentForm.ts";

interface ApplicationDocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const ApplicationDocumentForm = ({
  id,
  onSave,
}: ApplicationDocumentFormProps) => {
  const { t } = useTranslation();
  const { form, handleSubmit } = useApplicationDocumentForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="py-6 px-4">
        <div className="text-center text-base mb-6">
          <p>“O‘zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
          <p>Respublika markazi” davlat unitar korxonasi</p>
          <p className="font-bold mt-2">FARMOYISHI</p>
        </div>

        <div className="flex justify-between text-sm mb-8">
          <MyInput
            control={form.control}
            placeholder={t("Sana")}
            className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
          <MyInput
            control={form.control}
            placeholder={t("Qarori")}
            className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
          <MyInput
            control={form.control}
            placeholder={t("Soni")}
            className="border border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>

        <div className="mb-8 text-sm">
          <p className="font-semibold">Kimga:</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <MyInput
            control={form.control}
            placeholder={t("")}
            className="border border-t-0 border-l-0 border-r-0 rounded-none"
          />
          <p className="font-bold">
            oqimlarni tarmoqdan o‘chirish to‘g‘risida.
          </p>
        </div>
        <p className="mt-4 text-lg">
          “O‘zTBRM” DUK mintaqaviy boshqaruv bog‘lamasining 2-oktabrdagi
          18-bildirgisiga binoan “O‘zbektelekom” G‘arbiy filialiga tegishli
          bo‘lgan quyidagi 51x2Mbit/s oqimlarni 2025-yil 26-sentabrdan tarmoqdan
          o‘chirilganligi tasdiqlansin va texnologik hujjatlarga tegishli
          o‘zgartirishlar kiritilsin:
        </p>

        <ol className="list-decimal pl-8 space-y-4 mt-6">
          <li className="flex flex-col gap-2">
            <span>
              <input
                type="text"
                className="border-b-2 border-gray-400 w-20 text-center focus:border-blue-600 outline-none"
              />
              Mbit/s oqimlar
              <input
                type="text"
                className="border-b-2 border-gray-400 w-24 text-center focus:border-blue-600 outline-none"
              />
              <input
                type="text"
                className="border-b-2 border-gray-400 w-24 text-center focus:border-blue-600 outline-none"
              />{" "}
              yo‘nalishida
              <input
                type="text"
                className="border-b-2 border-gray-400 w-72 focus:border-blue-600 outline-none"
              />
            </span>
          </li>
        </ol>
      </form>
    </Form>
  );
};

export default ApplicationDocumentForm;
