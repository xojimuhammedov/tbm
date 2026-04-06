import useOrganizationOptions from "@/pages/organizations/hooks/useOrganizationOptions.ts";
import IDSection1731 from "@/pages/rh-252/a-252/components/form/NetworkDoc.tsx";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions";
import BanDocSection from "@/pages/tbp/hujjatlar/components/form/BanDocSection.tsx";
import OrderForm1212 from "@/pages/tbp/hujjatlar/components/form/OrderForm1212.tsx";
import SettingsDocSection from "@/pages/tbp/hujjatlar/components/form/SettingsDocSection.tsx";
import TelegraphPlannedWorkSection from "@/pages/tbp/hujjatlar/components/form/TelegraphPlannedWorkSection.tsx";
import useApplicationDocumentForm from "@/pages/tbp/hujjatlar/hooks/useApplicationDocumentForm";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui";
import { Form, MyDatePicker, MySelect } from "dgz-ui-shared/components/form";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// ─── Main form ────────────────────────────────────────────────────────────────

const ApplicationDocumentForm = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { form, handleSubmit, isLoading } = useApplicationDocumentForm({
    id: id || null,
  });

  const { staffOptions } = useStaffOptions();
  // const { groupOptions } = useGroupOptions();
  const { organizationOptions } = useOrganizationOptions();

  const selectedCode = form.watch("code");
  const isOrder1212Mode = selectedCode === "12-12";
  const isBanMode = selectedCode === "12-13";
  const isTelegraphPlannedWorkMode = selectedCode === "12-34";
  const isSettingsDocMode = selectedCode === "12-14";

  const prefixOptions = [
    { label: "12-12", value: "12-12" },
    { label: "12-13", value: "12-13" },
    { label: "12-34", value: "12-34" },
    { label: "12-14", value: "12-14" },
  ];

  if (isLoading && id) {
    return (
      <div className="flex items-center justify-center h-96 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="text-gray-600">{t("Loading...")}</span>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} action="">
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
            <div className=" items-center gap-1 w-[150px]">
              <span className={"font-bold"}>Sana:</span>
              <MyDatePicker
                name="order_date"
                control={form.control}
                placeholder="Sana kiriting"
                rules={{ required: "Sana kiriting" }}
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="w-[150px]">
                <MySelect
                  name="code"
                  control={form.control}
                  options={prefixOptions}
                  placeholder="Kod"
                  className="border-t-0 border-l-0 border-r-0 rounded-none h-7 min-h-[28px]"
                  isDisabled={!!id}
                />
              </div>
            </div>
            <div className="font-bold">SONI:1</div>
          </div>

          <div className="mb-8 text-lg">
            <p>
              <strong>Kimga:</strong>
            </p>
            <MySelect
              name="to"
              control={form.control}
              options={organizationOptions || []}
              placeholder="Guruhlarni tanlang"
              isMulti
            />
          </div>

          <div className="mb-8 text-lg">
            <p>
              <strong>Nusxasi:</strong>
            </p>
            <MySelect
              name="copy"
              control={form.control}
              options={organizationOptions || []}
              placeholder="Nusxalarni tanlang"
              isMulti
            />
          </div>

          {/* Form 12-12 ga xos bo'lgan qism */}
          {isOrder1212Mode && (
            <OrderForm1212 control={form.control} watch={form.watch} />
          )}

          {/* Form 12-13 ga xos bo'lgan qism */}
          {isBanMode && <BanDocSection control={form.control} />}

          {/* Form 12-34 ga xos bo'lgan qism */}
          {isTelegraphPlannedWorkMode && (
            <TelegraphPlannedWorkSection control={form.control} />
          )}

          {/* Form 12-14 ga xos bo'lgan qism */}
          {isSettingsDocMode && (
            <SettingsDocSection
              control={form.control}
              setValue={form.setValue}
            />
          )}
          <div className="mt-8 mb-4 pt-6 border-t">
            <div className="max-w-md">
              <MySelect
                control={form.control}
                name="signer"
                options={staffOptions || []}
                label={t("Imzolovchi")}
                placeholder={t("Tanlang...")}
                isClearable
                required
              />
            </div>
          </div>
          <IDSection1731
            control={form.control}
            setValue={form.setValue}
            fieldName={
              isSettingsDocMode
                ? "payload.basic.base_file"
                : "payload.file_name"
            }
          />
        </div>

        <FormContainerFooter>
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
            {t("Back")}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default ApplicationDocumentForm;
