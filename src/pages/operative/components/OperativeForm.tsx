import { Send, X } from "lucide-react";
import {
  Form,
  MyInput,
  MySelect,
  MyTextarea,
} from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { Button } from "dgz-ui/button";
import FilePondComponent from "@/shared/components/atoms/file-upload/FilePondComponent.tsx";
import { get } from "lodash";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import useOperativeDocumentForm from "@/pages/operative/hooks/useOperativeDocumentForm.ts";
import { OperativeDto } from "@/pages/operative/schemas/createOperativeSchema.ts";

interface OperativeDocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const OperativeDocumentForm = ({
  id,
  onSave,
  onCancel,
}: OperativeDocumentFormProps) => {
  const { t } = useTranslation();
  const { staffOptions } = useStaffOptions();
  const { form, handleSubmit } = useOperativeDocumentForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="py-6 px-4">
        <div className="max-w-5xl mx-auto px-2">
          <div className="rounded-lg shadow-sm border-2 p-8">
            <div className="flex justify-end">
              <MyInput<OperativeDto>
                className={"border-none rounded-none w-48"}
                required
                control={form.control}
                name={"title"}
                placeholder={t("RH 45-232/2012")}
              />
            </div>

            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                D ilova
              </h2>
              <p className="text-gray-600 mb-3">(Majburiy)</p>
              <p className="text-body-lg-regular">
                Tezkor ta’mirlash-sozlash ishlarini o’tkazish uchun
                <br />
                talabnomani taqdim etish shakli
              </p>
            </div>

            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-4 mb-3">
                <div className="">
                  <MyInput<OperativeDto>
                    required
                    control={form.control}
                    size={4}
                    className={
                      "flex-1 border border-t-0 border-l-0 border-r-0 rounded-none h-6"
                    }
                    name="UbpNumber"
                    placeholder={t("Raqam")}
                  />
                </div>
                <div className="mt-2"> UBPdan</div>
              </div>
              <div className="mb-1">
                tezkor ta’mirlash-sozlash ishlarini o’tkazish uchun
              </div>
              <div className="flex justify-center items-center gap-4 mb-3">
                <MyInput<OperativeDto>
                  required
                  control={form.control}
                  size={4}
                  className={
                    "border border-t-0 border-l-0 border-r-0 rounded-none h-6"
                  }
                  name="applicationNumber"
                />
                <div className="mt-2"> - son TALABNOMA</div>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-2 px-2">
              <div className="flex items-center gap-2">
                <label className="mt-4">1. Ishlarni o'tkazish shartlari:</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="workConditions"
                    placeholder={t("Yopib / yopmasdan / QBT bilan")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">2. Sana va vaqt:</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="date"
                    placeholder={t(
                      "Ishlarni o'tkazish sanasi, oyi, yili, soati, minuti",
                    )}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">3. Uchastka, stansiyalar</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="magistralName"
                    placeholder={t("Magistral nomi, AP nomeri")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">4. NO nomeri</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="NoNumber"
                    placeholder={t(
                      "O’tkazish liniyasi, liniya / guruh trantor va hk",
                    )}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">5. Al-9 kanallari</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="ai9Channels"
                    placeholder={t("Bor / yo'q")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">6. </label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="reasonJob"
                    placeholder={t("Ishni bajarish sababi")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">7.</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="jobDescription"
                    placeholder={t("Bajarilayotgan ishlar xususiyati")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">8. NO holati</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="NOStatus"
                    placeholder={t("Bajarilayotgan ishlar xususiyati")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">9. AAG</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="aag"
                    placeholder={t("Bajarilayotgan ishlar xususiyati")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">10.</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="reservation"
                    placeholder={t("Rezervlashning boshqa usuli")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">11. Rahbar stantsiyasi</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="responsiblePerson"
                    placeholder={t("Ishlarni o’tkazish uchun javobgar shaxs")}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">12. Kelishilgan</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="headOfTheEnterprise"
                    placeholder={t(
                      "“O’zbekiston” AK ekspluatasiya qiluvchi korxona texnik rahbari",
                    )}
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">13. Kelishilgan</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="aiFullName"
                    placeholder="AI-9 F.I.Sh. (Joylarda)"
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">14. Talabnoma tuzuvchi (AP)</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="applicantAP"
                    placeholder="Talabnomaning sanasi, vaqti, raqami"
                  />
                </div>
              </div>

              <div className={"flex items-center gap-2"}>
                <label className="mt-4">15. Talabnoma tuzuvchi (UBP)</label>
                <div className={"flex-1"}>
                  <MyInput<OperativeDto>
                    control={form.control}
                    className={
                      "border border-t-0 border-l-0 border-r-0 rounded-none"
                    }
                    name="applicantUBP"
                    placeholder="Sana, vaqt, imzo"
                  />
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

          <MyTextarea<OperativeDto>
            className={"min-h-[150px]"}
            control={form.control}
            name={"description"}
            placeholder={"Izoh..."}
          />

          <MySelect<OperativeDto>
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

export default OperativeDocumentForm;
