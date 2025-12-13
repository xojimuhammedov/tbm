import { Send, X } from "lucide-react";
import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { Button } from "dgz-ui/button";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import useApplicationDocumentForm from "@/pages/rtsi/application/hooks/useApplicationDocumentForm.ts";
import { ApplicationDto } from "@/pages/rtsi/application/schemas/createApplicationSchema.ts";

interface ApplicationDocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const ApplicationDocumentForm = ({
  id,
  onSave,
  onCancel,
}: ApplicationDocumentFormProps) => {
  const { t } = useTranslation();
  const { staffOptions } = useStaffOptions();
  const { form, handleSubmit } = useApplicationDocumentForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="py-6 px-4">
        <div className="max-w-5xl mx-auto px-2">
          <div className="rounded-lg shadow-sm border-2 p-8">
            <div className="text-center">
              <div className={"flex items-center justify-center"}>
                <p className="text-body-lg-semi-bold max-w-3xl">
                  {t(
                    "“O'zbektelekom” AK Janubi-G'arbiy filiali rejaga asosan ta'mirlash-sozlash ishlari olib\n" +
                      "borish uchun",
                  )}
                </p>
              </div>
              <div className={"flex items-center justify-center gap-2"}>
                <h2 className="text-lg font-semibold text-gray-800 mt-3">
                  {t("TALABNOMA")}
                </h2>
                <p className={"text-body-lg-semi-bold mt-3"}>{t("№")}</p>
                <MyInput<ApplicationDto>
                  control={form.control}
                  className={
                    "border border-t-0 border-l-0 border-r-0 rounded-none max-w-20 h-7 focus-visible:ring-0"
                  }
                  name="applicationNumber"
                />
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-2 px-2">
              <div className="flex items-center gap-2">
                <label className="mt-4">1. {t("Ish bajarish tartibi")}:</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="workProcedure"
                    placeholder={t(
                      "aloqani yopish /aloqani yopmaslik/qisqa muddatli to‘xtalish yo‘li bilan)",
                    )}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">2. {t("Sana va vaqt")}:</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="workDateTime"
                    placeholder={t("ishni bajarish. sana, oy, yil, soat, min.")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">3. {t("Stansiya / oraliq")}:</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="station"
                    placeholder={t("Magistral nomi, №AP")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">4. {t("NO raqami")}</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="noNumber"
                    placeholder={t("Liniya/trakt/qurilma")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">5. {t("AI-7, 9 kanallari")}:</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="aiChannels"
                    placeholder={t("Bor / yo'q")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">6. </label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="workReason"
                    placeholder={t("Ishni bajarish sababi")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">7.</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="workDescription"
                    placeholder={t("O‘tkaziladigan ishning to‘liq mazmuni")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">8. {t("KO xolati")}</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="koStatus"
                    placeholder={t("Xolati indeks va KO o‘zgartirilgan sana")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">9. {t("GOZ")}</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="bypassSchedule"
                    placeholder={t("Aylanib o‘tish va almashtirishlar grafigi")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">10. </label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="alternativeBackup"
                    placeholder={t("Zaxiralashning boshqa yo‘llari")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">11. {t("Boshqaruvchi")}: </label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="responsiblePerson"
                    placeholder={t("Ishni bajarilishiga javobgar shaxs")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">12. {t("Kelishildi")}: </label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="approvedByTechnicalDirector"
                    placeholder={t(
                      "MTRK”, “RTUM”, “O‘zbektelekom” AK  va filiallari  texnik rahbariyati",
                    )}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">13. {t("Kelishildi")}: </label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="approvedByLocalAI"
                    placeholder="AI-9 F.I.Sh. (Joylarda)"
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">14. Talabnoma tuzuvchi (AP)</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="orderAP"
                    placeholder="Talabnomaning sanasi, vaqti, raqami"
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">15. Talabnoma tuzuvchi (UBP)</label>
                <div className={"flex-1"}>
                  <MyInput<ApplicationDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="orderMBB"
                    placeholder="Sana, vaqt, imzo"
                  />
                </div>
              </div>
            </div>
          </div>

          <MySelect<ApplicationDto>
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
              Bekor qilish
            </Button>
            <Button type="submit">
              <Send className="size-4" />
              Yuborish
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ApplicationDocumentForm;
