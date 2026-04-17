import {
  Control,
  Controller,
  useFieldArray,
  useWatch,
  UseFormSetValue,
} from "react-hook-form";
import { MyInput } from "dgz-ui-shared/components/form";
import { ChevronDown, ChevronUp, Search, Loader2, Trash2 } from "lucide-react";
import { MyDateTimePicker } from "./MyDateTimePicker.tsx";
import { useEffect, useRef, useState, useCallback } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import debounce from "lodash/debounce";
import { request } from "@/request";

interface SettingsDocSectionProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
}

const SettingsDocSection = ({ control, setValue }: SettingsDocSectionProps) => {
  const [showJumladan, setShowJumladan] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mapping to store flow_codes for display
  const [flowCodeMap, setFlowCodeMap] = useState<Record<string, string>>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payload.stopped_flows",
  });

  const watchedFlows = useWatch({
    control,
    name: "payload.stopped_flows",
  });

  const includingContent = useWatch({
    control,
    name: "payload.including",
  });

  // Debounced search logic
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
          `api/flows/get-for-inbedding/${val}`,
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
    const currentValues = control._formValues?.payload?.stopped_flows || [];
    if (!currentValues.includes(item._id)) {
      setFlowCodeMap((prev) => ({ ...prev, [item._id]: item.flow_code }));
      append(item._id);
    }
    setSearchTerm("");
    setResults([]);
    setDropdownOpen(false);
  };

  // Close dropdown on click outside
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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MyInput
          name="payload.basic.title"
          control={control}
          placeholder={
            "Rejadan tashqari ta’mirlash-sozlash ishlari to‘g‘risida"
          }
          className="border border-t-0 border-l-0 border-r-0 rounded-none text-center font-bold"
        />
        <div className="text-gray-800 leading-relaxed text-justify p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end gap-6 justify-center">
              <MyDateTimePicker
                control={control}
                name="payload.basic.start_time"
                label="Boshlanish vaqti"
              />
              <span>dan </span>
              <MyDateTimePicker
                control={control}
                name="payload.basic.end_time"
                label="Tugash vaqti"
              />
              <span>gacha </span>
            </div>

            <span className="inline-block w-full mt-4">
              <Controller
                name="payload.content"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full border-2 border-gray-400
               rounded-none bg-transparent resize-none leading-7
               focus:outline-none focus:ring-0 focus:border-blue-600
               transition-colors duration-200"
                    rows={4}
                    placeholder="XKM-1, XKM-4 stansiyalaridagi shaharlararo va mobil aloqa operatorlarining... ko'chirish ishlarining ... bosqichi bajarilsin."
                  />
                )}
              />
            </span>
          </div>
        </div>
      </div>
      {/* Jumladan Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setShowJumladan(!showJumladan)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-700">Jumladan</h3>
          {showJumladan ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {showJumladan && (
          <div className="p-4 bg-white border-t">
            <div className="min-h-[300px] bg-white">
              <ReactQuill
                theme="snow"
                value={includingContent || ""}
                onChange={(val) => setValue("payload.including", val)}
                className="h-[250px] mb-5"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-lg mb-2">
                <span className="font-semibold">
                  Kanallar asosiy trassalari:
                </span>
                <MyInput
                  control={control}
                  name="payload.main_routes"
                  placeholder="PS716 (test) (AI-7) avtozaxira."
                  className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent inline-block flex-1 min-w-[200px]"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-lg mb-2">
                <span className="font-semibold">
                  Kanallar zaxira trassalari:
                </span>
                <MyInput
                  control={control}
                  name="payload.reserve_routes"
                  placeholder="PS714, PS718, PS719 (AI-7), SP126 (AI-9)."
                  className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent inline-block flex-1 min-w-[200px]"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-lg mb-2">
                <span className="font-semibold">Kelishilgan:</span>
                <MyInput
                  control={control}
                  name="payload.concert_second"
                  placeholder=" Sh. Hamroyev (AI-7), B. Mansurxonov (AI-9)."
                  className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent inline-block flex-1 min-w-[200px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* To'xtalish kuzatiladigan oqimlar Section */}
      <div className="border rounded-lg">
        <h3 className="text-lg p-2 font-semibold text-gray-700">
          To'xtalish kuzatiladigan oqimlar
        </h3>

        {/* {showFlows && ( */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 font-medium">
              Oqim ID raqamlarini qidiring va tanlang
            </p>
          </div>

          {/* Search Input and Dropdown */}
          <div className="relative mb-8 max-w-2xl">
            <div className="relative group">
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
                className="block w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-sm"
                placeholder="Flow ID yoki kodini qidiring..."
              />
            </div>

            {dropdownOpen && results?.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-2xl max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field, index) => {
              const currentId = watchedFlows?.[index];
              return (
                <div
                  key={field.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="bg-blue-100 text-blue-600 text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      value={flowCodeMap[currentId] || currentId || ""}
                      readOnly
                      className="border-none focus:ring-0 h-8 bg-transparent font-mono text-sm w-full cursor-default outline-none text-gray-700"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {fields.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
              Hali hech qanday oqim tanlamadingiz. Yuqoridagi qidiruv maydonidan
              foydalaning.
            </div>
          )}
        </div>
      </div>

      {/* Additional Sections from Image */}
      <div className="space-y-6 mt-8">
        {/* Ish o'tkazish bo'yicha mas'ul */}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-start gap-2 text-lg">
            <span className="font-semibold whitespace-nowrap pt-1">
              Ish o‘tkazish bo‘yicha mas’ul:
            </span>
            <div className="flex-1">
              <Controller
                name="payload.responsible_person"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={1}
                    placeholder="“O‘zbektelekom” AK “IT” filiali KTB xizmat boshlig‘i – S. Yakubov."
                    className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-400
               rounded-none bg-transparent resize-none leading-7
               focus:outline-none focus:ring-0 focus:border-blue-600
               transition-colors duration-200"
                    onChange={(e) => {
                      field.onChange(e);
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Kelishilgan */}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-start gap-2 text-lg">
            <span className="font-semibold whitespace-nowrap pt-1">
              Kelishilgan:
            </span>
            <div className="flex-1">
              <Controller
                name="payload.concert_text"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={1}
                    placeholder="“O‘zbektelekom” AK boshqaruv raisining birinchi o‘rinbosari – J. Aripov..."
                    className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-400
               rounded-none bg-transparent resize-none leading-7
               focus:outline-none focus:ring-0 focus:border-blue-600
               transition-colors duration-200"
                    onChange={(e) => {
                      field.onChange(e);
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Asos */}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-start gap-2 text-lg">
            <span className="font-semibold whitespace-nowrap pt-1">Asos:</span>
            <div className="flex-1">
              <Controller
                name="payload.basis"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={1}
                    placeholder="MBB-1 1-toifali muhandisi D. Abdalimovaning 2026-yil 9-yanvardagi 10-son talabnomasi."
                    className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-400
               rounded-none bg-transparent resize-none leading-7
               focus:outline-none focus:ring-0 focus:border-blue-600
               transition-colors duration-200"
                    onChange={(e) => {
                      field.onChange(e);
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDocSection;
