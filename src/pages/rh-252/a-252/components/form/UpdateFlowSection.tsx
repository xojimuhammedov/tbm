import { MyInput, MySelect } from "dgz-ui-shared/components/form";
import { Button, cn } from "dgz-ui";
import { Plus, Trash2 } from "lucide-react";
import { Control, FieldArrayWithId } from "react-hook-form";

interface UpdateFlowSectionProps {
    control: Control<any>;
    fields: FieldArrayWithId<any, "payload.update.flow_ids", "id">[];
    currentUpdateType: string;
    onAddRow: () => void;
    onRemoveRow: (index: number) => void;
    getValidationClass: (index: number, field: string) => string;
}

const UpdateFlowSection = ({
                               control,
                               fields,
                               currentUpdateType,
                               onAddRow,
                               onRemoveRow,
                               getValidationClass,
                           }: UpdateFlowSectionProps) => {
    const updateTypeOptions = [
        { label: "Channels", value: "channels" },
        { label: "Flows", value: "flows" },
    ];

    return (
        <div className="mt-6 flex flex-col gap-4 border p-4 rounded-xl">
            <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-bold text-lg">Ko'chirish (Update)</h3>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">
                        Turini tanlang:
                    </span>
                    <MySelect
                        control={control}
                        name="payload.update.update_type"
                        options={updateTypeOptions}
                        placeholder="Turini tanlang"
                        className="w-48"
                    />
                </div>
            </div>

            {fields.length > 0 && (
                <div
                    className={cn(
                        "grid gap-2 px-2 font-semibold text-xs text-gray-500",
                        currentUpdateType === "channels"
                            ? "grid-cols-[1fr_1fr_40px]"
                            : "grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr_1fr_40px]",
                    )}
                >
                    {currentUpdateType === "channels" ? (
                        <>
                            <div>Eski (Old)</div>
                            <div>Yangi (New)</div>
                        </>
                    ) : (
                        <>
                            <div>Code</div>
                            <div>Point A</div>
                            <div>Point B</div>
                            <div>Device A</div>
                            <div>Device B</div>
                            <div>Port A</div>
                            <div>Port B</div>
                            <div>Signal Level</div>
                        </>
                    )}
                    <div></div>
                </div>
            )}

            <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                        {currentUpdateType === "channels" ? (
                            <div className="grid grid-cols-2 gap-2 flex-1">
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.old`}
                                    placeholder="ID01/1"
                                    className={cn(getValidationClass(index, "old"))}
                                />
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.new`}
                                    placeholder="ID0168/1"
                                    className={cn(getValidationClass(index, "new"))}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr_1fr] gap-2 flex-1">
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.code`}
                                    placeholder="Code"
                                    className={cn(
                                        "h-9 text-xs",
                                        getValidationClass(index, "code"),
                                    )}
                                />
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.point_a`}
                                    placeholder="Point A"
                                    className="h-9 text-xs"
                                />
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.point_b`}
                                    placeholder="Point B"
                                    className="h-9 text-xs"
                                />
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.device_a`}
                                    placeholder="Device A"
                                    className="h-9 text-xs"
                                />
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.device_b`}
                                    placeholder="Device B"
                                    className="h-9 text-xs"
                                />
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.port_a`}
                                    placeholder="Port A"
                                    className="h-9 text-xs"
                                />
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.port_b`}
                                    placeholder="Port B"
                                    className="h-9 text-xs"
                                />
                                <MyInput
                                    control={control}
                                    name={`payload.update.flow_ids.${index}.signal_level`}
                                    placeholder="Signal"
                                    className="h-9 text-xs"
                                />
                            </div>
                        )}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveRow(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                ))}
            </div>

            <Button
                type="button"
                variant="secondary"
                className="w-fit mt-2 flex items-center gap-2 border-dashed border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
                onClick={onAddRow}
                size="sm"
            >
                <Plus size={16} /> Qator qo'shish
            </Button>
        </div>
    );
};

export default UpdateFlowSection;