import React, { useState, useEffect } from "react";

const UserEditModal = ({ isOpen, closeModal, user, updateUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    product_name: "",
    cost: "",
    phone_number: "",
    phone_number2: "",
    workplace: "",
    time: 0,
    zone: "",
    seller: "",
    collector: "",
    passport_series: "",
    description: "",
    given_day: "",
  });

  const [collectors, setCollectors] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false); // Loading holati qo'shildi
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!API_URL) return;

    const fetchZones = async () => {
      try {
        const response = await fetch(`${API_URL}/zones`);
        const result = await response.json();
        setZones(result);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    const fetchCollectors = async () => {
      try {
        const response = await fetch(`${API_URL}/collector`);
        const result = await response.json();
        setCollectors(result);
      } catch (error) {
        console.error("Error fetching collectors:", error);
      }
    };

    fetchZones();
    fetchCollectors();
  }, [API_URL]);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Yuborish jarayoni boshlanishida loading holatini yoqamiz
    try {
      const response = await fetch(`${API_URL}/users/update/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 204) {
        console.log(
          "Ma'lumot muvaffaqiyatli yangilandi, lekin hech qanday javob yo'q."
        );
        updateUser(formData);
        closeModal();
        window.location.reload(); // Sahifani yangilash
      } else {
        const updatedUser = await response.json();
        updateUser(updatedUser);
        closeModal();
      }
    } catch (error) {
      alert("Xatolik: " + error);
    } finally {
      setLoading(false); // Jarayon tugagach, loading holatini o‘chirib qo‘yamiz
    }
  };

  const fields = [
    { name: "name", label: "Ism", type: "text" },
    { name: "product_name", label: "Mahsulot nomi", type: "text" },
    { name: "cost", label: "Narxi", type: "number" },
    { name: "phone_number", label: "Telefon raqami", type: "text" },
    { name: "phone_number2", label: "Qo‘shimcha telefon raqam", type: "text" },
    { name: "workplace", label: "Ish joyi", type: "text" },
    { name: "time", label: "Muddati", type: "number" },
    { name: "seller", label: "Sotuvchi", type: "text" },
    { name: "passport_series", label: "Pasport seriyasi", type: "text" },
    { name: "description", label: "Izoh", type: "text" },
    { name: "given_day", label: "Berilgan sana", type: "datetime-local" },
  ];

  if (!isOpen || !user) return null;  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-md bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-[80%]">
        <h2 className="text-xl font-bold mb-4 text-center">
          Foydalanuvchini tahrirlash
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-3 items-end"
        >
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-72 px-4 py-2 border rounded-md"
                required
              />
            </div>
          ))}
          <div className="flex flex-col">
            <label className="font-medium">Hudud</label>
            <select
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              className="w-72 px-4 py-2 border rounded-md"
            >
              <option value="">Tanlang</option>
              {zones.map((zone) => (
                <option key={zone?.id} value={zone?.zone_name}>
                  {zone?.zone_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Yig‘uvchi</label>
            <select
              name="collector"
              value={formData.collector}
              onChange={handleChange}
              className="w-72 px-4 py-2 border rounded-md"
            >
              <option value="">Tanlang</option>
              {collectors.map((collector) => (
                <option key={collector?.id} value={collector?.collector_name}>
                  {collector?.collector_name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white w-40 rounded-md h-10"
            disabled={loading} // Yuborish jarayonida tugmani o‘chirib qo‘yamiz
          >
            {loading ? "Loading..." : "Saqlash"}
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-2 w-40 bg-gray-500 text-white p-2 rounded-md"
        >
          Bekor qilish
        </button>
      </div>
    </div>
  );
};

export default UserEditModal;