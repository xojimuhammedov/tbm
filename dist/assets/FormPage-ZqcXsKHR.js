import {
  j as e,
  k as n,
  z as s,
  i as c,
  Q as d,
  r as m,
} from "./index-ADhmmBpU.js";
import { P as b } from "./PageHeader-l3FtlNyv.js";
import { P as p } from "./PageWrapper-D7EWSq9s.js";
import "./lodash-BI9_Ro3R.js";
import "./index.es-njk8-3Q7.js";
import { u as x } from "./useApplicationDocumentForm-CWDV2SPQ.js";
import { u as i } from "./button-Bp2lHjov-bkEUXTzY.js";
import "./sidebar-C0lF1Npi.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./useMutate-B2j67kPQ.js";
import "./useApi-BNT2PGFQ.js";
import "./zod-BQt-Wj8X.js";
import "./MutateRequestMethod-D0dsk-6r.js";
import "./useApplicationDocument-C6bKJL3W.js";
import "./useGetOne-DA0KuYmv.js";
const u = ({ id: o, onSave: t }) => {
    const { t: r } = i(),
      { form: a, handleSubmit: l } = x({ id: o, onSave: t });
    return e.jsx(n, {
      ...a,
      children: e.jsxs("form", {
        onSubmit: a.handleSubmit(l),
        className: "py-6 px-4",
        children: [
          e.jsxs("div", {
            className: "text-center text-base mb-6",
            children: [
              e.jsx("p", {
                children:
                  "“O‘zbekiston telekommunikatsiya tarmoqlarini boshqarish",
              }),
              e.jsx("p", {
                children: "Respublika markazi” davlat unitar korxonasi",
              }),
              e.jsx("p", {
                className: "font-bold mt-2",
                children: "FARMOYISHI",
              }),
            ],
          }),
          e.jsxs("div", {
            className: "flex justify-between text-sm mb-8",
            children: [
              e.jsx(s, {
                control: a.control,
                placeholder: r("Sana"),
                className:
                  "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
              }),
              e.jsx(s, {
                control: a.control,
                placeholder: r("Qarori"),
                className:
                  "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
              }),
              e.jsx(s, {
                control: a.control,
                placeholder: r("Soni"),
                className:
                  "border border-t-0 border-l-0 border-r-0 rounded-none w-full",
              }),
            ],
          }),
          e.jsx("div", {
            className: "mb-8 text-sm",
            children: e.jsx("p", {
              className: "font-semibold",
              children: "Kimga:",
            }),
          }),
          e.jsxs("div", {
            className: "flex items-center justify-center gap-2",
            children: [
              e.jsx(s, {
                control: a.control,
                placeholder: r(""),
                className:
                  "border border-t-0 border-l-0 border-r-0 rounded-none",
              }),
              e.jsx("p", {
                className: "font-bold",
                children: "oqimlarni tarmoqdan o‘chirish to‘g‘risida.",
              }),
            ],
          }),
          e.jsx("p", {
            className: "mt-4 text-lg",
            children:
              "“O‘zTBRM” DUK mintaqaviy boshqaruv bog‘lamasining 2-oktabrdagi 18-bildirgisiga binoan “O‘zbektelekom” G‘arbiy filialiga tegishli bo‘lgan quyidagi 51x2Mbit/s oqimlarni 2025-yil 26-sentabrdan tarmoqdan o‘chirilganligi tasdiqlansin va texnologik hujjatlarga tegishli o‘zgartirishlar kiritilsin:",
          }),
          e.jsx("ol", {
            className: "list-decimal pl-8 space-y-4 mt-6",
            children: e.jsx("li", {
              className: "flex flex-col gap-2",
              children: e.jsxs("span", {
                children: [
                  e.jsx("input", {
                    type: "text",
                    className:
                      "border-b-2 border-gray-400 w-20 text-center focus:border-blue-600 outline-none",
                  }),
                  "Mbit/s oqimlar",
                  e.jsx("input", {
                    type: "text",
                    className:
                      "border-b-2 border-gray-400 w-24 text-center focus:border-blue-600 outline-none",
                  }),
                  e.jsx("input", {
                    type: "text",
                    className:
                      "border-b-2 border-gray-400 w-24 text-center focus:border-blue-600 outline-none",
                  }),
                  " ",
                  "yo‘nalishida",
                  e.jsx("input", {
                    type: "text",
                    className:
                      "border-b-2 border-gray-400 w-72 focus:border-blue-600 outline-none",
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    });
  },
  F = () => {
    const { t: o } = i(),
      t = c(),
      { id: r } = d(),
      a = m.useMemo(
        () => [
          { name: o("RH-252"), path: "rh-252", isActive: !1 },
          { name: o("Application"), path: "a-252", isActive: !1 },
          {
            name: o(r ? "Edit" : "Create"),
            path: r ? `${r}/edit` : "create",
            isActive: !0,
          },
        ],
        [r, o],
      );
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(b, { className: "sticky top-0", breadcrumbs: a }),
        e.jsx(p, {
          children: e.jsx(u, {
            id: r,
            onSave: () => t("/rtsi/application"),
            onCancel: () => t("/rtsi/application"),
          }),
        }),
      ],
    });
  };
export { F as default };
