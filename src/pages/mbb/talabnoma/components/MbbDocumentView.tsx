import { MyModal } from "@/shared/components/moleculas/modal";
import {
  MbbDocumentInterface,
  RequisitionDocument,
  MemoDocument,
  TMemoDocument,
  DeclarationDocument,
} from "../interfaces/MbbDocument.interface";
import { RequisitionView } from "./view/RequisitionView";
import { MemoView } from "./view/MemoView";
import { TMemoView } from "./view/TMemoView";
import { DeclarationView } from "./view/DeclarationView";

interface MbbDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: MbbDocumentInterface | null;
}

const MbbDocumentView = ({
  open,
  onOpenChange,
  document,
}: MbbDocumentViewProps) => {
  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="8xl"
      className="overflow-auto"
    >
      <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-screen">
        <div
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
          className={`bg-white w-full shadow-2xl relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-8 ${
            document?.document_type === "REQUISITION"
              ? "max-w-[900px] p-10 md:p-14 leading-relaxed"
              : "max-w-[1000px] p-8 md:p-12 leading-tight"
          }`}
        >
          {document?.document_type === "REQUISITION" ? (
            <RequisitionView document={document as RequisitionDocument} />
          ) : document?.document_type === "MEMO" ? (
            <MemoView document={document as MemoDocument} />
          ) : document?.document_type === "MEMO_3_3" ? (
            <TMemoView document={document as TMemoDocument} />
          ) : document?.document_type === "DECLARATION" ? (
            <DeclarationView document={document as DeclarationDocument} />
          ) : null}
        </div>
      </div>
    </MyModal>
  );
};

export default MbbDocumentView;
