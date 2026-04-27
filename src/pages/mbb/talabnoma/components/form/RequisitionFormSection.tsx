import { MyInput, MyTextarea, MySelect } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui";
import { Plus, Trash2, Search, Loader2 } from "lucide-react";
import useMbbDocumentForm from "@/pages/mbb/talabnoma/hooks/useMbbDocumentForm.ts";
import { MyDateTimePicker } from "@/pages/tbp/hujjatlar/components/form/MyDateTimePicker";
import { Control, useWatch, useController } from "react-hook-form";
import { MbbDocumentDto } from "../../schemas/createMbbDocumentSchema";
import { useState, useCallback, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import { request } from "@/request";

const FlowSearchSelect = ({
  control,
  name,
}: {
  control: Control<MbbDocumentDto>;
  name: "no_number_flowid" | "no_number_flow_5_1";
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [flowCodeMap, setFlowCodeMap] = useState<Record<string, string>>({});

  const { field } = useController({
    control,
    name,
  });

  const selectedIds = (field.value || []) as string[];

  const debouncedSearch = useCallback(
    debounce(async (val: string) => {
      if (!val || val.length < 2) {
        setResults([]);
        setDropdownOpen(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await request.get(
          `/api/flows/get-for-inbedding/${val}`,
        );
        setResults(response?.data?.data || []);
        setDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching flows:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSearch(val);
  };

  const handleSelect = (item: any) => {
    if (!selectedIds.includes(item._id)) {
      setFlowCodeMap((prev) => ({ ...prev, [item._id]: item.flow_code }));
      field.onChange([...selectedIds, item._id]);
    }
    setSearchTerm("");
    setResults([]);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <div className="relative group mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600 text-gray-400">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => results?.length > 0 && setDropdownOpen(true)}
          className="block w-full pl-12 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-sm"
          placeholder="Flow ID yoki kodini qidiring..."
        />
        {dropdownOpen && results?.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-xl max-h-[250px] overflow-y-auto"
          >
            <div className="p-2 space-y-1">
              {results?.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full text-left p-3 hover:bg-blue-50/50 rounded-lg transition-colors border border-transparent hover:border-blue-100 group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.flow_code}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700">
                      {item.speed}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {item.consumer}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {selectedIds.map((currentId: string, index: number) => {
          return (
            <div
              key={currentId}
              className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <input
                  value={flowCodeMap[currentId] || currentId || ""}
                  readOnly
                  className="border-none focus:ring-0 h-6 bg-transparent font-mono text-sm w-full cursor-default outline-none text-gray-700"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const newValues = [...selectedIds];
                  newValues.splice(index, 1);
                  field.onChange(newValues);
                }}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NoNumberSection = ({ control }: { control: Control<MbbDocumentDto> }) => {
  const type = useWatch({
    control,
    name: "no_number_type",
  });

  const options = [
    { label: "MANUAL", value: "MANUAL" },
    { label: "FLOWID", value: "FLOWID" },
    { label: "FLOW_5_1", value: "FLOW_5_1" },
    { label: "LPLT_5_1", value: "LPLT_5_1" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4">
      <label className="font-semibold whitespace-nowrap md:w-56 text-gray-900 pt-2">
        4. NO raqami:
      </label>
      <div className="flex-1 max-w-2xl space-y-4">
        <div className="w-64">
          <MySelect
            name="no_number_type"
            control={control}
            options={options}
            placeholder="Tanlang"
          />
        </div>

        {type === "MANUAL" && (
          <div>
            <MyInput
              name="no_number_manual"
              control={control}
              className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
              placeholder="To'xtalish kuzatiladigan kanallar ilovada:"
            />
            <p className="text-[11px] text-gray-500 mt-1 w-full">
              (uzatish liniyasi, liniyaviy/gruppa traktlar va x.k)
            </p>
          </div>
        )}

        {type === "LPLT_5_1" && (
          <div>
            <MyInput
              name="no_number_lplt_5_1"
              control={control}
              className="border-0 border-b border-gray-300 rounded-none h-8 px-1 focus-visible:ring-0"
              placeholder="LPLT 5_1 qiymati"
            />
            <p className="text-[11px] text-gray-500 mt-1 w-full">
              (LPLT 5_1 bo'yicha qiymat)
            </p>
          </div>
        )}

        {type === "FLOWID" && (
          <FlowSearchSelect control={control} name="no_number_flowid" />
        )}

        {type === "FLOW_5_1" && (
          <FlowSearchSelect control={control} name="no_number_flow_5_1" />
        )}
      </div>
    </div>
  );
};

export const RequisitionFormSection = ({
  form,
  scheduleFields,
  appendSchedule,
  removeSchedule,
}: {
  form: ReturnType<typeof useMbbDocumentForm>["form"];
  scheduleFields: ReturnType<typeof useMbbDocumentForm>["scheduleFields"];
  appendSchedule: ReturnType<typeof useMbbDocumentForm>["appendSchedule"];
  removeSchedule: ReturnType<typeof useMbbDocumentForm>["removeSchedule"];
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
                <div className="w-60">
                  <MyDateTimePicker
                    name={`schedule.${index}.start_at`}
                    control={form.control}
                  />
                </div>
                <span className="text-gray-500">-</span>
                <div className="w-60">
                  <MyDateTimePicker
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
      <NoNumberSection control={form.control} />


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
