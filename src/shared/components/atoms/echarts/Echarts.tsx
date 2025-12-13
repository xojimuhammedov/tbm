import EChartsReact, { EChartsReactProps } from "echarts-for-react";
import { useTheme } from "dgz-ui-shared/hooks";
import echarts from "@/shared/utils/echarts.ts";
import { Loader } from "@/shared/components/atoms/loading";

export type EchartsProps = EChartsReactProps & {
  loading?: boolean;
};

const Echarts = ({ loading = false, ...props }: EchartsProps) => {
  const { theme } = useTheme();
  return !loading ? (
    <EChartsReact
      // opts={{
      //   renderer: 'svg',
      // }}
      {...props}
      echarts={echarts}
      theme={theme}
    />
  ) : (
    <Loader />
  );
};

export default Echarts;
