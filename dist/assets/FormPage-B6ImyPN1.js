import {
  a as n,
  q as g,
  r as u,
  j as e,
  k as I,
  z as o,
  X as O,
  i as V,
  Q as L,
} from "./index-ADhmmBpU.js";
import { P as T } from "./PageHeader-l3FtlNyv.js";
import { P as S } from "./PageWrapper-D7EWSq9s.js";
import { l as N } from "./lodash-BI9_Ro3R.js";
import { r as q } from "./index.es-njk8-3Q7.js";
import { u as h, c as j } from "./button-Bp2lHjov-bkEUXTzY.js";
import { F as P } from "./FilePondComponent-B-yE-IPb.js";
import { u as k, S as D } from "./useStaffOptions-CXWN6ZMm.js";
import { u as z, a as G } from "./useMutate-B2j67kPQ.js";
import { o as U, s as i, b as A, a as B } from "./zod-BQt-Wj8X.js";
import { M as v } from "./MutateRequestMethod-D0dsk-6r.js";
import { u as C, O as w } from "./useOperativeDocument-NGwAguQO.js";
import { S as E } from "./MySelect-CDOMHlry-CVNRsqeU.js";
import "./sidebar-C0lF1Npi.js";
import "./createLucideIcon-B950nf2d-ChSZaRdU.js";
import "./react-filepond.esm-B2oG36mQ.js";
import "./useApi-BNT2PGFQ.js";
import "./useLists-DBTxrMAi.js";
import "./useQueryParams-Dns8Zny6.js";
import "./staff.constants-D5gKBh84.js";
import "./useGetOne-DA0KuYmv.js";
const F = (r) =>
    U({
      title: i().nonempty(
        r("required {{field}}", {
          field: r("Document title"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      files: A(i()).nonempty(
        r("required {{field}}", {
          field: r("Files"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      recipientIds: A(i()).nonempty(
        r("required {{field}}", {
          field: r("Staffs"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      description: i().optional(),
      UbpNumber: i().nonempty(
        r("required {{field}}", {
          field: r("UBP number"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      applicationNumber: i().nonempty(
        r("required {{field}}", {
          field: r("Application number"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      workConditions: i().nonempty(
        r("required {{field}}", {
          field: r("Work conditions"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      date: i().nonempty(
        r("required {{field}}", {
          field: r("UBP number"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      magistralName: i().nonempty(
        r("required {{field}}", {
          field: r("UBP number"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      NoNumber: i().nonempty(
        r("required {{field}}", {
          field: r("UBP number"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      ai9Channels: i().nonempty(
        r("required {{field}}", {
          field: r("UBP number"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      reasonJob: i().nonempty(
        r("required {{field}}", {
          field: r("Reason Job"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      jobDescription: i().nonempty(
        r("required {{field}}", {
          field: r("Job description"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      NOStatus: i().nonempty(
        r("required {{field}}", {
          field: r("NO status"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      aag: i().nonempty(
        r("required {{field}}", { field: r("AAG"), ns: n.LANG.NS.VALIDATION }),
      ),
      reservation: i().nonempty(
        r("required {{field}}", {
          field: r("Reservation"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      responsiblePerson: i().nonempty(
        r("required {{field}}", {
          field: r("UBP number"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      headOfTheEnterprise: i().nonempty(
        r("required {{field}}", {
          field: r("Head of the enterprise"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      aiFullName: i().nonempty(
        r("required {{field}}", {
          field: r("AI-9 full name"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      applicantAP: i().nonempty(
        r("required {{field}}", {
          field: r("Applicant AP"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
      applicantUBP: i().nonempty(
        r("required {{field}}", {
          field: r("Applicant UBP"),
          ns: n.LANG.NS.VALIDATION,
        }),
      ),
    }),
  R = ({ id: r, onSave: d }) => {
    const { t } = h(),
      { toast: l } = g(),
      { operativeDocumentQuery: c } = C(r),
      s = z({
        resolver: B(F(t)),
        defaultValues: { files: [] },
        mode: "onChange",
      });
    u.useEffect(() => {
      var b, x;
      const a = (b = c.data) == null ? void 0 : b.data;
      if (a) {
        (s.setValue("title", a.title),
          s.setValue("UbpNumber", a.UbpNumber),
          s.setValue("applicationNumber", a.applicationNumber),
          s.setValue("workConditions", a.workConditions),
          s.setValue("date", a.date),
          s.setValue("magistralName", a.magistralName),
          s.setValue("NoNumber", a.NoNumber),
          s.setValue("ai9Channels", a.ai9Channels),
          s.setValue("reasonJob", a.reasonJob),
          s.setValue("jobDescription", a.jobDescription),
          s.setValue("NOStatus", a.NOStatus),
          s.setValue("aag", a.aag),
          s.setValue("reservation", a.reservation),
          s.setValue("responsiblePerson", a.responsiblePerson),
          s.setValue("headOfTheEnterprise", a.headOfTheEnterprise),
          s.setValue("aiFullName", a.aiFullName),
          s.setValue("applicantAP", a.applicantAP),
          s.setValue("applicantUBP", a.applicantUBP),
          s.setValue("description", a.description),
          s.setValue("files", a.files));
        const f =
          ((x = a.recipientIds) == null ? void 0 : x.map((y) => y._id)) ?? [];
        s.setValue("recipientIds", f.length > 0 ? f : [""]);
      }
    }, [c.data, s]);
    const { query: m } = G({
        url: [w, r || ""],
        method: r ? v.PUT : v.POST,
        options: {
          onError: (a) => {
            l({
              variant: "destructive",
              title: t(`${N.get(a, "response.statusText", "Error")}`),
              description: t(
                `${N.get(a, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
          onSuccess: () => {
            (s.reset(),
              d == null || d(),
              l({
                variant: "success",
                title: t("Success"),
                description: t(
                  r
                    ? "Operative updated successfully"
                    : "Operative created successfully",
                ),
              }));
          },
        },
      }),
      p = u.useCallback(
        (a) => {
          m.mutate(a);
        },
        [m],
      );
    return { id: r, form: s, handleSubmit: p };
  },
  M = ({ id: r, onSave: d, onCancel: t }) => {
    const { t: l } = h(),
      { staffOptions: c } = k(),
      { form: s, handleSubmit: m } = R({ id: r, onSave: d });
    return e.jsx(I, {
      ...s,
      children: e.jsx("form", {
        onSubmit: s.handleSubmit(m),
        className: "py-6 px-4",
        children: e.jsxs("div", {
          className: "max-w-5xl mx-auto px-2",
          children: [
            e.jsxs("div", {
              className: "rounded-lg shadow-sm border-2 p-8",
              children: [
                e.jsx("div", {
                  className: "flex justify-end",
                  children: e.jsx(o, {
                    className: "border-none rounded-none w-48",
                    required: !0,
                    control: s.control,
                    name: "title",
                    placeholder: l("RH 45-232/2012"),
                  }),
                }),
                e.jsxs("div", {
                  className: "text-center",
                  children: [
                    e.jsx("h2", {
                      className: "text-lg font-semibold text-gray-800 mb-1",
                      children: "D ilova",
                    }),
                    e.jsx("p", {
                      className: "text-gray-600 mb-3",
                      children: "(Majburiy)",
                    }),
                    e.jsxs("p", {
                      className: "text-body-lg-regular",
                      children: [
                        "Tezkor ta’mirlash-sozlash ishlarini o’tkazish uchun",
                        e.jsx("br", {}),
                        "talabnomani taqdim etish shakli",
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "text-center mb-6",
                  children: [
                    e.jsxs("div", {
                      className: "flex justify-center items-center gap-4 mb-3",
                      children: [
                        e.jsx("div", {
                          className: "",
                          children: e.jsx(o, {
                            required: !0,
                            control: s.control,
                            size: 4,
                            className:
                              "flex-1 border border-t-0 border-l-0 border-r-0 rounded-none h-6",
                            name: "UbpNumber",
                            placeholder: l("Raqam"),
                          }),
                        }),
                        e.jsx("div", {
                          className: "mt-2",
                          children: " UBPdan",
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className: "mb-1",
                      children:
                        "tezkor ta’mirlash-sozlash ishlarini o’tkazish uchun",
                    }),
                    e.jsxs("div", {
                      className: "flex justify-center items-center gap-4 mb-3",
                      children: [
                        e.jsx(o, {
                          required: !0,
                          control: s.control,
                          size: 4,
                          className:
                            "border border-t-0 border-l-0 border-r-0 rounded-none h-6",
                          name: "applicationNumber",
                        }),
                        e.jsx("div", {
                          className: "mt-2",
                          children: " - son TALABNOMA",
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs("div", {
                  className: "space-y-2 px-2",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "1. Ishlarni o'tkazish shartlari:",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "workConditions",
                            placeholder: l("Yopib / yopmasdan / QBT bilan"),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "2. Sana va vaqt:",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "date",
                            placeholder: l(
                              "Ishlarni o'tkazish sanasi, oyi, yili, soati, minuti",
                            ),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "3. Uchastka, stansiyalar",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "magistralName",
                            placeholder: l("Magistral nomi, AP nomeri"),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "4. NO nomeri",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "NoNumber",
                            placeholder: l(
                              "O’tkazish liniyasi, liniya / guruh trantor va hk",
                            ),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "5. Al-9 kanallari",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "ai9Channels",
                            placeholder: l("Bor / yo'q"),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", { className: "mt-4", children: "6. " }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "reasonJob",
                            placeholder: l("Ishni bajarish sababi"),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", { className: "mt-4", children: "7." }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "jobDescription",
                            placeholder: l("Bajarilayotgan ishlar xususiyati"),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "8. NO holati",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "NOStatus",
                            placeholder: l("Bajarilayotgan ishlar xususiyati"),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "9. AAG",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "aag",
                            placeholder: l("Bajarilayotgan ishlar xususiyati"),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", { className: "mt-4", children: "10." }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "reservation",
                            placeholder: l("Rezervlashning boshqa usuli"),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "11. Rahbar stantsiyasi",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "responsiblePerson",
                            placeholder: l(
                              "Ishlarni o’tkazish uchun javobgar shaxs",
                            ),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "12. Kelishilgan",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "headOfTheEnterprise",
                            placeholder: l(
                              "“O’zbekiston” AK ekspluatasiya qiluvchi korxona texnik rahbari",
                            ),
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "13. Kelishilgan",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "aiFullName",
                            placeholder: "AI-9 F.I.Sh. (Joylarda)",
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "14. Talabnoma tuzuvchi (AP)",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "applicantAP",
                            placeholder: "Talabnomaning sanasi, vaqti, raqami",
                          }),
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        e.jsx("label", {
                          className: "mt-4",
                          children: "15. Talabnoma tuzuvchi (UBP)",
                        }),
                        e.jsx("div", {
                          className: "flex-1",
                          children: e.jsx(o, {
                            control: s.control,
                            className:
                              "border border-t-0 border-l-0 border-r-0 rounded-none",
                            name: "applicantUBP",
                            placeholder: "Sana, vaqt, imzo",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            e.jsx("div", {
              className: "mt-6",
              children: e.jsx(P, {
                labelIdle: "Qo'shimcha biriktrilgan fayllar...",
                allowProcess: !1,
                instantUpload: !0,
                maxFiles: 1,
                docType: "f56",
                onFinishUpload: (p) => {
                  s.setValue("files", [`${N.get(p, "path")}`]);
                },
              }),
            }),
            e.jsx(q, {
              className: "min-h-[150px]",
              control: s.control,
              name: "description",
              placeholder: "Izoh...",
            }),
            e.jsx(E, {
              control: s.control,
              name: "recipientIds",
              options: c || [],
              label: l("Yuboriladigan xodimlar"),
              placeholder: l("Select staffs"),
              isClearable: !0,
              required: !0,
              isMulti: !0,
            }),
            e.jsxs("div", {
              className: "flex items-center justify-between mt-8 pt-6 border-t",
              children: [
                e.jsxs(j, {
                  type: "button",
                  variant: "secondary",
                  onClick: t,
                  children: [e.jsx(O, { className: "size-4" }), "Bekor qilish"],
                }),
                e.jsxs(j, {
                  type: "submit",
                  children: [e.jsx(D, { className: "size-4" }), "Yuborish"],
                }),
              ],
            }),
          ],
        }),
      }),
    });
  },
  me = () => {
    const { t: r } = h(),
      d = V(),
      { id: t } = L(),
      l = u.useMemo(
        () => [
          {
            name: r("Operational work"),
            path: "operational-work",
            isActive: !1,
          },
          {
            name: r("Operative document"),
            path: "operational-work",
            isActive: !1,
          },
          {
            name: r(t ? "Edit" : "Create"),
            path: t ? `${t}/edit` : "create",
            isActive: !0,
          },
        ],
        [t, r],
      );
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(T, { className: "sticky top-0", breadcrumbs: l }),
        e.jsx(S, {
          children: e.jsx(M, {
            id: t,
            onSave: () => d("/operational-work"),
            onCancel: () => d("/operational-work"),
          }),
        }),
      ],
    });
  };
export { me as default };
