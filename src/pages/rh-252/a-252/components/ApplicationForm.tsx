import {
  Form,
  MyDatePicker,
  MyInput,
  MySelect,
} from "dgz-ui-shared/components/form";
import { useMemo, useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import KEYS from "@/shared/constants/keys";
import usePostQuery from "@/shared/hooks/query/usePostQuery";
import { useToast } from "@/shared/hooks/useToast";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import URLS from "@/shared/constants/urls";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button, cn } from "dgz-ui";
import { ArrowLeftIcon, PlusSquare, Trash2 } from "lucide-react";
import { request } from "@/request";
import DynamicIdInput from "./DynamicDeleteInput";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions";
import { useNavigate } from "react-router-dom";
import { useFlowValidation } from "@/pages/rh-252/a-252/hooks/useCheckForm.tsx";

export const selectType = [
  {
    id: 1,
    label: "Tashkil etish",
    value: "create",
  },
  {
    id: 2,
    label: "O'chirish",
    value: "delete",
  },
  {
    id: 3,
    label: "Ko'chirish",
    value: "update",
  },
];

const ApplicationDocumentForm = () => {
  const [currentIds, setCurrentIds] = useState<string[]>([]);
  const { staffOptions } = useStaffOptions();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const form = useForm<any>({
    shouldUnregister: false,
    defaultValues: {
      code: "",
      original_num: "",
      responsible: "",
      from: "TBM",
      to: "",
      count: "",
      dead_line: "",
      content:
        "tarmoqdan o'chirilganligi tasdiqlansin va texnologik hujjatlarga tegishli o'zgartirishlar kiritilsin:",
      signal_level: "",
      create: {
        flow_ids: [],
      },
      action_type: [],
      update: {
        update_type: "",
        flow_ids: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
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

  const currentUpdateType = form.watch("update.update_type");

  // Use validation hook
  const { getValidationClass, getOriginalNumValidationClass, clearValidation } =
    useFlowValidation({
      control: form.control,
      updateType: currentUpdateType,
    });

  // clear
  useEffect(() => {
    const currentFlows = form.getValues("update.flow_ids");
    if (currentFlows && currentFlows.length > 0) {
      const clearedFlows = currentFlows.map(() => {
        if (currentUpdateType === "channels") {
          return { id_or_channel: "", new_id_or_channel: "" };
        } else {
          return {
            id_or_channel: "",
          };
        }
      });
      form.setValue("update.flow_ids", clearedFlows);
    }
    clearValidation();
  }, [currentUpdateType, form]);

  const handleAddUpdateRow = () => {
    if (currentUpdateType === "channels") {
      appendUpdate({ id_or_channel: "", new_id_or_channel: "" });
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

  const handleRemoveRow = (index: number) => {
    remove(index);
  };

  const count = form.watch("count");
  const stationA = form.watch("point_a");
  const stationB = form.watch("point_b");

  const { mutate } = usePostQuery({
    listKeyId: KEYS.RH_Order_Application,
  });

  const updateTypeOptions = [
    { label: "Channels", value: "channels" },
    { label: "Flows", value: "flows" },
  ];

  const onSubmit = (data: any) => {
    const updatePayload: any = {};
    if (data.update?.flow_ids?.length > 0) {
      const channels = data.update.flow_ids
        .filter((item: any) => item.update_type === "channels")
        .map((item: any) => ({
          old: item.id_or_channel,
          new: item.new_id_or_channel,
        }));

      const flows = data.update.flow_ids
        .filter((item: any) => item.update_type === "flows")
        .map((item: any) => ({
          code: item.id_or_channel,
          point_a: item.point_a,
          point_b: item.point_b,
          device_a: item.device_a,
          device_b: item.device_b,
          port_a: item.port_a,
          port_b: item.port_b,
        }));

      if (channels.length > 0) updatePayload.channels = channels;
      if (flows.length > 0) updatePayload.flows = flows;
    }
    const payload = {
      code: data.code,
      original_num: data.original_num,
      order_date: data.order_date,
      responsible: data.responsible,
      from: data.from,
      to: data.to,
      count: data.count ? Number(data.count) : 0,
      dead_line: data.dead_line,
      action_type: data.action_type,
      signal_level: data.signal_level,
      content: data.content,

      create: {
        flow_ids: data.create?.flow_ids?.map(
          ({ id_exist, ...rest }: any) => rest,
        ),
      },
      delete: {
        elements: currentIds,
      },
      update: updatePayload,
    };
    mutate(
      {
        url: URLS.RH_Order_Application,
        attributes: payload,
      },
      {
        onSuccess: () => {
          form.reset();
          navigate("/rh-252/a-252");
          toast({
            variant: "success",
            title: t(`Success`),
            description: t(`Application created successfully`),
          });
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: t(`${get(error, "response.statusText", "Error")}`),
            description: t(
              `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
            ),
          });
        },
      },
    );
  };

  const handleGenerate = async () => {
    if (!count || Number(count) <= 0) return;

    try {
      const res = await request.get(
        `/api/flows-id/empty-id-numbers?count=${count}`,
      );
      const result = await res.data;

      const ids: string[] = result.data || [];

      const rows = Array.from({ length: count }).map((_, i) => ({
        code: ids[i] || "",
        point_a: stationA || "",
        point_b: stationB || "",
        signal_level: "",
        port_a: "",
        port_b: "",
        device_a: "",
        device_b: "",
        id_exist: null,
      }));

      append(rows);
    } catch (error) {
      console.error("ID generate error:", error);
    }
  };

  const actionOptions = useMemo(
    () => [
      { label: "Tashkil etish", value: "create" },
      { label: "Ko'chirish", value: "update" },
      { label: "O'chirish", value: "delete" },
    ],
    [],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <div className="p-8 bg-white shadow-lg text-black">
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
              <MyDatePicker name={"order_date"} control={form.control} />
            </div>
            <div>
              <MyInput
                name={"code"}
                control={form.control}
                placeholder="Farmoyish nomeri"
                className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
              />
            </div>
            <div className="font-bold">SONI:1</div>
          </div>

          {/* New Original Number Input */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-2">Hujjat raqami:</p>
            <MyInput
              name={"original_num"}
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
              name={"to"}
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
            <MyDatePicker name={"dead_line"} control={form.control} />
            <div className="w-full">
              <MyInput
                control={form.control}
                name={`content`}
                className="border border-t-0 border-l-0 border-r-0 rounded-none h-7 w-full"
              />
            </div>
          </div>

          {form.watch("action_type")?.includes("update") && (
            <div className="mt-6 flex flex-col gap-4 border p-4 rounded-xl ">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-bold text-lg">Ko'chirish (Update)</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600">
                    Turini tanlang:
                  </span>
                  <MySelect
                    control={form.control}
                    name="update.update_type"
                    options={updateTypeOptions}
                    placeholder="Turini tanlang"
                    className="w-48"
                  />
                </div>
              </div>

              {updateFields.length > 0 && (
                <div
                  className={cn(
                    "grid gap-2 px-2 font-semibold text-xs text-gray-500",
                    currentUpdateType === "channels"
                      ? "grid-cols-[1fr_1fr_40px]"
                      : "grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr_40px]",
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
                    </>
                  )}
                  <div></div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {updateFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    {currentUpdateType === "channels" ? (
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.id_or_channel`}
                          placeholder="ID01/1"
                          className={cn(
                            getValidationClass(index, "id_or_channel"),
                          )}
                        />
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.new_id_or_channel`}
                          placeholder="ID0168/1"
                          className={cn(
                            getValidationClass(index, "new_id_or_channel"),
                          )}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.8fr_0.8fr] gap-2 flex-1">
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.id_or_channel`}
                          placeholder="Code"
                          className={cn(
                            "h-9 text-xs",
                            getValidationClass(index, "id_or_channel"),
                          )}
                        />
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.point_a`}
                          placeholder="Point A"
                          className="h-9 text-xs"
                        />
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.point_b`}
                          placeholder="Point B"
                          className="h-9 text-xs"
                        />
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.device_a`}
                          placeholder="Device A"
                          className="h-9 text-xs"
                        />
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.device_b`}
                          placeholder="Device B"
                          className="h-9 text-xs"
                        />
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.port_a`}
                          placeholder="Port A"
                          className="h-9 text-xs"
                        />
                        <MyInput
                          control={form.control}
                          name={`update.flow_ids.${index}.port_b`}
                          placeholder="Port B"
                          className="h-9 text-xs"
                        />
                      </div>
                    )}

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeUpdate(index)}
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
                className="w-fit gap-2 mt-2"
                onClick={handleAddUpdateRow}
              >
                <PlusSquare size={18} /> Qator qo'shish
              </Button>
            </div>
          )}

          {form.watch("action_type")?.includes("delete") && (
            <div className="mt-6 border p-4 my-2 rounded-xl">
              <DynamicIdInput
                onIdsChange={(ids) => {
                  setCurrentIds(ids);
                }}
                initialIds={[]}
              />
            </div>
          )}

          {form.watch("action_type")?.includes("create") && (
            <div className="mt-6 border p-4 rounded-lg">
              <h3 className="font-semibold mb-2 mt-4">Tashkil etish</h3>
              <div className="grid grid-cols-4 gap-4">
                <MyInput
                  control={form.control}
                  name={`point_a`}
                  placeholder="A-stansiya"
                />
                <MyInput
                  control={form.control}
                  name={`point_b`}
                  placeholder="B-stansiya"
                />
                <MyInput
                  control={form.control}
                  name={`count`}
                  placeholder="Count"
                />
              </div>
              <div className="flex justify-end">
                <Button type="button" className="mt-4" onClick={handleGenerate}>
                  Yaratish
                </Button>
              </div>
            </div>
          )}

          {fields.map((field, index) => {
            const isLast = index === fields.length - 1;
            return (
              <div
                key={field.id}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 my-2 w-full items-center"
              >
                <MyInput
                  control={form.control}
                  name={`create.flow_ids.${index}.signal_level`}
                  placeholder="Signal level"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />
                <MyInput
                  control={form.control}
                  name={`create.flow_ids.${index}.code`}
                  placeholder="ID Number"
                  className={cn(
                    "border border-t-0 border-l-0 border-r-0 rounded-none h-7",
                    form.watch(`create.flow_ids.${index}.id_exist`) === true
                      ? "bg-red-100"
                      : "",
                  )}
                />
                <MyInput
                  control={form.control}
                  name={`create.flow_ids.${index}.point_a`}
                  placeholder="Point A"
                  className={
                    "border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                  }
                />
                <MyInput
                  control={form.control}
                  name={`create.flow_ids.${index}.port_a`}
                  placeholder="Port A"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />
                <MyInput
                  control={form.control}
                  name={`create.flow_ids.${index}.device_a`}
                  placeholder="Device A"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />
                <MyInput
                  control={form.control}
                  name={`create.flow_ids.${index}.point_b`}
                  placeholder="Point B"
                  className={
                    "border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                  }
                />
                <MyInput
                  control={form.control}
                  name={`create.flow_ids.${index}.port_b`}
                  placeholder="Port B"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />
                <MyInput
                  control={form.control}
                  name={`create.flow_ids.${index}.device_b`}
                  placeholder="Device B"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />
                <div className="flex gap-2">
                  {isLast && (
                    <PlusSquare
                      className={"cursor-pointer"}
                      size={24}
                      color={"blue"}
                      onClick={handleAddRow}
                    />
                  )}

                  <Trash2
                    className={"cursor-pointer"}
                    size={24}
                    color={"red"}
                    onClick={() => handleRemoveRow(index)}
                  />
                </div>
              </div>
            );
          })}

          <MySelect
            control={form.control}
            name={"responsible"}
            options={staffOptions || []}
            label={t("Yuboriladigan xodimlar")}
            placeholder={t("Select staffs")}
            isClearable
            required
          />
        </div>

        <FormContainerFooter>
          <Button size={"sm"} variant={"ghost"} type={"button"}>
            <ArrowLeftIcon />
            {t("Back")}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default ApplicationDocumentForm;
