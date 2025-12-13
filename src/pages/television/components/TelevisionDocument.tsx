import { TelevisionDocumentInterface } from "@/pages/television/interfaces/televisionDocument.interface.ts";
import { useTranslation } from "react-i18next";

interface TelevisionDocumentProps {
  title?: string;
  document?: TelevisionDocumentInterface | null;
}

const TelevisionDocument = ({ title, document }: TelevisionDocumentProps) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg shadow-sm border-2 p-8">
      <div className="border-b-2 border-gray-500 p-6 flex items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-[900px]">
          <div className="text-center max-w-[250px]">
            <span className="text-body-sm-regular">
              {t("O'ZBEKISTON MILLIY TELERADIOKOMPANIYASI")}
            </span>
          </div>

          <div className="flex justify-center">
            <img src="/images/gerb.png" alt="Gerb" width={60} />
          </div>

          <div className="text-center max-w-[250px]">
            <span className="text-body-sm-regular">
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
          <p className="text-body-md-regular">{title}</p>
        </div>

        <div className="flex justify-end text-center mt-4">
          <span className="text-body-md-regular max-w-[260px]">
            {t(
              "«O'zbektelekom» aksiyadorlik\n" + "kompaniyasi» бошкарув раиси",
            )}{" "}
            {document?.chairman} ga
          </span>
        </div>

        <div className="flex justify-end text-center mt-5">
          <span className="text-body-md-regular max-w-[260px]">
            {t(
              "«O'zbekiston telekommunikatsiya\n" +
                "tarmoqlarini boshqarish respublika\n" +
                "markazi» ДУК директори\n",
            )}
            {document?.director} ga
          </span>
        </div>

        <div className="flex items-center justify-end text-center"></div>

        {/* Main Text with Inputs */}
        <div className="mt-6 space-y-3">
          <span className="text-body-md-regular">
            {" "}
            {t("Yurtimizda bo'layotgan davlat ahamiyatga ega", {
              text1: document?.text1,
              text2: document?.text2,
              speed: document?.speed,
            })}
          </span>
        </div>

        {/* Dynamic Table */}
        <div className="mt-6">
          <div className="overflow-x-auto">
            <div className="space-y-2">
              {document?.documents.map((doc, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-3">
                    <span className="text-body-md-regular">{doc.address}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-body-md-regular">
                      {doc.speed_and_type}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-body-md-regular">{doc.date}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-body-md-regular">{doc.duration}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-body-md-regular">{doc.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelevisionDocument;
