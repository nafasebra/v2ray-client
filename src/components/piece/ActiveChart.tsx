import { useActiveTheme, useConicStyle } from "@/theme/utils/gradient";

interface ActiveChartProps {
  total: number;
  used: number;
  text: string;
}

function ActiveChart(props: ActiveChartProps) {
  const bgStyle = useConicStyle((props.used / props.total) * 100);
  const currentTheme = useActiveTheme();

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center relative z-0 w-full aspect-square max-w-[150px]">
        <div
          style={bgStyle}
          className="w-full aspect-square max-w-[150px] rounded-full absolute top-0 left-0 -z-[2]"></div>
        <div
          style={{
            color: currentTheme.btnColor,
            background: currentTheme.chartBg,
          }}
          className="w-full aspect-square max-w-[calc(150px-1.5rem)] absolute top-3 left-3 rounded-full -z-[1]"></div>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default ActiveChart;
