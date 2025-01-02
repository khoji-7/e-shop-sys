import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBtn = () => {
  
  // Hozirgi sanani olish va formatlash
  const [givenDay, setGivenDay] = useState("");
  
  useEffect(() => {
    const currentDate = new Date();
    setGivenDay(currentDate.toISOString()); // ISO formatida beriladi
  }, []);

  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState(); // Default value set to 0
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [address, setAddress] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [time, setTime] = useState(); // Default value set to 0
  const [primaryPayment, setPrimaryPayment] = useState(); // Default value set to 0
  const [passportSeries, setPassportSeries] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const postMethod = async (e) => {
    
    e.preventDefault();

    const formData = {
      name,
      product_name: productName,
      cost,
      phone_number: phoneNumber,
      phone_number2: phoneNumber2,
      address,
      workplace,
      time,
      primary_payment: primaryPayment,
      passport_series: passportSeries,
      description,
      given_day: givenDay,
    };

    try {
      const response = await fetch(`http://3.77.237.29:3000/users/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Serverda noma'lum xatolik yuz berdi");
      }

      alert("Ma'lumot muvaffaqiyatli yuborildi");
      navigate("/")
      
    } catch (error) {
      alert(`Xatolik yuz berdi: ${error.message}`);
      console.error("Xatolik haqida ma'lumot:", error);
    }
  };

  return (
    <div className="h-70vh max-w-[1000px] w-90% mx-auto">
      <form onSubmit={postMethod} className="grid grid-cols-2">
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Ismi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Mahsulot nomi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Manzili</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Narxi</p>
          <input
            type="number"
            className="p-2 border-2 rounded-lg"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Telefon raqami</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">2 - Telefon raqami</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={phoneNumber2}
            onChange={(e) => setPhoneNumber2(e.target.value)}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Ish joyi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Pasport seriyasi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={passportSeries}
            onChange={(e) => setPassportSeries(e.target.value)}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Bosh to'lov</p>
          <input
            type="number"
            className="p-2 border-2 rounded-lg"
            value={primaryPayment}
            onChange={(e) => setPrimaryPayment(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Berilgan Vaqti</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={givenDay}
            onChange={(e) => setGivenDay(e.target.value)}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Nechi oyga berildi</p>
          <input
            type="number"
            className="p-2 border-2 rounded-lg"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-2 py-2 px-4 items-center">
          <p className="text-xl">Qo'shimcha ma'lumot</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="col-span-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
};

export default AddBtn;
