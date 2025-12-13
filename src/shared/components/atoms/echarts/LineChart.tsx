import Echarts, {
  EchartsProps,
} from "@/shared/components/atoms/echarts/Echarts.tsx";
import { ChartValueFormat } from "@/shared/enums/ChartValueFormat.ts";
import { useMemo } from "react";
import { EChartsReactProps } from "echarts-for-react";
import { LineChartItemInterface } from "@/shared/interfaces/line-chart-item.interface.ts";

export type LineChartProps = Omit<EchartsProps, "option"> & {
  titleText?: string;
  subTitleText?: string;
  showLegends?: true;
  labels?: string[];
  valueFormat?: ChartValueFormat;
  series?: {
    name: string;
    data: LineChartItemInterface[];
    color?: string;
  }[];
};

const LineChart = ({
  showLegends,
  series,
  valueFormat = ChartValueFormat.NUMBER,
  titleText,
  labels,
  subTitleText,
  ...props
}: LineChartProps) => {
  // const isMobile = useIsMobile();
  const option = useMemo<EChartsReactProps["option"]>(
    () => ({
      tooltip: {
        trigger: "axis",
        // formatter: '{b}: {c} ({d}%)',
      },
      title: {
        show: Boolean(titleText),
        text: titleText,
        subtext: subTitleText,
        subTextStyle: {
          fontSize: 26,
        },
      },
      yAxis: {
        type: "value",
      },
      xAxis: {
        type: "category",
        data: labels,
      },
      grid: {
        left: 32,
        right: 8,
        bottom: showLegends ? 48 : 24,
      },
      legend: {
        show: showLegends,
        orient: "horizontal",
        bottom: 0,
        icon: "roundRect",
      },
      series: series?.map(({ name, data, color }) => ({
        name,
        type: "line",
        smooth: true,
        data,
        itemStyle: {
          color,
        },
      })),
    }),
    [showLegends, series, titleText, subTitleText, labels],
  );

  return <Echarts {...props} option={option} />;
};

export default LineChart;
