import {
    Form,
    MyDatePicker,
    MyInput,
    MySelect,
} from "dgz-ui-shared/components/form";
import {useMemo} from "react";
import {useFieldArray} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {FormContainerFooter} from "@/shared/components/templates/form";
import {Button, cn} from "dgz-ui";
import {ArrowLeftIcon} from "lucide-react";
import DynamicIdInput from "./DynamicDeleteInput";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions";
import useApplicationDocumentForm from "@/pages/rh-252/a-252/hooks/useApplicationDocumentForm";
import UpdateFlowSection from "@/pages/rh-252/a-252/components/form/UpdateFlowSection.tsx";
import CreateFlowSection from "@/pages/rh-252/a-252/components/form/ CreateFlowSection.tsx";


const ApplicationDocumentForm = () => {
    const {staffOptions} = useStaffOptions();
    const {t} = useTranslation();

    const {
        form,
        handleSubmit,
        handleGenerate,
        setCurrentIds,
        getValidationClass,
        getOriginalNumValidationClass,
        currentUpdateType,
    } = useApplicationDocumentForm({});

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "create.flow_ids",
    });

    const {
        fields: updateFields,
        append: appendUpdate,
        remove: removeUpdate,
    } = useFieldArray({
        control: form.control,
        name: "update.flow_ids",
    });

    const handleAddUpdateRow = () => {
        if (currentUpdateType === "channels") {
            appendUpdate({id_or_channel: "", new_id_or_channel: ""});
        } else {
            appendUpdate({
                id_or_channel: "",
                point_a: "",
                point_b: "",
                device_a: "",
                device_b: "",
                port_a: "",
                port_b: "",
            });
        }
    };

    const handleAddRow = () => {
        const stationA = form.watch("point_a");
        const stationB = form.watch("point_b");
        append({
            code: "",
            point_a: stationA || "",
            point_b: stationB || "",
            port_a: "",
            port_b: "",
            device_a: "",
            device_b: "",
            signal_level: "",
            organization_order_number: "",
            deciphering_order_number: "",
            deciphering_archive: "",
            organization_archive: "",
            note: "",
            id_exist: null,
        });
    };

    const handleGenerateClick = async () => {
        const rows = await handleGenerate();
        if (rows && rows.length > 0) {
            append(rows);
        }
    };

    const actionOptions = useMemo(
        () => [
            {label: "Tashkil etish", value: "create"},
            {label: "Ko'chirish", value: "update"},
            {label: "O'chirish", value: "delete"},
        ],
        [],
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} action="">
                <div className="p-8 bg-white shadow-lg text-black">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <p className="text-xs mb-2">
                            IDRO.GOV.UZ tizimi orqali ЭРИ bilan tasdiqlangan, Xujjat kodi:
                            XE03887284
                        </p>
                        <div className="flex justify-center items-center gap-8">
                            <div className="text-6xl font-bold tracking-wider">TBM</div>
                        </div>
                        <p className="text-sm mt-4 italic">
                            "O'zbekiston telekommunikatsiya tarmoqlarini boshqarish respublika
                            markazi" davlat unitar korxonasi
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                            "Republican telecommunications management center of Uzbekistan"
                            government unitary enterprise
                        </p>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold uppercase">Farmoyishi</h1>
                    </div>

                    <div className="flex justify-between items-center mb-8 text-lg">
                        <div className="flex items-center gap-2">
                            <span>SANA:</span>
                            <MyDatePicker name="order_date" control={form.control}/>
                        </div>
                        <div>
                            <MyInput
                                name="code"
                                control={form.control}
                                placeholder="Farmoyish nomeri"
                                className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                            />
                        </div>
                        <div className="font-bold">SONI:1</div>
                    </div>

                    <div className="mb-8">
                        <p className="text-sm font-semibold mb-2">Hujjat raqami:</p>
                        <MyInput
                            name="original_num"
                            control={form.control}
                            placeholder="UBP-10975"
                            className={cn(
                                "border border-t-0 border-l-0 border-r-0 rounded-none h-9",
                                getOriginalNumValidationClass(),
                            )}
                        />
                    </div>

                    <div className="mb-8 text-lg">
                        <p>
                            <strong>Kimga:</strong>
                        </p>
                        <MyInput
                            name="to"
                            control={form.control}
                            className="border border-t-0 border-l-0 border-r-0 rounded-none"
                        />
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <MyInput
                            control={form.control}
                            placeholder="Signal level"
                            name="signal_level"
                            className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                        />
                        <p className="text-xl font-semibold">oqimlarni tarmoqdan</p>
                        <div className="w-[380px] text-left">
                            <MySelect
                                control={form.control}
                                name="action_type"
                                options={actionOptions}
                                placeholder={t("Tanlang...")}
                                isClearable
                                isMulti
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 my-8">
                        <p className="mb-4">
                            "O'zTTBRM" DUK mintaqaviy boshqaruv bog'lamasining 2-oktabrdagi
                            18-bildirgisiga binoan "O'zbektelekom" G'arbiy filialiga tegishli
                            bo'lgan quyidagi oqimlarni
                        </p>
                        <MyDatePicker name="dead_line" control={form.control}/>
                        <div className="w-full">
                            <MyInput
                                control={form.control}
                                name="content"
                                className="border border-t-0 border-l-0 border-r-0 rounded-none h-7 w-full"
                            />
                        </div>
                    </div>

                    {form.watch("action_type")?.includes("update") && (
                        <UpdateFlowSection
                            control={form.control}
                            fields={updateFields}
                            currentUpdateType={currentUpdateType}
                            onAddRow={handleAddUpdateRow}
                            onRemoveRow={removeUpdate}
                            getValidationClass={getValidationClass}
                        />
                    )}

                    {form.watch("action_type")?.includes("delete") && (
                        <div className="mt-6 border p-4 my-2 rounded-xl">
                            <DynamicIdInput
                                onIdsChange={(ids) => setCurrentIds(ids)}
                                initialIds={[]}
                            />
                        </div>
                    )}

                    {form.watch("action_type")?.includes("create") && (
                        <CreateFlowSection
                            control={form.control}
                            fields={fields}
                            onAddRow={handleAddRow}
                            onRemoveRow={remove}
                            onGenerate={handleGenerateClick}
                            watch={form.watch}
                        />
                    )}

                    <MySelect
                        control={form.control}
                        name="responsible"
                        options={staffOptions || []}
                        label={t("Yuboriladigan xodimlar")}
                        placeholder={t("Select staffs")}
                        isClearable
                        required
                    />
                </div>

                <FormContainerFooter>
                    <Button size="sm" variant="ghost" type="button">
                        <ArrowLeftIcon/>
                        {t("Back")}
                    </Button>
                </FormContainerFooter>
            </form>
        </Form>
    );
};

export default ApplicationDocumentForm;