import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function InventoryChart({ medicines }) {

  const chartData = medicines.map((medicine) => ({
    name: medicine.medicine_name,
    quantity: medicine.quantity,
  }));

  return (

    <div className="bg-slate-800 p-8 rounded-3xl mb-10">

      <h2 className="text-3xl font-bold mb-8">
        Inventory Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="quantity"
            fill="#06b6d4"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default InventoryChart;