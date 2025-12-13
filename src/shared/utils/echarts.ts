import * as echarts from "echarts";
import { ThemeMode } from "dgz-ui-shared/enums";
import { omit } from "lodash";

const colors: Record<
  ThemeMode.LIGHT | ThemeMode.DARK,
  Record<string, string>
> = {
  [ThemeMode.LIGHT]: {
    primary: "#171717",
    secondary: "#737373",
    alphaStrong: "#30303033",
    tooltipBg: "#ffffff",
  },
  [ThemeMode.DARK]: {
    primary: "#ffffff",
    secondary: "#a3a3a3",
    alphaStrong: "#ffffff33",
    tooltipBg: "#202020",
  },
};

Object.values(omit(ThemeMode, "SYSTEM")).forEach((theme) => {
  echarts.registerTheme(theme, {
    tooltip: {
      backgroundColor: colors[theme].tooltipBg,
      textStyle: {
        color: colors[theme].primary,
      },
    },
    title: {
      textStyle: {
        color: colors[theme].primary,
        fontSize: 18,
      },
      subtextStyle: {
        color: colors[theme].secondary,
      },
    },
    valueAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          color: colors[theme].alphaStrong,
        },
      },
    },
    categoryAxis: {
      axisLabel: {
        color: colors[theme].secondary,
      },
    },
    legend: {
      textStyle: {
        color: colors[theme].primary,
      },
    },
    pie: {
      label: {
        color: colors[theme].primary,
      },
      itemStyle: {
        borderWidth: 0,
      },
    },
  });
});

export default echarts;
