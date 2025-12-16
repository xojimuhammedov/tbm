import { i as t, j as e } from "./index-ADhmmBpU.js";
import { u as i, c as r } from "./button-Bp2lHjov-bkEUXTzY.js";
import { H as n } from "./house-CAvvo2Ey.js";
const m = () => {
  const { t: s } = i(),
    a = t();
  return e.jsxs("div", {
    className: "flex flex-col items-center justify-center gap-4",
    children: [
      e.jsx("h1", { className: "text-headline-2xl-black", children: "403" }),
      e.jsx("h2", {
        className: "text-headline-lg-medium uppercase",
        children: s("This page is forbidden"),
      }),
      e.jsxs(r, {
        variant: "tertiary",
        onClick: () => a("/"),
        children: [e.jsx(n, {}), " ", s("Home page")],
      }),
    ],
  });
};
export { m as default };
