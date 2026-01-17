import { useFieldArray, Control, UseFormWatch } from "react-hook-form";
import { MyInput, MyDatePicker, MyTimePicker } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui";
import { Plus, Trash2, Calendar } from "lucide-react";

interface TvRvFlowSectionProps {
    control: Control;
    watch: UseFormWatch<any>;
}

const TvRvFlowSection = ({ control }: TvRvFlowSectionProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "payload.events",
    });

    const handleAddRow = () => {
        append({
            location: "",
            connection_spec: "",
            schedule: [
                {
                    date: new Date(),
                    duration: "Kun davomida",
                    event_type: "Jonli efir",
                },
            ],
        });
    };

    return (
        <div className="">
            <div className="">
                <h2 className="text-xl font-bold mb-6 text-center uppercase">
                    TV-RV chiqishlar to'g'risida
                </h2>
                <div className="mb-8 text-gray-800 leading-relaxed">
                    <MyInput
                        control={control}
                        name="payload.basic.organization_name"
                        placeholder="O'zbekiston milliy teleradiokompaniyasi"
                        className="inline-block w-[350px] border-t-0 border-l-0 border-r-0 rounded-none h-7 mx-1"
                    />
                    <span>ning</span>
                    <span className="inline-block mx-2 w-44">
                        <MyDatePicker control={control} name="payload.basic.request_date" />
                    </span>
                    <span>dagi</span>
                    <span className="inline-block mx-2 w-48">
                        <MyInput
                            control={control}
                            name="payload.basic.request_number"
                            placeholder="03-17-2434-son"
                            className="border-t-0 border-l-0 border-r-0 rounded-none h-7"
                        />
                    </span>
                    <span>xatiga muvofiq</span>
                    <MyInput
                        control={control}
                        name="payload.basic.justification"
                        placeholder="davlat ahamiyatiga ega, o'ta muhim tadbirlarni joylardan to'g'ridan-to'g'ri yoritish"
                        className="inline-block w-full border-t-0 border-l-0 border-r-0 rounded-none h-7 my-2"
                    />
                    <span>maqsadida</span>
                    <MyInput
                        control={control}
                        name="payload.basic.context"
                        placeholder="quyida keltirilgan manzil va Toshkent telemarkazi o'rtasida..."
                        className="inline-block w-full border-t-0 border-l-0 border-r-0 rounded-none h-7 my-2"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                                #
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                                Manzil
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                                Tezlik / Vlan / Internet
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                                Jadval (Sana, Vaqt, Maqsad)
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Amallar
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {fields.map((field, index) => (
                            <TvRvFlowRow
                                key={field.id}
                                index={index}
                                control={control}
                                onRemove={() => remove(index)}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <Button
                        type="button"
                        onClick={handleAddRow}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Yangi satr qo'shish
                    </Button>
                </div>
            </div>
        </div>
    );
};

interface TvRvFlowRowProps {
    index: number;
    control: Control;
    onRemove: () => void;
}

const TvRvFlowRow = ({ index, control, onRemove }: TvRvFlowRowProps) => {
    const {
        fields: scheduleFields,
        append: appendSchedule,
        remove: removeSchedule,
    } = useFieldArray({
        control,
        name: `payload.events.${index}.schedule`,
    });

    const handleAddSchedule = () => {
        appendSchedule({
            date: new Date(),
            duration: "Kun davomida",
            event_type: "Jonli efir",
        });
    };

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-3 border-r border-gray-300 text-sm text-gray-900 font-medium">
                {index + 1}
            </td>
            <td className="px-4 py-3 border-r border-gray-300">
                <MyInput
                    control={control}
                    name={`payload.events.${index}.location`}
                    placeholder="Manzilni kiriting"
                    className="w-full"
                />
            </td>
            <td className="px-4 py-3 border-r border-gray-300">
                <MyInput
                    control={control}
                    name={`payload.events.${index}.connection_spec`}
                    placeholder="50Mbit/s Vlan 38-53"
                    className="w-full"
                />
            </td>
            <td className="px-4 py-3 border-r border-gray-300">
                <div className="space-y-3">
                    {scheduleFields.map((scheduleField, scheduleIndex) => (
                        <div
                            key={scheduleField.id}
                            className="bg-gray-50 p-3 rounded-md border border-gray-200 space-y-2"
                        >
                            <div className="flex items-start gap-2">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                        <MyDatePicker
                                            control={control}
                                            name={`payload.events.${index}.schedule.${scheduleIndex}.date`}
                                            placeholder="Sanani tanlang"
                                            className="flex-1"
                                        />
                                    </div>
                                    <MyTimePicker
                                        control={control}
                                        name={`payload.events.${index}.schedule.${scheduleIndex}.duration`}
                                        className="w-full"
                                    />
                                    <MyInput
                                        control={control}
                                        name={`payload.events.${index}.schedule.${scheduleIndex}.event_type`}
                                        placeholder="Jonli efir"
                                        className="w-full"
                                    />
                                </div>
                                {scheduleFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSchedule(scheduleIndex)}
                                        className="text-red-500 hover:text-red-700 p-1 mt-1"
                                        title="Jadvalni o'chirish"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={handleAddSchedule}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors w-full justify-center"
                    >
                        <Plus className="w-3 h-3" />
                        Jadval qo'shish
                    </Button>
                </div>
            </td>
            <td className="px-4 py-3 text-center">
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 p-2 inline-flex items-center justify-center rounded-md hover:bg-red-50 transition-colors"
                    title="Satrni o'chirish"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
};

export default TvRvFlowSection;