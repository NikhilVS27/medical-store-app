import { useState, useEffect } from "react";

function EditMedicine({
  editingMedicine,
  updateMedicine,
}) {

  const [formData, setFormData] = useState(editingMedicine);

  useEffect(() => {
    setFormData(editingMedicine);
  }, [editingMedicine]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateMedicine({
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    });
  };

  return (

    <div className="bg-slate-800 p-8 rounded-3xl mb-10">

      <h2 className="text-3xl font-bold mb-6">
        Edit Medicine
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >

        <input
          type="text"
          name="medicine_name"
          value={formData.medicine_name}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="number"
          name="price"
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
          value={formData.supplier}
          onChange={handleChange}
          className="bg-slate-700 p-4 rounded-xl outline-none"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl col-span-2 text-lg font-bold"
        >
          Update Medicine
        </button>

      </form>

    </div>
  );
}

export default EditMedicine;