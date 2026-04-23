import { TMemoDocument } from "../../interfaces/MbbDocument.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";

export const TMemoView = ({ document }: { document: TMemoDocument }) => {
  const payload = document?.payload;

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="font-bold text-[16px] uppercase">
          «Ўзбектелеком» АК фармойишлари бажарилганлиги тўғрисида маълумот шакли
        </h2>
      </div>

      <div className="text-center mb-6 px-10">
        <p className="text-[14px] font-bold leading-tight">
          «Ўзбектелеком» АК филиалларининг фармойишлари асосида алоқаларни тўғрисида
        </p>
        <p className="mt-4 uppercase text-[16px]">
          <span className="inline-block border-b-2 border-black px-4 min-w-[120px] font-bold">
            {document?.code || "_________"}
          </span>{" "}
          -сон МАЪЛУМОТ
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-[1.5px] border-black text-[12px]">
          <thead>
            <tr className="bg-gray-50 text-center">
              <th className="border-[1.5px] border-black p-2 w-10">Т.р.</th>
              <th className="border-[1.5px] border-black p-2 leading-tight">
                «Ўзбектелеком» АК филиали фармойишининг номери ва сана
              </th>
              <th className="border-[1.5px] border-black p-2 leading-tight">
                Алоқаларни ташкил этиш санаси
              </th>
              <th className="border-[1.5px] border-black p-2 leading-tight">
                Ташкил этилган алоқалар трассаси
              </th>
              <th className="border-[1.5px] border-black p-2 leading-tight">
                Изох*
              </th>
            </tr>
          </thead>
          <tbody>
            {payload?.rows && payload.rows.length > 0 ? (
              payload.rows.map((row, index) => (
                <tr key={index} className="h-12 text-center">
                  <td className="border-[1.5px] border-black">{index + 1}</td>
                  <td className="border-[1.5px] border-black font-medium">
                    {row?.branch_order_info || "-"}
                  </td>
                  <td className="border-[1.5px] border-black">
                    {row?.connection_date
                      ? dateFormatter(row.connection_date, DATE)
                      : "-"}
                  </td>
                  <td className="border-[1.5px] border-black">
                    {row?.connection_route || "-"}
                  </td>
                  <td className="border-[1.5px] border-black">
                    {row?.note || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-12 text-center">
                <td className="border-[1.5px] border-black">1</td>
                <td className="border-[1.5px] border-black">-</td>
                <td className="border-[1.5px] border-black">-</td>
                <td className="border-[1.5px] border-black">-</td>
                <td className="border-[1.5px] border-black">-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between text-[14px]">
        <div className="flex flex-col gap-1 w-[45%]">
          <p className="font-bold text-[12px]">АП номери, бажарувчининг исм-шарифи, фамилияси ва сана:</p>
          <div className="border-b border-black w-full min-h-[24px] font-semibold">
            {payload?.ap_executor || ""}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-[45%]">
          <p className="font-bold text-[12px]">УБП номери, бажарувчининг исм-шарифи, фамилияси ва сана:</p>
          <div className="border-b border-black w-full min-h-[24px] font-semibold">
            {payload?.ubp_executor || ""}
          </div>
        </div>
      </div>
    </>
  );
};
