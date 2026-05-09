import { toast } from "react-toastify";
import { useState } from "react";
import API from "../services/api";

function AddMedicine({ fetchMedicines }) {

  const [formData, setFormData] = useState({
    medicine_name: "",
    category: "",
    quantity: "",
    price: "",
    expiry_date: "",
    supplier: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/medicines", {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });

      toast.success("Medicine Added Successfully!");

      setFormData({
        medicine_name: "",
        category: "",
        quantity: "",
        price: "",
        expiry_date: "",
        supplier: "",
      });

      fetchMedicines();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-slate-800 p-8 rounded-3xl mb-10">

      <h2 className="text-3xl font-bold mb-6">
        Add Medicine
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >

        <input
          type="text"
          name="medicine_name"
          placeholder="Medicine Name"
          value={formData.medicine_name}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={formData.supplier}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 p-4 rounded-xl col-span-2 text-lg font-bold"
        >
          Add Medicine
        </button>

      </form>

    </div>
  );
}

export default AddMedicine;