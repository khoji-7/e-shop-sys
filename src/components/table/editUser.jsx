import React, { useState } from "react";

const UserForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [name, setName] = useState(initialData.name || "");
  const [productName, setProductName] = useState(initialData.productName || "");
  const [address, setAddress] = useState(initialData.address || "");
  const [cost, setCost] = useState(initialData.cost || 0);
  const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber || "");
  const [phoneNumber2, setPhoneNumber2] = useState(initialData.phoneNumber2 || "");
  const [workplace, setWorkplace] = useState(initialData.workplace || "");
  const [passportSeries, setPassportSeries] = useState(initialData.passportSeries || "");
  const [primaryPayment, setPrimaryPayment] = useState(initialData.primaryPayment || 0);
  const [time, setTime] = useState(initialData.time || 0);
  const [givenDay, setGivenDay] = useState(initialData.givenDay || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      productName,
      address,
      cost,
      phoneNumber,
      phoneNumber2,
      workplace,
      passportSeries,
      primaryPayment,
      time,
      givenDay,
      description,
    };

    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isEdit ? "Ma'lumotlarni Tahrirlash" : "Yangi Ma'lumot Qo'shish"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Ismi" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField label="Mahsulot nomi" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <InputField label="Manzili" value={address} onChange={(e) => setAddress(e.target.value)} />
        <InputField
          label="Narxi"
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
        />
        <InputField
          label="Telefon raqami"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <InputField
          label="2 - Telefon raqami"
          value={phoneNumber2}
          onChange={(e) => setPhoneNumber2(e.target.value)}
        />
        <InputField
          label="Ish joyi"
          value={workplace}
          onChange={(e) => setWorkplace(e.target.value)}
        />
        <InputField
          label="Pasport seriyasi"
          value={passportSeries}
          onChange={(e) => setPassportSeries(e.target.value)}
        />
        <InputField
          label="Bosh to'lov"
          type="number"
          value={primaryPayment}
          onChange={(e) => setPrimaryPayment(Number(e.target.value))}
        />
        <InputField
          label="Nechi oyga berildi"
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
        <InputField
          label="Berilgan Vaqti"
          type="date"
          value={givenDay}
          onChange={(e) => setGivenDay(e.target.value)}
        />
        <InputField
          label="Qo'shimcha ma'lumot"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="col-span-2 p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEdit ? "Yangilash" : "Qo'shish"}
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label className="font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
);

export default UserForm;
