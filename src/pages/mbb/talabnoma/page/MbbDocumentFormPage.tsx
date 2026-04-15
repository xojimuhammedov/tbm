import { Button } from "dgz-ui/button";
import {
  Form,
  MyInput,
  MySelect,
  MyDatePicker,
  MyTextarea,
} from "dgz-ui-shared/components/form";
import { ArrowLeftIcon, Plus, Trash2 } from "lucide-react";
import useMbbDocumentForm from "@/pages/mbb/talabnoma/hooks/useMbbDocumentForm.ts";
import { useNavigate, useParams } from "react-router-dom";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { useTranslation } from "react-i18next";
import { useFieldArray, Control } from "react-hook-form";
import { MbbDocumentDto } from "../schemas/createMbbDocumentSchema";

/* ─── REQUISITION: Nested application block ─── */
const ApplicationBlock = ({
  control,
  index,
  removeApplication,
}: {
  control: Control<MbbDocumentDto>;
  index: number;
  removeApplication: (i: number) => void;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `application.${index}.ranges`,
  });

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-3 relative">
      <div className="absolute right-3 top-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => removeApplication(index)}
          className="text-red-400 hover:text-red-600 h-6 w-6"
        >
          <Trash2 size={16} />
        </Button>
      </div>
      <div className="w-56 pr-8">
        <MyInput
          label="Operator nomi"
          name={`application.${index}.operator_name`}
          control={control}
          placeholder="Masalan: Ucell"
          className="h-9 bg-white"
        />
      </div>
      <div className="pt-2">
        <label className="text-xs font-semibold text-gray-500 mb-2 block">
          Oraliqlar (Ranges)
        </label>
        <div className="flex flex-col gap-3">
          {fields.map((f, rIndex) => (
            <div key={f.id} className="flex items-center gap-3">
              <div className="w-24">
                <MyInput
                  name={`application.${index}.ranges.${rIndex}.from`}
                  control={control}
                  placeholder="2393"
                  className="h-8 bg-white"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="w-24">
                <MyInput
                  name={`application.${index}.ranges.${rIndex}.to`}
                  control={control}
                  placeholder="2400"
                  className="h-8 bg-white"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:bg-red-50"
                onClick={() => remove(rIndex)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          className="mt-3 h-7 text-xs border-dashed text-slate-500"
          onClick={() => append({ from: "", to: "" })}
        >
          <Plus size={14} className="mr-1" /> Oraliq qo'shish
        </Button>
      </div>
    </div>
  );
};

/* ─── REQUISITION Form Section ─── */
const RequisitionFormSection = ({
  form,
  scheduleFields,
  applicationFields,
  appendSchedule,
  removeSchedule,
  appendApplication,
  removeApplication,
}: {
  form: ReturnType<typeof useMbbDocumentForm>["form"];
  scheduleFields: ReturnType<typeof useMbbDocumentForm>["scheduleFields"];
  applicationFields: ReturnType<typeof useMbbDocumentForm>["applicationFields"];
  appendSchedule: ReturnType<typeof useMbbDocumentForm>["appendSchedule"];
  removeSchedule: ReturnType<typeof useMbbDocumentForm>["removeSchedule"];
  appendApplication: ReturnType<typeof useMbbDocumentForm>["appendApplication"];
  removeApplication: ReturnType<typeof useMbbDocumentForm>["removeApplication"];
}) => (
  <>
    <div className="flex flex-col items-center justify-center gap-2 text-lg font-bold mb-8">
      <div className="flex items-center gap-2 text-2xl uppercase">
        <span>TALABNOMA №</span>
        <MyInput
          name="code"
          control={form.control}
          className="w-24 text-center border-0 border-b-2 border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-8 text-2xl font-bold"
          placeholder="30"
        />
      </div>
      <span className="text-xs font-normal text-gray-500">(tartib raqami)</span>
    </div>

    <div className="space-y-6 text-[15px]">
      {/* 1 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          1. Ish olib borish sharti:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="working_condition"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
            placeholder="2-8 qisqa yo'qolish bilan"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (aloqani yopish yo'li bilan/yopmaslik yo'li bilan/qisqa yo'qolish
            bilan)
          </p>
        </div>
      </div>

      {/* 2 */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <label className="font-semibold md:w-56 text-gray-900 mt-2">
          2. Sana:
        </label>
        <div className="flex-1">
          <div className="flex flex-col gap-3">
            {scheduleFields.map((field, index) => (
              <div key={field.id} className="flex flex-wrap items-center gap-3">
                <div className="w-44">
                  <MyDatePicker
                    name={`schedule.${index}.start_at`}
                    control={form.control}
                  />
                </div>
                <span className="text-gray-500">-</span>
                <div className="w-44">
                  <MyDatePicker
                    name={`schedule.${index}.end_at`}
                    control={form.control}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSchedule(index)}
                  disabled={scheduleFields.length === 1}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              className="w-fit text-xs border-dashed"
              onClick={() => appendSchedule({ start_at: "", end_at: "" })}
            >
              <Plus size={14} className="mr-1" /> Vaqt qo'shish
            </Button>
          </div>
          <p className="text-[11px] text-gray-500 mt-2 text-center w-full max-w-[400px]">
            (ish olib borish yili, oyi, kuni, soat/min.)
          </p>
        </div>
      </div>

      {/* 3 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          3. Uchastka, stansiya:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="station"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
            placeholder="O'zbektelekom AK Ixtisoslashtirilgan texnik filiali"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (Magistral nomi, № IP)
          </p>
        </div>
      </div>

      {/* 4 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          4. NO raqami:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="no_number"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
            placeholder="To'xtalish kuzatiladigan kanallar ilovada:"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (uzatish liniyasi, liniyaviy/gruppa traktlar va x.k)
          </p>
        </div>
      </div>

      {/* Application Data nested array */}
      <div className="ml-0 md:ml-60 border-l-[3px] border-indigo-200 pl-6 py-2 space-y-4 max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[15px] font-bold text-indigo-900">
            Kanallar ilovasi (Array):
          </h4>
          <Button
            type="button"
            className="h-8 text-xs font-semibold text-indigo-700 border-indigo-200 hover:bg-indigo-50"
            onClick={() =>
              appendApplication({
                operator_name: "",
                ranges: [{ from: "", to: "" }],
              })
            }
          >
            <Plus size={14} className="mr-1" /> Operator qo'shish
          </Button>
        </div>

        {applicationFields.map((field, index) => (
          <ApplicationBlock
            key={field.id}
            control={form.control}
            index={index}
            removeApplication={removeApplication}
          />
        ))}
      </div>

      {/* 5 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          5. AI kanallari:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="ai_channel"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
            placeholder="bor/yo'q"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (bor/yo'q, aloqa raqami ID)
          </p>
        </div>
      </div>

      {/* 6 */}
      <div className="flex gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900 mt-2">
          6.
        </label>
        <div className="flex-1 max-w-2xl">
          <MyTextarea
            name="reason_work"
            control={form.control}
            className="border-gray-300 min-h-[80px]"
            placeholder="O'zbektelekom AK bilan kelishuviga asosan..."
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (ish olib borish sababi)
          </p>
        </div>
      </div>

      {/* 7 */}
      <div className="flex gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900 mt-2">
          7.
        </label>
        <div className="flex-1 max-w-2xl">
          <MyTextarea
            name="content_work"
            control={form.control}
            className="border-gray-300 min-h-[80px]"
            placeholder="XKM-1, XKM-4 stansiyasidagi..."
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (ish olib borish mazmuni)
          </p>
        </div>
      </div>

      {/* 8 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          8. NO xolati:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="no_status"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (indeks xolati va NO o'zgargan sanasi)
          </p>
        </div>
      </div>

      {/* 9 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          9. AvaO'J:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="aoj_number"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
            placeholder="bor"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (almashtirish va aylanib o'tish jadval raqami)
          </p>
        </div>
      </div>

      {/* 10 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          10.
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="reverse"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
            placeholder="bor"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (boshqa zaxiralash usuli)
          </p>
        </div>
      </div>

      {/* 11 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          11. Boshqaruv stansiyasi:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="responsible_person"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (Olib boriladigan ishga javobgar shaxs)
          </p>
        </div>
      </div>

      {/* 12 */}
      <div className="flex gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900 mt-2">
          12. Kelishildi:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyTextarea
            name="agreed"
            control={form.control}
            className="border-gray-300 min-h-[60px]"
            placeholder="O'zbektelekom AK boshqaruv raisining o'rinbosari..."
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            ("O'zbektelekom" AK ekspluatatsiya korxonasining texnik boshliqlari)
          </p>
        </div>
      </div>

      {/* 13 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          13. Kelishildi:
        </label>
        <div className="flex-1 max-w-2xl">
          <MyInput
            name="ai_agreed"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
          />
          <p className="text-[11px] text-gray-500 mt-1 text-center w-full">
            (F.I.SH. AI-9 (joyidagi))
          </p>
        </div>
      </div>

      {/* 14 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 pt-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          14. Talabnoma tuzuvchi (IP):
        </label>
        <div className="flex-1 max-w-2xl flex items-center gap-4">
          <MyInput
            name="creator_ip"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0 w-full"
            placeholder="ICHTEX oliy toifali muhandisi D. Turgunova"
          />
        </div>
      </div>

      {/* 15 */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900">
          15. Talabnoma tuzuvchi (MBB-1):
        </label>
        <div className="flex-1 max-w-2xl flex items-center gap-4">
          <MyInput
            name="creator_mbb"
            control={form.control}
            className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0 w-full"
            placeholder="MBB-1 1-toifali muhandisi D. Abdalimova"
          />
        </div>
      </div>
    </div>
  </>
);

/* ─── MEMO Form Section ─── */
const MemoFormSection = ({
  form,
  dataFields,
  handleAppendData,
  handleRemoveData,
}: {
  form: ReturnType<typeof useMbbDocumentForm>["form"];
  dataFields: ReturnType<typeof useMbbDocumentForm>["dataFields"];
  handleAppendData: ReturnType<typeof useMbbDocumentForm>["handleAppendData"];
  handleRemoveData: ReturnType<typeof useMbbDocumentForm>["handleRemoveData"];
}) => (
  <>
    <h1 className="text-xl font-bold text-center">
      ʻʻOʼzTTBRMʼʼ DUK farmoyishini bajarilishi boʼyicha 3.3.-son shakl
    </h1>

    <div className="flex items-center justify-center gap-2 text-lg font-bold mt-2">
      <span>MAʼLUMOTNOMA №</span>
      <MyInput
        name="code"
        control={form.control}
        className="w-20 text-center border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
        placeholder="21"
      />
    </div>

    <MyInput
      name="title"
      control={form.control}
      className="text-lg font-semibold text-center border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 mt-2 mb-4"
      placeholder="Xalqaro Ethernet kanalni o'chirish bo'yicha"
    />

    <table className="border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th
            rowSpan={2}
            className="border border-gray-300 px-2 py-3 text-xs text-center align-middle w-12"
          >
            № t/r
          </th>
          <th
            rowSpan={2}
            className="border border-gray-300 px-4 py-3 text-xs text-center"
          >
            "O'zTTBRM" DUK farmoyish №
          </th>
          <th
            rowSpan={2}
            className="border border-gray-300 px-4 py-3 text-xs text-center"
          >
            Farmoyishda ko'rsatilgan vaqt
          </th>
          <th
            rowSpan={2}
            className="border border-gray-300 px-4 py-3 text-xs text-center"
          >
            Farmoyish bajarilgan vaqt
          </th>
          <th
            rowSpan={2}
            className="border border-gray-300 px-4 py-3 text-xs text-center"
          >
            Farmoyish bajarilishida ma'sul shaxs
          </th>
          <th
            rowSpan={2}
            className="border border-gray-300 px-4 py-3 text-xs text-center"
          >
            Iste'molchi (Aloqani ishga qabul qilib olgan ise'molchining F.I.SH.)
          </th>
          <th
            rowSpan={2}
            className="border border-gray-300 px-4 py-3 text-xs text-center w-32"
          >
            Izoh
          </th>
          <th
            rowSpan={2}
            className="border border-gray-300 px-4 py-3 text-xs text-center w-12"
          ></th>
        </tr>
      </thead>
      <tbody>
        {dataFields.map((field, index) => (
          <tr key={field.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-2 py-2 text-center font-medium">
              {index + 1}
            </td>
            <td className="border border-gray-300 px-2 py-2">
              <MyInput
                name={`data.${index}.order_code`}
                control={form.control}
                className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </td>
            <td className="border border-gray-300 px-2 py-2">
              <MyDatePicker
                name={`data.${index}.assigned_time`}
                control={form.control}
              />
            </td>
            <td className="border border-gray-300 px-2 py-2">
              <MyDatePicker
                name={`data.${index}.completed_time`}
                control={form.control}
              />
            </td>
            <td className="border border-gray-300 px-2 py-2">
              <MyInput
                name={`data.${index}.responsible_executor`}
                control={form.control}
                className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
              />
            </td>
            <td className="border border-gray-300 px-2 py-2">
              <MyInput
                name={`data.${index}.customer_details`}
                control={form.control}
                className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
              />
            </td>
            <td className="border border-gray-300 px-2 py-2">
              <MyInput
                name={`data.${index}.comment`}
                control={form.control}
                className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
              />
            </td>
            <td className="border border-gray-300 px-2 py-2 text-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveData(index)}
                disabled={dataFields.length === 1}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
              >
                <Trash2 size={18} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="mt-4 flex justify-end">
      <Button
        type="button"
        onClick={handleAppendData}
        className="flex items-center gap-2"
      >
        <Plus size={20} />
      </Button>
    </div>
  </>
);

/* ─── Main Unified Form Page ─── */
const MbbDocumentFormPage = () => {
  const { id } = useParams();
  const {
    form,
    documentType,
    scheduleFields,
    applicationFields,
    appendSchedule,
    removeSchedule,
    appendApplication,
    removeApplication,
    dataFields,
    handleAppendData,
    handleRemoveData,
    onSubmit,
  } = useMbbDocumentForm({ id });
  const { staffOptions } = useStaffOptions();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const documentTypeOptions = [
    { label: "Talabnoma (REQUISITION)", value: "REQUISITION" },
    { label: "Ma'lumotnoma (MEMO)", value: "MEMO" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 bg-gray-50/50 min-h-screen"
      >
        <div className="w-full max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          {/* Document Type Select */}
          <div className="mb-8 flex justify-center">
            <div className="w-80">
              <MySelect
                name="document_type"
                control={form.control}
                options={documentTypeOptions}
                placeholder="Hujjat turini tanlang"
                label="Hujjat turi"
              />
            </div>
          </div>

          {/* Conditional Form Body */}
          {documentType === "REQUISITION" ? (
            <RequisitionFormSection
              form={form}
              scheduleFields={scheduleFields}
              applicationFields={applicationFields}
              appendSchedule={appendSchedule}
              removeSchedule={removeSchedule}
              appendApplication={appendApplication}
              removeApplication={removeApplication}
            />
          ) : (
            <MemoFormSection
              form={form}
              dataFields={dataFields}
              handleAppendData={handleAppendData}
              handleRemoveData={handleRemoveData}
            />
          )}

          {/* Signer section (common to both) */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 items-center border-t border-gray-200 pt-8 justify-between">
            <div className="w-72">
              <MySelect
                name="signer"
                control={form.control}
                options={staffOptions || []}
                placeholder="Imzolovchini tanlang"
                label="Tasdiqlovchi/Imzolovchi (Tizim)"
              />
            </div>
          </div>
        </div>

        <FormContainerFooter>
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
            {t("Orqaga")}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default MbbDocumentFormPage;
