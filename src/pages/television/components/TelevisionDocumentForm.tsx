import { PlusSquare, Send, Trash2, X } from "lucide-react";
import {
  Form,
  MyInput,
  MySelect,
  MyTextarea,
} from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import useTelevisionDocumentForm from "@/pages/television/hooks/useTelevisionDocumentForm.ts";
import { TelevisionDto } from "@/pages/television/schemas/createTelevisionSchema.ts";
import { Button } from "dgz-ui/button";
import FilePondComponent from "@/shared/components/atoms/file-upload/FilePondComponent.tsx";
import { get } from "lodash";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";

const TelevisionDocumentForm = ({
  id,
  onSave,
  onCancel,
}: {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}) => {
  const { t } = useTranslation();
  const { staffOptions } = useStaffOptions();
  const { form, fields, addNewRow, removeRow, handleSubmit } =
    useTelevisionDocumentForm({ id, onSave });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="rounded-lg shadow-sm border-2 p-8">
            <div className="border-b-2 border-gray-500 p-6 flex items-center justify-center">
              <div className="flex items-center justify-between w-full max-w-[900px]">
                <div className="text-center max-w-[250px]">
                  <span className="text-body-md-regular">
                    {t("O'ZBEKISTON MILLIY TELERADIOKOMPANIYASI")}
                  </span>
                </div>

                <div className="flex justify-center">
                  <img src="/images/gerb.png" alt="Gerb" width={80} />
                </div>

                <div className="text-center max-w-[250px]">
                  <span className="text-body-md-regular">
                    {t("NATIONAL TELEVISION AND RADIO COMPANY OF UZBEKISTAN")}
                  </span>
                </div>
              </div>
            </div>

            <div className={"flex items-center justify-between mt-3"}>
              <div className={"max-w-[320px]"}>
                <div className="text-body-xs-regular">
                  100011. Toshkent shahar, Navoiy ko'chasi, 69 tel.:(998 71)
                  214-12-50, 214-13-00 faks: (995 71) 214-17-50
                </div>
                <div className={"flex gap-2"}>
                  <a
                    className={"text-body-xs-regular text-blue-500"}
                    href={"https://www.mtrk.uz/uz/"}
                    target={"_blank"}
                  >
                    www.mtrk.uz
                  </a>
                  <a
                    className={"text-body-xs-regular text-blue-500"}
                    href={"https://www.mtrk.uz/uz/"}
                    target={"_blank"}
                  >
                    mtrk@exat.uz
                  </a>
                </div>
              </div>
              <div className={"max-w-[310px]"}>
                <div className="text-body-xs-regular">
                  69, Navoi street, 100011, Tashkemt, Uzbekistan tel.: (998 71)
                  214-12-50, 214-13-00 fax: (998 71) 214-17-50
                </div>
                <div className={"flex gap-2 justify-end"}>
                  <a
                    className={"text-body-xs-regular text-blue-500"}
                    href={"https://www.mtrk.uz/uz/"}
                    target={"_blank"}
                  >
                    www.mtrk.uz
                  </a>
                  <a
                    className={"text-body-xs-regular text-blue-500"}
                    href={"https://www.mtrk.uz/uz/"}
                    target={"_blank"}
                  >
                    mtrk@exat.uz
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-col gap-1">
                <p className="text-body-md-regular">22 avgust 2025 yil</p>
                <MyInput<TelevisionDto>
                  control={form.control}
                  name="title"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-6 focus-visible:ring-0 w-40"
                  placeholder={t("Ariza raqami")}
                />
              </div>

              <div className="flex justify-end text-center mt-4">
                <span className="text-body-md-regular max-w-[280px]">
                  {t(
                    "«O'zbektelekom» aksiyadorlik\n" +
                      "kompaniyasi» бошкарув раиси",
                  )}
                </span>
              </div>

              <div className="flex items-center justify-end text-center">
                <MyInput<TelevisionDto>
                  control={form.control}
                  name="chairman"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-6 focus-visible:ring-0"
                  placeholder={t("Yozish joyi")}
                />
                <span className="text-body-md-regular">ga</span>
              </div>

              <div className="flex justify-end text-center mt-5">
                <span className="text-body-md-regular max-w-[280px]">
                  {t(
                    "«O'zbekiston telekommunikatsiya\n" +
                      "tarmoqlarini boshqarish respublika\n" +
                      "markazi» ДУК директори\n",
                  )}
                </span>
              </div>

              <div className="flex items-center justify-end text-center">
                <MyInput<TelevisionDto>
                  control={form.control}
                  name="director"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-6 focus-visible:ring-0"
                  placeholder={t("Yozish joyi")}
                />
                <span className="text-body-md-regular">ga</span>
              </div>

              {/* Main Text with Inputs */}
              <div className="text-justify mt-6 space-y-3">
                <span className="text-body-md-regular">
                  {t(
                    "Yurtimizda bo'layotgan davlat ahamiyatga ega, o'ta muhim tadbirlarni joylardan to'g'ridan - to'g'ri yoritish maqsadida Sizdan, quyida keltirilgan manzillar Toshkent telemarkazi o'rtasida ko'rsatilgan tezliklardagi",
                  )}
                </span>

                <MyInput<TelevisionDto>
                  control={form.control}
                  name="text1"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0"
                  placeholder={t("Yozish joyi")}
                />

                <span className="text-body-md-regular">
                  {t(
                    " tashkil etish, shuningdek, Samarkand viloyat teleradiokanali xamda Toshkent telemarkazi oraligidagi mavjud",
                  )}
                </span>

                <MyInput<TelevisionDto>
                  control={form.control}
                  name="text2"
                  className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0"
                  placeholder={t("Yozish joyi")}
                />

                <div className="flex items-center gap-4">
                  <span className="text-body-md-regular">
                    {t("kanal tezligini")}
                  </span>
                  <div className="flex-1">
                    <MyInput<TelevisionDto>
                      control={form.control}
                      name="speed"
                      className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0"
                      placeholder={t("Yozish joyi")}
                    />
                  </div>
                  <span className="text-body-md-regular">ga</span>
                </div>

                <span className="text-body-md-regular">
                  {t(
                    " kutarish yuzasidan «O‘ zbektelekom» AKning tegishli filiallariga kursatmalar berishingizni suraymiz.",
                  )}
                </span>
              </div>

              {/* Dynamic Table */}
              <div className="mt-6">
                <div className="overflow-x-auto">
                  <div className="space-y-2">
                    {fields.map((row, index) => (
                      <div
                        key={row.id}
                        className="grid grid-cols-12 gap-2 items-center"
                      >
                        <div className="col-span-3">
                          <MyInput<TelevisionDto>
                            control={form.control}
                            name={`documents.${index}.address`}
                            placeholder={t("Manzil yoki ma'lumot kiriting")}
                            className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0"
                          />
                        </div>
                        <div className="col-span-2">
                          <MyInput<TelevisionDto>
                            control={form.control}
                            name={`documents.${index}.speed_and_type`}
                            placeholder={t("Ma'lumot")}
                            className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0"
                          />
                        </div>
                        <div className="col-span-3">
                          <MyInput<TelevisionDto>
                            control={form.control}
                            name={`documents.${index}.date`}
                            placeholder={t("Ma'lumot")}
                            className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0"
                          />
                        </div>
                        <div className="col-span-2">
                          <MyInput<TelevisionDto>
                            control={form.control}
                            name={`documents.${index}.duration`}
                            placeholder={t("Ma'lumot")}
                            className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0"
                          />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <MyInput<TelevisionDto>
                            control={form.control}
                            name={`documents.${index}.type`}
                            placeholder={t("Ma'lumot")}
                            className="border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0"
                          />
                          {fields.length > 1 && (
                            <Trash2
                              className={"cursor-pointer"}
                              size={40}
                              color={"red"}
                              onClick={() => removeRow(index)}
                            />
                          )}
                          <PlusSquare
                            className={"cursor-pointer"}
                            size={40}
                            color={"blue"}
                            onClick={addNewRow}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"mt-6"}>
            <FilePondComponent
              labelIdle={"Qo'shimcha biriktrilgan fayllar..."}
              allowProcess={false}
              instantUpload
              maxFiles={1}
              docType={"f56"}
              onFinishUpload={(result) => {
                form.setValue("files", [`${get(result, "path")}`]);
              }}
            />
          </div>

          <MyTextarea<TelevisionDto>
            className={"min-h-[150px]"}
            control={form.control}
            name={"description"}
            placeholder={"Izoh..."}
          />

          <MySelect<TelevisionDto>
            control={form.control}
            name={"recipientIds"}
            options={staffOptions || []}
            label={t("Yuboriladigan xodimlar")}
            placeholder={t("Select staffs")}
            isClearable
            required
            isMulti
          />

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button type="button" variant="secondary" onClick={onCancel}>
              <X className="size-4" />
              {t("Bekor qilish")}
            </Button>
            <Button type="submit">
              <Send className="size-4" />
              {t("Yuborish")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default TelevisionDocumentForm;
