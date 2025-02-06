import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

const AddBtn = () => {
  const [givenDay, setGivenDay] = useState("");
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [zone, setZone] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [time, setTime] = useState();
  const [passportSeries, setPassportSeries] = useState("");
  const [description, setDescription] = useState("");
  const [seller, setSeller] = useState("");
  const [collector, setCollector] = useState(""); 
  const navigate = useNavigate();
  const [daaata, setDataa] =useState()


  const API_URL = process.env.REACT_APP_API_URL;

 


  const postMethod = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!name || !productName || !zone || !collector) {
      alert("Please fill out all required fields: Name, Product Name, Zone, and Collector.");
      return; // Prevent form submission if validation fails
    }

    // Ensure time and givenDay are in correct format
    const formattedTime = time ? new Date(new Date().setMonth(new Date().getMonth() + time)).toISOString() : null;
    const formattedGivenDay = givenDay ? new Date(givenDay).toISOString() : null;

    const formData = {
      name,
      product_name: productName,
      cost,
      phone_number: phoneNumber,
      phone_number2: phoneNumber2,
      zone,
      workplace,
      time: formattedTime,
      passport_series: passportSeries,
      description,
      given_day: formattedGivenDay,
      seller,
      collector,
    };

    try {
      const response = await fetch(`${API_URL}/users/add`, {
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
      navigate("/");
    } catch (error) {
      alert(`Xatolik yuz berdi: ${error.message}`);
      console.error("Xatolik haqida ma'lumot:", error);
    }
  };

  return (
    <div className="h-70vh max-w-[1000px] w-90% mx-auto">
      <form onSubmit={postMethod} className="grid grid-cols-2 gap-4">
        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Ismi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Mahsulot nomi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Manzili</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Narxi</p>
          <input
            type="number"
            className="p-2 border-2 rounded-lg"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Telefon raqami</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            placeholder="+998901234567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">2 - Telefon raqami</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            placeholder="+998901234567"
            value={phoneNumber2}
            onChange={(e) => setPhoneNumber2(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Ish joyi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Pasport seriyasi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={passportSeries}
            onChange={(e) => setPassportSeries(e.target.value)}
          />
        </div>

       

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Berilgan Vaqti</p>
          <input
            type="date"
            className="p-2 border-2 rounded-lg"
            value={givenDay}
            onChange={(e) => setGivenDay(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Nechi oyga berildi</p>
          <input
            type="number"
            className="p-2 border-2 rounded-lg"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Qo'shimcha ma'lumot</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Sotuvchi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
          />
        </div>

        <div className="flex justify-between py-2 px-4 items-center">
          <p className="text-xl">Yig'uvchi</p>
          <input
            type="text"
            className="p-2 border-2 rounded-lg"
            value={collector}
            onChange={(e) => setCollector(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="col-span-2 p-2 bg-blue-500 max-w-36 text-white rounded-lg"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
};

export default AddBtn;
