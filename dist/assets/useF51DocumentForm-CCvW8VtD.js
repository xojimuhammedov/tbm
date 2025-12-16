import { a as r, q as L, r as u } from "./index-ADhmmBpU.js";
import { u as h, a as D } from "./useMutate-B2j67kPQ.js";
import { o as V, s, b as A, l as O, a as _ } from "./zod-BQt-Wj8X.js";
import { M as N } from "./MutateRequestMethod-D0dsk-6r.js";
import { l as y } from "./lodash-BI9_Ro3R.js";
import { F as q } from "./f51.constants-C9eI1nkf.js";
import { u as S } from "./useF51Document-DMSV6a3I.js";
import { u as b } from "./useChannel-CLHGnbdc.js";
import { u as G } from "./button-Bp2lHjov-bkEUXTzY.js";
const E = (e) =>
    V({
      recipientIds: A(s()).nonempty(
        e("required {{field}}", {
          field: e("Staffs"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      description: s().optional(),
      date: s().nonempty(
        e("required {{field}}", { field: e("Date"), ns: r.LANG.NS.VALIDATION }),
      ),
      minute: s().nonempty(
        e("required {{field}}", {
          field: e("Minute"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      channel_id: s().nonempty(
        e("required {{field}}", {
          field: e("Channel Code"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      noNumber: s().nonempty(
        e("required {{field}}", {
          field: e("NO number"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      teOeDesignation: s().nonempty(
        e("required {{field}}", {
          field: e("TE and OE designations"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      workArea: s().nonempty(
        e("required {{field}}", {
          field: e("Work area"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      rerouteSchedule: s().nonempty(
        e("required {{field}}", {
          field: e("Reroute schedule"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      ubpZone: A(s()).nonempty(
        e("required {{field}}", {
          field: e("UBP zone"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      prophylaxisType: s().nonempty(
        e("required {{field}}", {
          field: e("Prophylaxis type"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      interestedUbp: s().nonempty(
        e("required {{field}}", {
          field: e("Interested UBP"),
          ns: r.LANG.NS.VALIDATION,
        }),
      ),
      note: s().optional().or(O("")).optional(),
    }),
  w = ({ id: e, onSave: a }) => {
    const { t: i } = G(),
      { toast: d } = L(),
      { f51DocumentQuery: l } = S(e),
      t = h({
        resolver: _(E(i)),
        defaultValues: { prophylaxisType: "Yillik reja" },
      }),
      { channel: o } = b(t.watch("channel_id"));
    (u.useEffect(() => {
      var c, m;
      const n = (c = l.data) == null ? void 0 : c.data;
      if (n) {
        t.setValue("description", n.description);
        const f =
          ((m = n.recipientIds) == null ? void 0 : m.map((T) => T._id)) ?? [];
        t.setValue("recipientIds", f.length > 0 ? f : [""]);
      }
    }, [l.data, t]),
      u.useEffect(() => {
        o &&
          (t.setValue("noNumber", o.channel_number_in_stream),
          t.setValue("teOeDesignation", o.timeslot_number),
          t.setValue("workArea", `${o.rcpu_site_id_a}/${o.rcpu_site_id_z}`));
      }, [o]));
    const { query: p } = D({
        url: [q, e || ""],
        method: e ? N.PUT : N.POST,
        options: {
          onError: (n) => {
            d({
              variant: "destructive",
              title: i(`${y.get(n, "response.statusText", "Error")}`),
              description: i(
                `${y.get(n, "response.data.message", "An error occurred. Contact the administrator")}`,
              ),
            });
          },
          onSuccess: () => {
            (t.reset(),
              a == null || a(),
              d({
                variant: "success",
                title: i("Success"),
                description: i(
                  e ? "F51 updated successfully" : "F51 created successfully",
                ),
              }));
          },
        },
      }),
      I = u.useCallback(
        (n) => {
          p.mutate(n);
        },
        [p],
      );
    return { form: t, handleSubmit: I };
  };
export { w as u };
