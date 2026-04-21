import { useState, useCallback, useRef, useEffect } from "react";
import { useFieldArray, Control, useWatch } from "react-hook-form";
import { MyInput, MyDatePicker } from "dgz-ui-shared/components/form";
import { Trash2, Hash, Search, Loader2 } from "lucide-react";
import { MyDateTimePicker } from "./MyDateTimePicker.tsx";
import debounce from "lodash/debounce";
import { request } from "@/request";

interface TelegraphPlannedWorkSectionProps {
  control: Control<any>;
}

const TelegraphPlannedWorkSection = ({
  control,
}: TelegraphPlannedWorkSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mapping to store flow_codes for display
  const [flowCodeMap, setFlowCodeMap] = useState<Record<string, string>>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payload.flow_ids",
  });

  const flowIds = useWatch({
    control,
    name: "payload.flow_ids",
    defaultValue: [],
  });

  const maxDuration = useWatch({
    control,
    name: "payload.basic.max_duration_minutes",
    defaultValue: 0,
  });

  const isDurationZero = Number(maxDuration) === 0 || !maxDuration;

  // Debounced search logic
  const debouncedSearch = useCallback(
    debounce(async (val: string) => {
      if (!val || val.length < 2) {
        setResults([]);
        setShowDropdown(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await request.get(
          `/api/flows/get-for-inbedding/${val}`,
        );
        setResults(response?.data?.data || []);
        setShowDropdown(true);
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
    // Get current values to avoid duplicates
    const currentValues = control._formValues?.payload?.flow_ids || [];
    if (!currentValues.includes(item._id)) {
      setFlowCodeMap((prev) => ({ ...prev, [item._id]: item.flow_code }));
      append(item._id);
    }
    setSearchTerm("");
    setResults([]);
    setShowDropdown(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="">
      <div className="mb-8 space-y-6">
        <div className="border-b ">
          <MyInput
            control={control}
            name="payload.basic.title"
            className="text-left text-xl border-none w-full p-0 rounded-none"
            placeholder="'Telegraph' tarmog'ida reajalashtirilgan ishlar to'g'risida xabarnoma"
          />
        </div>

        <div className="text-gray-700 leading-relaxed italic space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>Asos: </span>
            <span className="w-40 inline-block">
              <MyInput
                control={control}
                name="payload.basic.organization_name"
                placeholder="Telegraph"
                className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent p-0 font-medium"
              />
            </span>
            <span>ning </span>
            <span className="w-40 inline-block">
              <MyDatePicker
                control={control}
                name="payload.basic.request_date"
              />
            </span>
            <span>dagi </span>
            <span className="w-56 inline-block">
              <MyInput
                control={control}
                name="payload.basic.request_number"
                placeholder="TT38546-sonli xabarnomasi"
                className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent p-0"
              />
            </span>

            <span className="w-64 inline-block border-b">
              <MyInput
                control={control}
                name="payload.basic.connection_closure_type"
                placeholder="2-8 aloqa yopish yo'li bilan"
                disabled={isDurationZero}
                className={`border-t-0 border-l-0 border-r-0 h-7 bg-transparent p-0 focus:ring-0 font-medium rounded-none ${isDurationZero ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </span>
            <span>maksimal </span>
            <span className="w-16 inline-block">
              <MyInput
                control={control}
                type="number"
                name="payload.basic.max_duration_minutes"
                placeholder="120"
                className="border-none rounded-none h-5 bg-transparent p-0 focus:ring-0 font-bold"
              />
            </span>
            <span>daqiqagacha bo'lgan muddatga.</span>
            <span className=" ">Vaqti:</span>
            <span className=" inline-block mr-5">
              <MyDateTimePicker
                control={control}
                name="payload.basic.start_time"
              />
            </span>
            <span>dan</span>
            <span className=" inline-block mr-5">
              <MyDateTimePicker
                control={control}
                name="payload.basic.end_time"
              />
            </span>
            <span>gacha.</span>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-100" />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qo'shimcha ma'lumot
        </label>
        <textarea
          {...control.register("payload.basic.context")}
          disabled={!isDurationZero}
          placeholder={
            isDurationZero
              ? "Izoh qoldiring..."
              : "Daqiqa 0 dan katta bo'lgani uchun bu maydon yopiq"
          }
          className={`w-full p-3 border rounded-lg transition-all min-h-[100px] 
                        ${!isDurationZero ? "bg-gray-100 cursor-not-allowed opacity-50" : "bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
        />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Hash className="w-5 h-5 text-indigo-600" />
            ID raqamlari
          </h3>
        </div>

        {/* Search Input and Dropdown */}
        <div className="relative mb-8 max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-gray-400">
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
              onFocus={() => results.length > 0 && setShowDropdown(true)}
              className="block w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="Flow ID yoki kodini qidiring..."
            />
          </div>

          {showDropdown && results?.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-2xl max-h-[400px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="p-2 space-y-1">
                {results?.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full text-left p-3 hover:bg-indigo-50/50 rounded-lg transition-colors border border-transparent hover:border-indigo-100 group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {item.flow_code}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-700">
                        {item.speed}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2 truncate">
                      {item.consumer}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-indigo-300 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="bg-indigo-100 text-indigo-600 text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded">
                {index + 1}
              </div>
              <div className="flex-1">
                <input
                  value={flowCodeMap[flowIds[index]] || flowIds[index] || ""}
                  readOnly
                  placeholder="ID0000000"
                  className="border-none focus:ring-0 h-8 bg-transparent font-mono text-sm w-full cursor-default outline-none text-gray-700"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelegraphPlannedWorkSection;
