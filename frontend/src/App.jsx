import { useEffect, useState } from "react";
import API from "./services/api";

import { CSVLink } from "react-csv";

import Login from "./components/Login";
import AddMedicine from "./components/AddMedicine";
import EditMedicine from "./components/EditMedicine";
import InventoryChart from "./components/InventoryChart";
import CategoryChart from "./components/CategoryChart";

function App() {

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [editingMedicine, setEditingMedicine] = useState(null);

  // Live Clock
  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Fetch medicines
  const fetchMedicines = async () => {

    try {

      const response = await API.get("/medicines");

      setMedicines(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Delete medicine
  const deleteMedicine = async (id) => {

    try {

      await API.delete(`/medicines/${id}`);

      fetchMedicines();

    } catch (error) {

      console.log(error);

    }
  };

  // Update medicine
  const updateMedicine = async (updatedMedicine) => {

    try {

      await API.put(
        `/medicines/${updatedMedicine.id}`,
        updatedMedicine
      );

      fetchMedicines();

      setEditingMedicine(null);

    } catch (error) {

      console.log(error);

    }
  };

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
  };

  // Expiry checker
  const isExpiringSoon = (expiryDate) => {

    const today = new Date();

    const expiry = new Date(expiryDate);

    const difference =
      (expiry - today) / (1000 * 60 * 60 * 24);

    return difference <= 30;
  };

  useEffect(() => {

    fetchMedicines();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // Show Login Page
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/10 p-6 shadow-2xl">

        <h1 className="text-4xl font-bold text-cyan-400 mb-10">
          MediStore
        </h1>

        <ul className="space-y-6 text-lg">

          <li className="hover:text-cyan-400 cursor-pointer transition-all duration-300">
            Dashboard
          </li>

          <li className="hover:text-cyan-400 cursor-pointer transition-all duration-300">
            Inventory
          </li>

          <li className="hover:text-cyan-400 cursor-pointer transition-all duration-300">
            Add Medicine
          </li>

          <li className="hover:text-cyan-400 cursor-pointer transition-all duration-300">
            Reports
          </li>

        </ul>

        <button
          onClick={handleLogout}
          className="mt-20 bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-all duration-300 px-5 py-3 rounded-xl w-full shadow-xl"
        >
          Logout
        </button>

      </div>

      {/* Main */}
      <div className="flex-1 p-10 overflow-y-auto">

        {/* Top */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Medical Inventory Dashboard
            </h1>

            <div className="mt-3 text-gray-300">

              <p className="text-lg">
                {currentTime.toLocaleDateString()}
              </p>

              <p className="text-2xl font-bold text-cyan-400">
                {currentTime.toLocaleTimeString()}
              </p>

            </div>

          </div>

          <CSVLink
            data={medicines}
            filename={"medical_inventory.csv"}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl font-bold shadow-xl"
          >
            Export CSV
          </CSVLink>

        </div>

        {/* Add Medicine Form */}
        <AddMedicine fetchMedicines={fetchMedicines} />

        {/* Edit Medicine Form */}
        {
          editingMedicine && (
            <EditMedicine
              editingMedicine={editingMedicine}
              updateMedicine={updateMedicine}
            />
          )
        }

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          {/* Total Medicines */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl hover:scale-[1.02] transition-all duration-300">

            <h2 className="text-gray-300 text-xl">
              Total Medicines
            </h2>

            <p className="text-5xl font-bold mt-4">
              {medicines.length}
            </p>

          </div>

          {/* Low Stock */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl hover:scale-[1.02] transition-all duration-300">

            <h2 className="text-gray-300 text-xl">
              Low Stock
            </h2>

            <p className="text-5xl font-bold mt-4 text-yellow-400">

              {
                medicines.filter(
                  medicine => medicine.quantity < 10
                ).length
              }

            </p>

          </div>

          {/* Inventory Value */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl hover:scale-[1.02] transition-all duration-300">

            <h2 className="text-gray-300 text-xl">
              Inventory Value
            </h2>

            <p className="text-5xl font-bold mt-4 text-green-400">

              ₹
              {
                medicines.reduce(
                  (total, medicine) =>
                    total + (medicine.price * medicine.quantity),
                  0
                )
              }

            </p>

          </div>

        </div>

        {/* Charts */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl mb-10">

          <InventoryChart medicines={medicines} />

        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl mb-10">

          <CategoryChart medicines={medicines} />

        </div>

        {/* Inventory Table */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl overflow-x-auto">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-4xl font-bold">
              Inventory
            </h1>

            <input
              type="text"
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-700/70 backdrop-blur-lg px-5 py-3 rounded-xl outline-none border border-white/10"
            />

          </div>

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10 text-left">

                <th className="pb-5">Medicine</th>
                <th className="pb-5">Category</th>
                <th className="pb-5">Quantity</th>
                <th className="pb-5">Price</th>
                <th className="pb-5">Expiry</th>
                <th className="pb-5">Actions</th>

              </tr>

            </thead>

            <tbody>

              {
                medicines
                  .filter((medicine) =>
                    medicine.medicine_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((medicine) => (

                    <tr
                      key={medicine.id}
                      className={`border-b border-white/10 hover:bg-white/5 transition-all duration-300 ${
                        medicine.quantity < 10
                          ? "bg-red-900/20"
                          : ""
                      }`}
                    >

                      <td className="py-6">
                        {medicine.medicine_name}
                      </td>

                      <td>
                        {medicine.category}
                      </td>

                      <td
                        className={
                          medicine.quantity < 10
                            ? "text-yellow-400 font-bold"
                            : ""
                        }
                      >

                        <div className="flex items-center gap-3">

                          {medicine.quantity}

                          {
                            medicine.quantity < 10 && (
                              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                                Low Stock
                              </span>
                            )
                          }

                        </div>

                      </td>

                      <td>
                        ₹{medicine.price}
                      </td>

                      <td className="py-6">

                        <div className="flex flex-col gap-2">

                          <span
                            className={
                              isExpiringSoon(medicine.expiry_date)
                                ? "text-orange-400 font-bold"
                                : ""
                            }
                          >
                            {medicine.expiry_date}
                          </span>

                          {
                            isExpiringSoon(medicine.expiry_date) && (
                              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full w-fit">
                                Expiring Soon
                              </span>
                            )
                          }

                        </div>

                      </td>

                      <td className="space-x-2">

                        <button
                          onClick={() => setEditingMedicine(medicine)}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 transition-all duration-300 px-4 py-2 rounded-lg shadow-xl"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteMedicine(medicine.id)}
                          className="bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-all duration-300 px-4 py-2 rounded-lg shadow-xl"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;