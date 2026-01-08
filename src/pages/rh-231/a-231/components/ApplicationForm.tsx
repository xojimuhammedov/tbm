import {
  Form,
  MyDatePicker,
  MyInput,
  MySelect,
} from "dgz-ui-shared/components/form";
import { useMemo, useState } from "react";
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
  // const lastCheckedIds = useRef<Record<number, string>>({});

  const form = useForm<any>({
    shouldUnregister: false,
    defaultValues: {
      code: "",
      responsible: "",
      from: "TBM",
      to: "",
      count: "",
      dead_line: "",
      content:
        "tarmoqdan o‘chirilganligi tasdiqlansin va texnologik hujjatlarga tegishli o‘zgartirishlar kiritilsin:",
      signal_level: "",
      create: {
        flow_ids: [],
      },
      actions: [],
      action_type: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "create.flow_ids",
  });

  // const watchedRows = useWatch({
  //   control: form.control,
  //   name: "create.flow_ids",
  // });

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

  const onSubmit = (data: any) => {
    const payload = {
      code: data.code,
      order_date: data.order_date,
      responsible: data.responsible,
      from: data.from,
      to: data.to,
      count: data.count,
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
        flows_ids: currentIds,
      },
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

  // const checkIdExist = async (id: string, index: number) => {
  //   if (!id) return;

  //   try {
  //     const res = await request.get(`/api/flows-id/check-duplicate/${id}`);
  //     const json = await res.data;

  //     form.setValue(`create.flow_ids.${index}.id_exist`, json?.data?.exist);
  //   } catch (e) {
  //     form.setValue(`create.flow_ids.${index}.id_exist`, false);
  //   }
  // };

  // useEffect(() => {
  //   watchedRows?.forEach((row: any, index: any) => {
  //     if (!row?.code) return;
  //     if (row.code !== lastCheckedIds.current[index]) {
  //       lastCheckedIds.current[index] = row.code;
  //       checkIdExist(row.code, index);
  //     }
  //   });
  // }, [watchedRows]);

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
              “O'zbekiston telekommunikatsiya tarmoqlarini boshqarish respublika
              markazi” davlat unitar korxonasi
            </p>
            <p className="text-xs text-gray-600 mt-2">
              “Republican telecommunications management center of Uzbekistan”
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

          <div className="flex flex-wrap items-center gap-2">
            <p className="mb-4">
              “O‘zTTBRM” DUK mintaqaviy boshqaruv bog‘lamasining 2-oktabrdagi
              18-bildirgisiga binoan “O‘zbektelekom” G‘arbiy filialiga tegishli
              bo‘lgan quyidagi oqimlarni
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

          <div className="flex justify-end mt-4">
            <MySelect
              options={selectType}
              placeholder={t("Channel")}
              className="w-[290px]"
              control={form.control}
              name="actions"
              isMulti
            />
          </div>
          {form.watch("actions")?.includes("delete") && (
            <div className="mt-6 border p-4 rounded-xl">
              <DynamicIdInput
                onIdsChange={(ids) => {
                  setCurrentIds(ids);
                }}
                initialIds={[]}
              />
            </div>
          )}
          {form.watch("actions")?.includes("create") && (
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
