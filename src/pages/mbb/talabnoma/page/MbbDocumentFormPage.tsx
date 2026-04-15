import { Button } from "dgz-ui/button";
import {
  Form,
  MySelect,
} from "dgz-ui-shared/components/form";
import { ArrowLeftIcon } from "lucide-react";
import useMbbDocumentForm from "@/pages/mbb/talabnoma/hooks/useMbbDocumentForm.ts";
import { useNavigate, useParams } from "react-router-dom";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { useTranslation } from "react-i18next";
import { MemoFormSection } from "../components/form/MemoFormSection";
import { RequisitionFormSection } from "../components/form/RequisitionFormSection";



/* ─── Main Unified Form Page ─── */
const MbbDocumentFormPage = () => {
  const { id } = useParams();
  const {
    form,
    documentType,
    scheduleFields,
    applicationFields,
    appendSchedule,
    removeSchedule,
    appendApplication,
    removeApplication,
    dataFields,
    handleAppendData,
    handleRemoveData,
    onSubmit,
  } = useMbbDocumentForm({ id });
  const { staffOptions } = useStaffOptions();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const documentTypeOptions = [
    { label: "Talabnoma (REQUISITION)", value: "REQUISITION" },
    { label: "Ma'lumotnoma (MEMO)", value: "MEMO" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 bg-gray-50/50 min-h-screen"
      >
        <div className="w-full max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          {/* Document Type Select */}
          <div className="mb-8 flex justify-center">
            <div className="w-80">
              <MySelect
                name="document_type"
                control={form.control}
                options={documentTypeOptions}
                placeholder="Hujjat turini tanlang"
                label="Hujjat turi"
              />
            </div>
          </div>

          {/* Conditional Form Body */}
          {documentType === "REQUISITION" ? (
            <RequisitionFormSection
              form={form}
              scheduleFields={scheduleFields}
              applicationFields={applicationFields}
              appendSchedule={appendSchedule}
              removeSchedule={removeSchedule}
              appendApplication={appendApplication}
              removeApplication={removeApplication}
            />
          ) : (
            <MemoFormSection
              form={form}
              dataFields={dataFields}
              handleAppendData={handleAppendData}
              handleRemoveData={handleRemoveData}
            />
          )}

          {/* Signer section (common to both) */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 items-center border-t border-gray-200 pt-8 justify-between">
            <div className="w-72">
              <MySelect
                name="signer"
                control={form.control}
                options={staffOptions || []}
                placeholder="Imzolovchini tanlang"
                label="Tasdiqlovchi/Imzolovchi (Tizim)"
              />
            </div>
          </div>
        </div>

        <FormContainerFooter>
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
            {t("Orqaga")}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default MbbDocumentFormPage;
