import { PieChart } from "react-minimal-pie-chart";

function ActiveChart() {
  const total = 100 - Math.ceil((20 * 100) / 100);
  console.log(total);
  return (
    <div className="flex justify-center">
      <PieChart
        style={{ width: "170px", height: "170px" }}
        data={[{ value: total, color: "#937ef3" }]}
        lineWidth={22}
        startAngle={0}
        lengthAngle={360}
        animate
        reveal="0%"
        radius={35}
        totalValue={100}
      />
    </div>
  );
}

export default ActiveChart;
