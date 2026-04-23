import { DeclarationDocument } from "../../interfaces/MbbDocument.interface";
import dayjs from "dayjs";
import 'react-quill-new/dist/quill.snow.css';

export const DeclarationView = ({ document }: { document: DeclarationDocument }) => {
  const payload = document?.payload;
  const basic = payload?.basic;

  const requestDate = basic?.request_date 
    ? dayjs(basic.request_date).format("YYYY-yil D-MMMM")
    : "__________";

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="font-bold text-[20px]">
          Bildirgi №{document?.code || "______"}
        </h2>
      </div>

      <div className="text-[16px] text-justify tracking-wide leading-relaxed space-y-6">
        <div className="indent-8">
          <span className="font-semibold">{basic?.organization_name || "________________"}</span>ning{" "}
          <span className="font-semibold">{requestDate}</span>dagi{" "}
          <span className="font-semibold">{basic?.request_number || "_________"}</span>-sonli farmoyishiga asosan
        </div>
        
        {payload?.context && (
          <div 
            className="ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: payload.context }} 
          />
        )}
      </div>
    </>
  );
};
