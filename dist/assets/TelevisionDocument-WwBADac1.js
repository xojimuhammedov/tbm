import { j as s } from "./index-ADhmmBpU.js";
import { u as i } from "./button-Bp2lHjov-bkEUXTzY.js";
const c = ({ title: r, document: e }) => {
  const { t: a } = i();
  return s.jsxs("div", {
    className: "rounded-lg shadow-sm border-2 p-8",
    children: [
      s.jsx("div", {
        className:
          "border-b-2 border-gray-500 p-6 flex items-center justify-center",
        children: s.jsxs("div", {
          className: "flex items-center justify-between w-full max-w-[900px]",
          children: [
            s.jsx("div", {
              className: "text-center max-w-[250px]",
              children: s.jsx("span", {
                className: "text-body-sm-regular",
                children: a("O'ZBEKISTON MILLIY TELERADIOKOMPANIYASI"),
              }),
            }),
            s.jsx("div", {
              className: "flex justify-center",
              children: s.jsx("img", {
                src: "/images/gerb.png",
                alt: "Gerb",
                width: 60,
              }),
            }),
            s.jsx("div", {
              className: "text-center max-w-[250px]",
              children: s.jsx("span", {
                className: "text-body-sm-regular",
                children: a(
                  "NATIONAL TELEVISION AND RADIO COMPANY OF UZBEKISTAN",
                ),
              }),
            }),
          ],
        }),
      }),
      s.jsxs("div", {
        className: "flex items-center justify-between mt-3",
        children: [
          s.jsxs("div", {
            className: "max-w-[320px]",
            children: [
              s.jsx("div", {
                className: "text-body-xs-regular",
                children:
                  "100011. Toshkent shahar, Navoiy ko'chasi, 69 tel.:(998 71) 214-12-50, 214-13-00 faks: (995 71) 214-17-50",
              }),
              s.jsxs("div", {
                className: "flex gap-2",
                children: [
                  s.jsx("a", {
                    className: "text-body-xs-regular text-blue-500",
                    href: "https://www.mtrk.uz/uz/",
                    target: "_blank",
                    children: "www.mtrk.uz",
                  }),
                  s.jsx("a", {
                    className: "text-body-xs-regular text-blue-500",
                    href: "https://www.mtrk.uz/uz/",
                    target: "_blank",
                    children: "mtrk@exat.uz",
                  }),
                ],
              }),
            ],
          }),
          s.jsxs("div", {
            className: "max-w-[310px]",
            children: [
              s.jsx("div", {
                className: "text-body-xs-regular",
                children:
                  "69, Navoi street, 100011, Tashkemt, Uzbekistan tel.: (998 71) 214-12-50, 214-13-00 fax: (998 71) 214-17-50",
              }),
              s.jsxs("div", {
                className: "flex gap-2 justify-end",
                children: [
                  s.jsx("a", {
                    className: "text-body-xs-regular text-blue-500",
                    href: "https://www.mtrk.uz/uz/",
                    target: "_blank",
                    children: "www.mtrk.uz",
                  }),
                  s.jsx("a", {
                    className: "text-body-xs-regular text-blue-500",
                    href: "https://www.mtrk.uz/uz/",
                    target: "_blank",
                    children: "mtrk@exat.uz",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      s.jsxs("div", {
        className: "mt-4",
        children: [
          s.jsxs("div", {
            className: "flex flex-col gap-1",
            children: [
              s.jsx("p", {
                className: "text-body-md-regular",
                children: "22 avgust 2025 yil",
              }),
              s.jsx("p", { className: "text-body-md-regular", children: r }),
            ],
          }),
          s.jsx("div", {
            className: "flex justify-end text-center mt-4",
            children: s.jsxs("span", {
              className: "text-body-md-regular max-w-[260px]",
              children: [
                a(`«O'zbektelekom» aksiyadorlik
kompaniyasi» бошкарув раиси`),
                " ",
                e == null ? void 0 : e.chairman,
                " ga",
              ],
            }),
          }),
          s.jsx("div", {
            className: "flex justify-end text-center mt-5",
            children: s.jsxs("span", {
              className: "text-body-md-regular max-w-[260px]",
              children: [
                a(`«O'zbekiston telekommunikatsiya
tarmoqlarini boshqarish respublika
markazi» ДУК директори
`),
                e == null ? void 0 : e.director,
                " ga",
              ],
            }),
          }),
          s.jsx("div", {
            className: "flex items-center justify-end text-center",
          }),
          s.jsx("div", {
            className: "mt-6 space-y-3",
            children: s.jsxs("span", {
              className: "text-body-md-regular",
              children: [
                " ",
                a("Yurtimizda bo'layotgan davlat ahamiyatga ega", {
                  text1: e == null ? void 0 : e.text1,
                  text2: e == null ? void 0 : e.text2,
                  speed: e == null ? void 0 : e.speed,
                }),
              ],
            }),
          }),
          s.jsx("div", {
            className: "mt-6",
            children: s.jsx("div", {
              className: "overflow-x-auto",
              children: s.jsx("div", {
                className: "space-y-2",
                children:
                  e == null
                    ? void 0
                    : e.documents.map((l, t) =>
                        s.jsxs(
                          "div",
                          {
                            className: "grid grid-cols-12 gap-2 items-center",
                            children: [
                              s.jsx("div", {
                                className: "col-span-3",
                                children: s.jsx("span", {
                                  className: "text-body-md-regular",
                                  children: l.address,
                                }),
                              }),
                              s.jsx("div", {
                                className: "col-span-2",
                                children: s.jsx("span", {
                                  className: "text-body-md-regular",
                                  children: l.speed_and_type,
                                }),
                              }),
                              s.jsx("div", {
                                className: "col-span-3",
                                children: s.jsx("span", {
                                  className: "text-body-md-regular",
                                  children: l.date,
                                }),
                              }),
                              s.jsx("div", {
                                className: "col-span-2",
                                children: s.jsx("span", {
                                  className: "text-body-md-regular",
                                  children: l.duration,
                                }),
                              }),
                              s.jsx("div", {
                                className: "col-span-2 flex items-center gap-2",
                                children: s.jsx("span", {
                                  className: "text-body-md-regular",
                                  children: l.type,
                                }),
                              }),
                            ],
                          },
                          t,
                        ),
                      ),
              }),
            }),
          }),
        ],
      }),
    ],
  });
};
export { c as T };
