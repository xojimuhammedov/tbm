import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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

const ApplicationDocumentForm = () => {
  const [currentIds, setCurrentIds] = useState<string[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();
  const lastCheckedIds = useRef<Record<number, string>>({});

  const form = useForm<any>({
    defaultValues: {
      order_date: "",
      code: "",
      to: "",
      count: 0,
      rows: [],
    },
  });

  const { fields, replace, append, remove } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  const watchedRows = useWatch({
    control: form.control,
    name: "rows",
  });

  const incrementId = (base: string, index: number) => {
    const match = base.match(/(.*?)(\d+)$/);
    if (!match) return base;
    return `${match[1]}${Number(match[2]) + index}`;
  };

  const handleAddRow = () => {
    append({
      id_number: "",
      point_a: stationA || "",
      point_b: stationB || "",
      signal_level: "",
      portA: "",
      portB: "",
      id_exist: null,
    });
  };

  const handleRemoveRow = (index: number) => {
    remove(index);
  };

  const count = form.watch("count");
  const startId = form.watch("startId");
  const stationA = form.watch("point_a");
  const stationB = form.watch("point_b");

  const { mutate } = usePostQuery({
    listKeyId: KEYS.RH_Order_Application,
  });

  const onSubmit = (data: any) => {
    mutate(
      {
        url: URLS.RH_Order_Application,
        attributes: {
          delete: {
            flow_ids: currentIds,
          },
          ...data,
        },
      },
      {
        onSuccess: () => {
          form.reset();
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
    if (!count || !startId) return;

    const rows = Array.from({ length: count }).map((_, i) => ({
      id_number: incrementId(startId, i),
      point_a: stationA || "",
      point_b: stationB || "",
      signal_level: "",
      portA: "",
      portB: "",
      id_exist: null,
    }));

    replace(rows);

    rows.forEach((row, index) => {
      checkIdExist(row.id_number, index);
    });
  };

  useEffect(() => {
    fields.forEach((_, i) => {
      form.setValue(`rows.${i}.point_a`, stationA || "");
      form.setValue(`rows.${i}.point_b`, stationB || "");
    });
  }, [stationA, stationB]);

  const checkIdExist = async (id: string, index: number) => {
    if (!id) return;

    try {
      const res = await request.get(`/api/flows-id/${id}`);
      const json = await res.data;

      form.setValue(`rows.${index}.id_exist`, json?.data?.exist);
    } catch (e) {
      form.setValue(`rows.${index}.id_exist`, false);
    }
  };

  useEffect(() => {
    watchedRows?.forEach((row: any, index: any) => {
      if (!row?.id_number) return;

      // faqat o‘zgarganini tekshirish uchun
      if (row.id_number !== lastCheckedIds.current[index]) {
        lastCheckedIds.current[index] = row.id_number;
        checkIdExist(row.id_number, index);
      }
    });
  }, [watchedRows]);

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
            <div className="flex items-end">
              <span>SANA:</span>
              <MyInput
                name={"order_date"}
                control={form.control}
                className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
              />
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

          <div className="text-center mb-8">
            <p className="text-xl font-semibold underline">
              2Mbit/s oqimlarni tarmoqdan o‘chirish to‘g‘risida.
            </p>
          </div>

          <div className="text-lg leading-relaxed mb-10 text-justify">
            <p className="mb-4 flex flex-wrap items-end">
              “O‘zTTBRM” DUK mintaqaviy boshqaruv bog‘lamasining 2-oktabrdagi
              18-bildirgisiga binoan “O‘zbektelekom” G‘arbiy filialiga tegishli
              bo‘lgan quyidagi 51x2Mbit/s oqimlarni
              <MyInput
                name={"dead_line"}
                control={form.control}
                placeholder="Muddati"
                className="border border-t-0 border-l-0 border-r-0 rounded-none w-[240px]"
              />
              tarmoqdan o‘chirilganligi tasdiqlansin va texnologik hujjatlarga
              tegishli o‘zgartirishlar kiritilsin:
            </p>
            <DynamicIdInput
              onIdsChange={(ids) => {
                setCurrentIds(ids);
              }}
              initialIds={[]}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <MyInput
              control={form.control}
              name="point_a"
              placeholder="A-stansiya"
            />
            <MyInput
              control={form.control}
              name="point_b"
              placeholder="B-stansiya"
            />
            <MyInput control={form.control} name="count" placeholder="Count" />
            <MyInput
              control={form.control}
              name="startId"
              placeholder="Start ID (ID2345)"
            />
          </div>
          <div className="flex justify-end">
            <Button type="button" className="mt-4" onClick={handleGenerate}>
              Yaratish
            </Button>
          </div>

          {fields.map((field, index) => {
            const isLast = index === fields.length - 1;

            return (
              <div
                key={field.id}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 my-2 w-full items-center"
              >
                <MyInput
                  control={form.control}
                  name={`rows.${index}.id_number`}
                  placeholder="ID Number"
                  className={cn(
                    "border border-t-0 border-l-0 border-r-0 rounded-none",
                    form.watch(`rows.${index}.id_exist`) === true
                      ? "bg-red-100"
                      : "",
                  )}
                />

                <MyInput
                  control={form.control}
                  name={`rows.${index}.signal_level`}
                  placeholder="Signal level"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />

                <MyInput
                  control={form.control}
                  name={`rows.${index}.portA`}
                  placeholder="Port A"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none h-7"
                />

                <MyInput
                  control={form.control}
                  name={`rows.${index}.portB`}
                  placeholder="Port B"
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
