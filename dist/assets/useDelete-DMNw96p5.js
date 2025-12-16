import { c as i, bi as p, r as s } from "./index-ADhmmBpU.js";
import { u as h } from "./useApi-BNT2PGFQ.js";
import { M as l } from "./MutateRequestMethod-D0dsk-6r.js";
/**
 * @license lucide-react v0.535.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const f = [
    [
      "path",
      {
        d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        key: "1m0v6g",
      },
    ],
    [
      "path",
      {
        d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
        key: "ohrbg2",
      },
    ],
  ],
  M = i("square-pen", f);
function b(n = [], c) {
  const { mutate: a } = h(n, c),
    { confirm: r } = p(),
    e = s.useCallback(
      (o, t) => a({ url: [o], data: t, options: { method: l.DELETE } }),
      [a],
    ),
    u = s.useCallback(
      (o) =>
        new Promise((t, m) => {
          r({
            onConfirm: () => {
              e(o).then(t).catch(m);
            },
          });
        }),
      [e, r],
    );
  return { remove: e, removeWithConfirm: u };
}
export { M as S, b as u };
