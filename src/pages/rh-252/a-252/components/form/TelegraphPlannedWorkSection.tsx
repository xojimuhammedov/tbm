import {useFieldArray, Control} from "react-hook-form";
import {MyInput, MyDatePicker, MyTimePicker} from "dgz-ui-shared/components/form";
import {Button} from "dgz-ui";
import {Plus, Trash2, Hash, Info} from "lucide-react";

interface TelegraphPlannedWorkSectionProps {
    control: Control<any>;
}

const TelegraphPlannedWorkSection = ({control}: TelegraphPlannedWorkSectionProps) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: "payload.flow_ids",
    });

    const handleAddId = () => {
        append("");
    };

    return (
        <div className="">
            <div className="mb-8 space-y-6">
                <div className="border-b pb-4">
                    <MyInput
                        control={control}
                        name="payload.basic.title"
                        className="text-left text-xl font-bold uppercase border-none focus:ring-0 w-full p-0"
                        placeholder="'Telegraph' tarmog'ida reajalashtirilgan ishlar to'g'risida xabarnoma"
                    />
                </div>

                <div className="text-gray-700 leading-relaxed italic space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span>(Asos: </span>
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
                            <MyDatePicker control={control} name="payload.basic.request_date"/>
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

                        <span>)</span>

                        <span className="w-64 inline-block border-b border-blue-200">
                            <MyInput
                                control={control}
                                name="payload.basic.connection_closure_type"
                                placeholder="2-8 aloqa yopish yo'li bilan"
                                className="border-none h-7 bg-transparent p-0  focus:ring-0 font-medium"
                            />
                        </span>
                        <span>(maksimal </span>
                        <span className="w-16 inline-block">
                             <MyInput
                                 control={control}
                                 type="number"
                                 name="payload.basic.max_duration_minutes"
                                 placeholder="120"
                                 className="border-none h-7 bg-transparent p-0 focus:ring-0 font-bold"
                             />
                        </span>
                        <span>daqiqagacha bo'lgan muddatga)</span>
                        <span className="font-semibold ">Vaqti:</span>
                        <span className="w-44 inline-block mr-5">
                             <MyTimePicker control={control} name="payload.basic.start_time"/>
                        </span>
                        <span>dan</span>
                        <span className="w-44 inline-block mr-5">
                             <MyTimePicker control={control} name="payload.basic.end_time"/>
                        </span>
                        <span>gacha (</span>
                        <span className="w-20 inline-block">
                            <MyInput
                                control={control}
                                name="payload.basic.timezone"
                                placeholder="UTC+5"
                                className="border-none h-7 bg-transparent p-0 focus:ring-0 font-mono text-sm"
                            />
                        </span>
                        <span>)</span>
                    </div>
                </div>
            </div>

            <hr className="my-8 border-gray-100"/>
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Hash className="w-5 h-5 text-indigo-600"/>
                        ID raqamlari
                    </h3>
                    <Button
                        type="button"
                        onClick={handleAddId}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-sm transition-all"
                    >
                        <Plus className="w-4 h-4"/>
                        Yangi ID qo'shish
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-indigo-300 transition-all group shadow-sm hover:shadow-md"
                        >
                            <div
                                className="bg-indigo-100 text-indigo-600 text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <MyInput
                                    control={control}
                                    name={`payload.flow_ids.${index}`}
                                    placeholder="ID0000000"
                                    className="border-none focus:ring-0 h-8 bg-transparent font-mono text-sm w-full"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                title="O'chirish"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </button>
                        </div>
                    ))}
                </div>

                {fields.length === 0 && (
                    <div
                        className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                        <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                            <Info className="w-6 h-6 text-gray-300"/>
                        </div>
                        <p className="text-gray-400 text-sm">Hali hech qanday ID kiritilmadi</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TelegraphPlannedWorkSection;