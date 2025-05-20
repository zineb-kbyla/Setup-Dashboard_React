import { PieChart } from "@mui/x-charts/PieChart";

export default function CategoriesStates() {

  const remisesData = [
    { label: "Course Discounts", value: 45 },
    { label: "Subscription Discounts", value: 35 },
    { label: "Promo Codes", value: 20 },
  ];
  const valueFormatter = (item) => `${item.value.toFixed(1)}%`;

  return (
    <>
      <p className="text-lg font-semibold text-black pb-4">
        Distribution of Discounts
      </p>
      <PieChart
        series={[
          {
            data: remisesData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
        height={200}
        width={200}
      />
    </>
  );
}
