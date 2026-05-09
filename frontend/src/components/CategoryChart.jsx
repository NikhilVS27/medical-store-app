import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CategoryChart({ medicines }) {

  const categoryData = [];

  const categoryMap = {};

  medicines.forEach((medicine) => {

    if (categoryMap[medicine.category]) {
      categoryMap[medicine.category] += 1;
    } else {
      categoryMap[medicine.category] = 1;
    }

  });

  for (const category in categoryMap) {

    categoryData.push({
      name: category,
      value: categoryMap[category],
    });

  }

  const COLORS = [
    "#06b6d4",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (

    <div className="bg-slate-800 p-8 rounded-3xl mb-10">

      <h2 className="text-3xl font-bold mb-8">
        Category Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <PieChart>

          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >

            {
              categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))
            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default CategoryChart;