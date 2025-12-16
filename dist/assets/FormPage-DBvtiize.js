import {
  c as L,
  a as m,
  q as V,
  r as u,
  j as e,
  k as q,
  z as i,
  X as E,
  i as _,
  Q as D,
} from "./index-ADhmmBpU.js";
import { P as M } from "./PageHeader-l3FtlNyv.js";
import { P as C } from "./PageWrapper-D7EWSq9s.js";
import { l as v } from "./lodash-BI9_Ro3R.js";
import { r as P } from "./index.es-njk8-3Q7.js";
import { u as Y, b as F, a as R } from "./useMutate-B2j67kPQ.js";
import { o as z, b as y, s as l, a as $ } from "./zod-BQt-Wj8X.js";
import { M as T } from "./MutateRequestMethod-D0dsk-6r.js";
import { u as G, T as U } from "./useTelevisionDocument-CJq5Pj2G.js";
import { u as k, c as A } from "./button-Bp2lHjov-bkEUXTzY.js";
import { F as K } from "./FilePondComponent-B-yE-IPb.js";
import { u as Q, S as B } from "./useStaffOptions-CXWN6ZMm.js";
import { T as Z } from "./trash-2-B_r_Bsxl.js";
import { S as H } from "./MySelect-CDOMHlry-CVNRsqeU.js";
import "./sidebar-C0lF1Npi.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./useApi-BNT2PGFQ.js";
import "./useGetOne-DA0KuYmv.js";
import "./react-filepond.esm-B2oG36mQ.js";
import "./useLists-DBTxrMAi.js";
import "./useQueryParams-Dns8Zny6.js";
import "./staff.constants-D5gKBh84.js";
/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const W = [
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
    ],
    ["path", { d: "M8 12h8", key: "1wcyev" }],
    ["path", { d: "M12 8v8", key: "napkw2" }],
  ],
  X = L("square-plus", W),
  J = (a) =>
    z({
      title: l().nonempty(
        a("required {{field}}", {
          field: a("Document title"),
          ns: m.LANG.NS.VALIDATION,
        }),
      ),
      files: y(l()).optional().default([]),
      recipientIds: y(l()).optional().default([]),
      description: l().optional(),
      chairman: l().nonempty(
        a("required {{field}}", {
          field: a("Chairman"),
          ns: m.LANG.NS.VALIDATION,
        }),
      ),
      director: l().nonempty(
        a("required {{field}}", {
          field: a("Director"),
          ns: m.LANG.NS.VALIDATION,
        }),
      ),
      text1: l().nonempty(
        a("required {{field}}", {
          field: a("Text1"),
          ns: m.LANG.NS.VALIDATION,
        }),
      ),
      text2: l().nonempty(
        a("required {{field}}", {
          field: a("Text2"),
          ns: m.LANG.NS.VALIDATION,
        }),
      ),
      speed: l().nonempty(
        a("required {{field}}", {
          field: a("Speed"),
          ns: m.LANG.NS.VALIDATION,
        }),
      ),
      documents: y(
        z({
          address: l().optional().default(""),
          speed_and_type: l().optional().default(""),
          date: l().optional().default(""),
          duration: l().optional().default(""),
          type: l().optional().default(""),
        }),
      ).min(1, a("At least one row is required", { ns: m.LANG.NS.VALIDATION })),
    }),
  ee = ({ id: a, onSave: n }) => {
    const { t: o } = k(),
      { toast: r } = V(),
      { televisionDocumentQuery: p } = G(a),
      s = Y({
        resolver: $(J(o)),
        defaultValues: {
          title: "",
          files: [],
          recipientIds: [],
          chairman: "",
          director: "",
          text1: "",
          text2: "",
          speed: "",
          documents: [
            {
              address: "",
              speed_and_type: "",
              date: "",
              duration: "",
              type: "",
            },
          ],
        },
        mode: "onChange",
      }),
      {
        fields: d,
        append: h,
        remove: b,
        update: f,
      } = F({ control: s.control, name: "documents" });
    u.useEffect(() => {
      var N, j;
      const t = (N = p.data) == null ? void 0 : N.data;
      if (t) {
        (s.setValue("title", t.title),
          s.setValue("description", t.description ?? ""),
          s.setValue("chairman", t.chairman ?? ""),
          s.setValue("director", t.director ?? ""),
          s.setValue("text1", t.text1 ?? ""),
          s.setValue("text2", t.text2 ?? ""),
          s.setValue("speed", t.speed ?? ""),
          s.setValue("documents", t.documents),
          s.setValue("files", t.files ?? []));
        const g =
          ((j = t.recipientIds) == null ? void 0 : j.map((O) => O._id)) ?? [];
        s.setValue("recipientIds", g.length > 0 ? g : [""]);
      }
    }, [p.data, s]);
    const x = u.useCallback(() => {
        h({
          address: "",
          speed_and_type: "",
          date: "",
          duration: "",
          type: "",
        });
      }, [h]),
      c = u.useCallback(
        (t) => {
          d.length > 1 && b(t);
        },
        [d.length, b],
      ),
      I = u.useCallback(
        (t, N, j) => {
          const g = d[t];
          f(t, { ...g, [N]: j });
        },
        [d, f],
      ),
      { query: w } = R({
        url: [U, a || ""],
        method: a ? T.PUT : T.POST,
        options: {
          onError: (t) => {
            r({
              variant: "destructive",
              title: o(`${v.get(t, "response.statusText", "Error")}`),
              description: o(
                `${v.get(t, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
          onSuccess: () => {
            (s.reset(),
              n == null || n(),
              r({
                variant: "success",
                title: o("Success"),
                description: o(
                  a
                    ? "Television document updated successfully"
                    : "Television document created successfully",
                ),
              }));
          },
        },
      }),
      S = u.useCallback(
        (t) => {
          w.mutate(t);
        },
        [w],
      );
    return {
      form: s,
      fields: d,
      addNewRow: x,
      removeRow: c,
      updateRow: I,
      handleSubmit: S,
    };
  },
  se = ({ id: a, onSave: n, onCancel: o }) => {
    const { t: r } = k(),
      { staffOptions: p } = Q(),
      {
        form: s,
        fields: d,
        addNewRow: h,
        removeRow: b,
        handleSubmit: f,
      } = ee({ id: a, onSave: n });
    return e.jsx(q, {
      ...s,
      children: e.jsx("form", {
        onSubmit: s.handleSubmit(f),
        children: e.jsxs("div", {
          className: "max-w-6xl mx-auto px-8",
          children: [
            e.jsxs("div", {
              className: "rounded-lg shadow-sm border-2 p-8",
              children: [
                e.jsx("div", {
                  className:
                    "border-b-2 border-gray-500 p-6 flex items-center justify-center",
                  children: e.jsxs("div", {
                    className:
                      "flex items-center justify-between w-full max-w-[900px]",
                    children: [
                      e.jsx("div", {
                        className: "text-center max-w-[250px]",
                        children: e.jsx("span", {
                          className: "text-body-md-regular",
                          children: r(
                            "O'ZBEKISTON MILLIY TELERADIOKOMPANIYASI",
                          ),
                        }),
                      }),
                      e.jsx("div", {
                        className: "flex justify-center",
                        children: e.jsx("img", {
                          src: "/images/gerb.png",
                          alt: "Gerb",
                          width: 80,
                        }),
                      }),
                      e.jsx("div", {
                        className: "text-center max-w-[250px]",
                        children: e.jsx("span", {
                          className: "text-body-md-regular",
                          children: r(
                            "NATIONAL TELEVISION AND RADIO COMPANY OF UZBEKISTAN",
                          ),
                        }),
                      }),
                    ],
                  }),
                }),
                e.jsxs("div", {
                  className: "flex items-center justify-between mt-3",
                  children: [
                    e.jsxs("div", {
                      className: "max-w-[320px]",
                      children: [
                        e.jsx("div", {
                          className: "text-body-xs-regular",
                          children:
                            "100011. Toshkent shahar, Navoiy ko'chasi, 69 tel.:(998 71) 214-12-50, 214-13-00 faks: (995 71) 214-17-50",
                        }),
                        e.jsxs("div", {
                          className: "flex gap-2",
                          children: [
                            e.jsx("a", {
                              className: "text-body-xs-regular text-blue-500",
                              href: "https://www.mtrk.uz/uz/",
                              target: "_blank",
                              children: "www.mtrk.uz",
                            }),
                            e.jsx("a", {
                              className: "text-body-xs-regular text-blue-500",
                              href: "https://www.mtrk.uz/uz/",
                              target: "_blank",
                              children: "mtrk@exat.uz",
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "max-w-[310px]",
                      children: [
                        e.jsx("div", {
                          className: "text-body-xs-regular",
                          children:
                            "69, Navoi street, 100011, Tashkemt, Uzbekistan tel.: (998 71) 214-12-50, 214-13-00 fax: (998 71) 214-17-50",
                        }),
                        e.jsxs("div", {
                          className: "flex gap-2 justify-end",
                          children: [
                            e.jsx("a", {
                              className: "text-body-xs-regular text-blue-500",
                              href: "https://www.mtrk.uz/uz/",
                              target: "_blank",
                              children: "www.mtrk.uz",
                            }),
                            e.jsx("a", {
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
                e.jsxs("div", {
                  className: "mt-4",
                  children: [
                    e.jsxs("div", {
                      className: "flex flex-col gap-1",
                      children: [
                        e.jsx("p", {
                          className: "text-body-md-regular",
                          children: "22 avgust 2025 yil",
                        }),
                        e.jsx(i, {
                          control: s.control,
                          name: "title",
                          className:
                            "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-6 focus-visible:ring-0 w-40",
                          placeholder: r("Ariza raqami"),
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className: "flex justify-end text-center mt-4",
                      children: e.jsx("span", {
                        className: "text-body-md-regular max-w-[280px]",
                        children: r(`«O'zbektelekom» aksiyadorlik
kompaniyasi» бошкарув раиси`),
                      }),
                    }),
                    e.jsxs("div", {
                      className: "flex items-center justify-end text-center",
                      children: [
                        e.jsx(i, {
                          control: s.control,
                          name: "chairman",
                          className:
                            "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-6 focus-visible:ring-0",
                          placeholder: r("Yozish joyi"),
                        }),
                        e.jsx("span", {
                          className: "text-body-md-regular",
                          children: "ga",
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className: "flex justify-end text-center mt-5",
                      children: e.jsx("span", {
                        className: "text-body-md-regular max-w-[280px]",
                        children: r(`«O'zbekiston telekommunikatsiya
tarmoqlarini boshqarish respublika
markazi» ДУК директори
`),
                      }),
                    }),
                    e.jsxs("div", {
                      className: "flex items-center justify-end text-center",
                      children: [
                        e.jsx(i, {
                          control: s.control,
                          name: "director",
                          className:
                            "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-6 focus-visible:ring-0",
                          placeholder: r("Yozish joyi"),
                        }),
                        e.jsx("span", {
                          className: "text-body-md-regular",
                          children: "ga",
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "text-justify mt-6 space-y-3",
                      children: [
                        e.jsx("span", {
                          className: "text-body-md-regular",
                          children: r(
                            "Yurtimizda bo'layotgan davlat ahamiyatga ega, o'ta muhim tadbirlarni joylardan to'g'ridan - to'g'ri yoritish maqsadida Sizdan, quyida keltirilgan manzillar Toshkent telemarkazi o'rtasida ko'rsatilgan tezliklardagi",
                          ),
                        }),
                        e.jsx(i, {
                          control: s.control,
                          name: "text1",
                          className:
                            "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0",
                          placeholder: r("Yozish joyi"),
                        }),
                        e.jsx("span", {
                          className: "text-body-md-regular",
                          children: r(
                            " tashkil etish, shuningdek, Samarkand viloyat teleradiokanali xamda Toshkent telemarkazi oraligidagi mavjud",
                          ),
                        }),
                        e.jsx(i, {
                          control: s.control,
                          name: "text2",
                          className:
                            "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0",
                          placeholder: r("Yozish joyi"),
                        }),
                        e.jsxs("div", {
                          className: "flex items-center gap-4",
                          children: [
                            e.jsx("span", {
                              className: "text-body-md-regular",
                              children: r("kanal tezligini"),
                            }),
                            e.jsx("div", {
                              className: "flex-1",
                              children: e.jsx(i, {
                                control: s.control,
                                name: "speed",
                                className:
                                  "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0",
                                placeholder: r("Yozish joyi"),
                              }),
                            }),
                            e.jsx("span", {
                              className: "text-body-md-regular",
                              children: "ga",
                            }),
                          ],
                        }),
                        e.jsx("span", {
                          className: "text-body-md-regular",
                          children: r(
                            " kutarish yuzasidan «O‘ zbektelekom» AKning tegishli filiallariga kursatmalar berishingizni suraymiz.",
                          ),
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className: "mt-6",
                      children: e.jsx("div", {
                        className: "overflow-x-auto",
                        children: e.jsx("div", {
                          className: "space-y-2",
                          children: d.map((x, c) =>
                            e.jsxs(
                              "div",
                              {
                                className:
                                  "grid grid-cols-12 gap-2 items-center",
                                children: [
                                  e.jsx("div", {
                                    className: "col-span-3",
                                    children: e.jsx(i, {
                                      control: s.control,
                                      name: `documents.${c}.address`,
                                      placeholder: r(
                                        "Manzil yoki ma'lumot kiriting",
                                      ),
                                      className:
                                        "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0",
                                    }),
                                  }),
                                  e.jsx("div", {
                                    className: "col-span-2",
                                    children: e.jsx(i, {
                                      control: s.control,
                                      name: `documents.${c}.speed_and_type`,
                                      placeholder: r("Ma'lumot"),
                                      className:
                                        "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0",
                                    }),
                                  }),
                                  e.jsx("div", {
                                    className: "col-span-3",
                                    children: e.jsx(i, {
                                      control: s.control,
                                      name: `documents.${c}.date`,
                                      placeholder: r("Ma'lumot"),
                                      className:
                                        "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0",
                                    }),
                                  }),
                                  e.jsx("div", {
                                    className: "col-span-2",
                                    children: e.jsx(i, {
                                      control: s.control,
                                      name: `documents.${c}.duration`,
                                      placeholder: r("Ma'lumot"),
                                      className:
                                        "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0",
                                    }),
                                  }),
                                  e.jsxs("div", {
                                    className:
                                      "col-span-2 flex items-center gap-2",
                                    children: [
                                      e.jsx(i, {
                                        control: s.control,
                                        name: `documents.${c}.type`,
                                        placeholder: r("Ma'lumot"),
                                        className:
                                          "border border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center h-7 focus-visible:ring-0",
                                      }),
                                      d.length > 1 &&
                                        e.jsx(Z, {
                                          className: "cursor-pointer",
                                          size: 40,
                                          color: "red",
                                          onClick: () => b(c),
                                        }),
                                      e.jsx(X, {
                                        className: "cursor-pointer",
                                        size: 40,
                                        color: "blue",
                                        onClick: h,
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              x.id,
                            ),
                          ),
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
            e.jsx("div", {
              className: "mt-6",
              children: e.jsx(K, {
                labelIdle: "Qo'shimcha biriktrilgan fayllar...",
                allowProcess: !1,
                instantUpload: !0,
                maxFiles: 1,
                docType: "f56",
                onFinishUpload: (x) => {
                  s.setValue("files", [`${v.get(x, "path")}`]);
                },
              }),
            }),
            e.jsx(P, {
              className: "min-h-[150px]",
              control: s.control,
              name: "description",
              placeholder: "Izoh...",
            }),
            e.jsx(H, {
              control: s.control,
              name: "recipientIds",
              options: p || [],
              label: r("Yuboriladigan xodimlar"),
              placeholder: r("Select staffs"),
              isClearable: !0,
              required: !0,
              isMulti: !0,
            }),
            e.jsxs("div", {
              className: "flex items-center justify-between mt-8 pt-6 border-t",
              children: [
                e.jsxs(A, {
                  type: "button",
                  variant: "secondary",
                  onClick: o,
                  children: [
                    e.jsx(E, { className: "size-4" }),
                    r("Bekor qilish"),
                  ],
                }),
                e.jsxs(A, {
                  type: "submit",
                  children: [e.jsx(B, { className: "size-4" }), r("Yuborish")],
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  we = () => {
    const { t: a } = k(),
      n = _(),
      { id: o } = D(),
      r = u.useMemo(
        () => [
          { name: a("Television"), path: "television", isActive: !1 },
          { name: a("Television document"), path: "television", isActive: !1 },
          {
            name: a(o ? "Edit" : "Create"),
            path: o ? `${o}/edit` : "create",
            isActive: !0,
          },
        ],
        [o, a],
      );
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(M, { className: "sticky top-0", breadcrumbs: r }),
        e.jsx(C, {
          children: e.jsx(se, {
            id: o,
            onSave: () => n("/television"),
            onCancel: () => n("/television"),
          }),
        }),
      ],
    });
  };
export { we as default };
