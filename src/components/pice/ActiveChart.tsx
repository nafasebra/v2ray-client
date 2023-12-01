import { PieChart } from "react-minimal-pie-chart";

function ActiveChart() {
  return (
    <div className="flex justify-center">
      <PieChart
        style={{ width: "170px", height: "170px" }}
        data={[{ value: 100, color: "#937ef3" }]}
        lineWidth={20}
        startAngle={0}
        lengthAngle={360}
        animate
        reveal={100}
        radius={35}
        totalValue={100}
      />
    </div>
  );
}

export default ActiveChart;
