import {Control, useWatch, useFieldArray, UseFormSetValue, Controller} from "react-hook-form";
import {MyInput} from "dgz-ui-shared/components/form";
import {Button} from "dgz-ui";
import {Plus, Trash2, AlertCircle, CheckCircle, ChevronDown, ChevronUp} from "lucide-react";
import {useState, useEffect, useRef} from "react";
import {debounce} from "lodash";
import {request} from "@/request";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {MyDateTimePicker} from "@/pages/rh-252/a-252/components/form/MyDateTimePicker.tsx";
import {OrderApplication} from "@/pages/rh-252/a-252/interfaces/order.interface.ts";

interface SettingsDocSectionProps {
    control: Control<OrderApplication>;
    setValue: UseFormSetValue<any>;
}

interface ValidationStates {
    [key: string]: boolean;
}

const SettingsDocSection = ({control, setValue}: SettingsDocSectionProps) => {
    const [showJumladan, setShowJumladan] = useState(false);
    const [showFlows, setShowFlows] = useState(false);
    const [validationStates, setValidationStates] = useState<ValidationStates>({});

    const {fields, append, remove} = useFieldArray({
        control,
        name: "payload.stopped_flows" as any,
    });

    const watchedFlows = useWatch({
        control,
        name: "payload.stopped_flows",
    });

    const includingContent = useWatch({
        control,
        name: "payload.including",
    });

    const checkValidation = async (value: string, key: string) => {
        if (!value || value.trim() === "") {
            setValidationStates((prev) => {
                const newState = {...prev};
                delete newState[key];
                return newState;
            });
            return;
        }

        try {
            const res = await request.get(
                `/api/rh-252/order/check?idOrChannel=${encodeURIComponent(value)}&isEmpty=${false}`,
            );
            const isValid = res.data?.valid !== false;

            setValidationStates((prev) => ({
                ...prev,
                [key]: isValid,
            }));
        } catch (error) {
            console.error("Validation error:", error);
            setValidationStates((prev) => ({
                ...prev,
                [key]: false,
            }));
        }
    };

    const debouncedCheck = useRef(
        debounce((value: string, key: string) => {
            checkValidation(value, key);
        }, 500),
    ).current;

    useEffect(() => {
        if (!watchedFlows) return;
        watchedFlows.forEach((value: any, index: number) => {
            if (value) debouncedCheck(value, `flow-${index}`);
        });
    }, [watchedFlows]);

    const getValidationStatus = (index: number) => {
        const key = `flow-${index}`;
        const value = watchedFlows?.[index];
        if (!value) return undefined;
        if (validationStates[key] === undefined) return 'checking';
        return validationStates[key] ? 'valid' : 'invalid';
    };

    const handleAddFlow = () => {
        append("");
    };


    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="text-center mb-8">
                <MyInput
                    name="payload.basic.title"
                    control={control}
                    placeholder={"Rejadan tashqari ta’mirlash-sozlash ishlari to‘g‘risida"}
                    className="border border-t-0 border-l-0 border-r-0 rounded-none"
                />
                <div className="text-gray-800 leading-relaxed text-justify p-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex gap-6 items-end ">
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
                            <span>“2-8” aloqani yopish yoʻli bilan</span>
                        </div>

                        <span className="inline-block w-full">
                          <Controller
                              name="payload.content"
                              control={control}
                              render={({field}) => (
                                  <textarea
                                      {...field}
                                      placeholder="XKM-1, XKM-4 stansiyalaridagi shaharlararo va mobil aloqa operatorlarining..."
                                      className="w-full border-2 border-gray-400
               rounded-none bg-transparent resize-none leading-7
               focus:outline-none focus:ring-0 focus:border-blue-600
               transition-colors duration-200"
                                      rows={4}
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
                        <ChevronUp className="w-5 h-5 text-gray-600"/>
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600"/>
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
                            <div className="flex flex-wrap items-center gap-2 text-lg">
                                <span className="font-semibold">Kanallar asosiy trassalari:</span>
                                <MyInput
                                    control={control}
                                    name="payload.main_routes"
                                    placeholder="PS716 (test) (AI-7) avtozaxira."
                                    className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent inline-block w-64"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-lg">
                                <span className="font-semibold">Kanallar zaxira trassalari:</span>
                                <MyInput
                                    control={control}
                                    name="payload.reserve_routes"
                                    placeholder="PS714, PS718, PS719 (AI-7), SP126 (AI-9)."
                                    className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent inline-block w-64"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-lg">
                                <span className="font-semibold">Kelishilgan:</span>
                                <MyInput
                                    control={control}
                                    name="payload.concert_second"
                                    placeholder=" Sh. Hamroyev (AI-7), B. Mansurxonov (AI-9)."
                                    className="border-t-0 border-l-0 border-r-0 rounded-none h-7 bg-transparent inline-block w-64"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* To'xtalish kuzatiladigan oqimlar Section */}
            <div className="border rounded-lg overflow-hidden">
                <button
                    type="button"
                    onClick={() => setShowFlows(!showFlows)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                    <h3 className="text-lg font-semibold text-gray-700">
                        To'xtalish kuzatiladigan oqimlar
                    </h3>
                    {showFlows ? (
                        <ChevronUp className="w-5 h-5 text-gray-600"/>
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600"/>
                    )}
                </button>

                {showFlows && (
                    <div className="p-4 bg-white border-t">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-gray-600">
                                Oqim ID raqamlarini kiriting (har biri tekshiriladi)
                            </p>
                            <Button
                                type="button"
                                onClick={handleAddFlow}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-all text-sm"
                            >
                                <Plus className="w-4 h-4"/>
                                ID qo'shish
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {fields.map((field, index) => {
                                const status = getValidationStatus(index);
                                return (
                                    <div
                                        key={field.id}
                                        className={`flex items-center gap-2 p-2 bg-white border rounded-lg shadow-sm transition-colors ${
                                            status === 'valid'
                                                ? 'border-green-300 bg-green-50'
                                                : status === 'invalid'
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className="bg-gray-100 text-gray-500 text-xs font-mono px-2 py-1 rounded">
                                            {index + 1}.
                                        </div>
                                        <div className="flex-1">
                                            <MyInput
                                                control={control}
                                                name={`payload.stopped_flows.${index}`}
                                                placeholder="ID3161"
                                                className="border-none focus:ring-0 h-8 text-sm font-medium"
                                            />
                                        </div>
                                        {status === 'checking' && (
                                            <div className="text-blue-500 animate-spin text-lg">⟳</div>
                                        )}
                                        {status === 'valid' && (
                                            <CheckCircle className="w-4 h-4 text-green-500"/>
                                        )}
                                        {status === 'invalid' && (
                                            <span title="ID topilmadi">
                                                <AlertCircle className="w-4 h-4 text-red-500"/>
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-400 hover:text-red-600 p-1 transition-colors"
                                            title="O'chirish"
                                        >
                                            <Trash2 className="w-4 h-4"/>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {fields.length === 0 && (
                            <div
                                className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
                                Hali hech qanday oqim ID kiritmadingiz. "ID qo'shish" tugmasini bosing.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Additional Sections from Image */}
            <div className="space-y-6 mt-8">
                {/* Ish o'tkazish bo'yicha mas'ul */}
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-start gap-2 text-lg">
                        <span className="font-semibold whitespace-nowrap pt-1">Ish o‘tkazish bo‘yicha mas’ul:</span>
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
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
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
                        <span className="font-semibold whitespace-nowrap pt-1">Kelishilgan:</span>
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
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
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
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
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