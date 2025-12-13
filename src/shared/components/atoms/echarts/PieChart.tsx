import Echarts, {
  EchartsProps,
} from "@/shared/components/atoms/echarts/Echarts.tsx";
import { ChartValueFormat } from "@/shared/enums/ChartValueFormat.ts";
import { useMemo } from "react";
import { EChartsReactProps } from "echarts-for-react";
import { useIsMobile } from "@/shared/hooks/useMobile.ts";
import { ChartPosition } from "@/shared/enums/ChartPosition.ts";
import { isEmpty } from "lodash";
import { Empty } from "dgz-ui-shared/components/empty";
import { Loader } from "@/shared/components/atoms/loading";

export type PieChartProps = Omit<EchartsProps, "option"> & {
  titleText?: string;
  subTitleText?: string;
  showLegends?: true;
  valueFormat?: ChartValueFormat;
  position?: ChartPosition;
  data?: { name: string; value: number; color?: string }[];
};

const PieChart = ({
  showLegends,
  data,
  loading,
  valueFormat = ChartValueFormat.NUMBER,
  titleText,
  position = ChartPosition.CENTER,
  subTitleText,
  ...props
}: PieChartProps) => {
  const isMobile = useIsMobile();
  const option = useMemo<EChartsReactProps["option"]>(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      title: {
        show: Boolean(titleText),
        text: titleText,
        subtext: subTitleText,
        subtextStyle: {
          fontSize: 14,
        },
      },
      legend: {
        type: "scroll",
        show: showLegends,
        orient: isMobile ? "horizontal" : "vertical",
        left: isMobile
          ? "center"
          : position === ChartPosition.LEFT
            ? "75%"
            : position === ChartPosition.RIGHT
              ? 0
              : "auto",
        top: isMobile ? "auto" : "center",
        bottom: isMobile ? 0 : "auto",
      },
      series: {
        type: "pie",
        radius: ["55%", "70%"],
        center: [
          isMobile
            ? "50%"
            : position === ChartPosition.CENTER
              ? "50%"
              : position === ChartPosition.LEFT
                ? "30%"
                : "70%",
          subTitleText ? "55%" : "50%",
        ],
        showEmptyCircle: false,
        percentPrecision: 0,
        data: data?.map((item) => ({
          ...item,
          itemStyle: {
            color: item.color,
          },
        })),
        label: {
          show: true,
          formatter: "{b}: {c} ({d}%)",
          fontSize: 14,
          edgeDistance: "10%",
        },
        labelLine: {
          smooth: true,
          showAbove: false,
        },
      },
    }),
    [showLegends, data, titleText, subTitleText, isMobile, position],
  );

  return !loading ? (
    !isEmpty(data) ? (
      <Echarts {...props} option={option} />
    ) : (
      <Empty />
    )
  ) : (
    <Loader />
  );
};

export default PieChart;
