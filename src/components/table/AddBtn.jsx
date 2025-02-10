import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBtn = () => {
  const [givenDay, setGivenDay] = useState("");
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [zone, setZone] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [time, setTime] = useState(1);
  const [passportSeries, setPassportSeries] = useState("");
  const [description, setDescription] = useState("");
  const [seller, setSeller] = useState("");
  const [collector, setCollector] = useState("");
  const navigate = useNavigate();
  const [collectors, setCollectors] = useState([]);
  const [zones, setZones] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!API_URL) {
      console.error("API URL aniqlanmagan! Iltimos, .env faylni tekshiring.");
      return;
    }

    const fetchZones = async () => {
      try {
        const response = await fetch(`${API_URL}/zones`);
        const data = await response.json();
        setZones(data);
      } catch (error) {
        console.error("Manzillarni yuklashda xatolik:", error);
      }
    };

    const fetchCollectors = async () => {
      try {
        const response = await fetch(`${API_URL}/collector`);
        const data = await response.json();
        setCollectors(data);
      } catch (error) {
        console.error("Yig'uvchilarni yuklashda xatolik:", error);
      }
    };

    fetchCollectors();
    fetchZones();
  }, [API_URL]);

  const postMethod = async (e) => {
    e.preventDefault();

    if (!name || !productName || !zone || !collector) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    const formattedGivenDay = givenDay
      ? new Date(givenDay).toISOString()
      : null;

    const formData = {
      name: name.toString(), // string formatga o'tkazish
      product_name: productName.toString(), // string formatga o'tkazish
      cost: Number(cost) || 0, // number formatga o'tkazish
      phone_number: phoneNumber.toString(), // string formatga o'tkazish
      phone_number2: phoneNumber2.toString(), // string formatga o'tkazish
      workplace: workplace.toString(), // string formatga o'tkazish
      time: time,
      zone: zone.toString(), // string formatga o'tkazish
      seller: seller.toString(), // string formatga o'tkazish
      collector: collector.toString(), // string formatga o'tkazish
      passport_series: passportSeries.toString(), // string formatga o'tkazish
      description: description.toString(), // string formatga o'tkazish
      given_day: formattedGivenDay, //
    };
    console.log(formData);

    try {
      const response = await fetch(`http://3.77.237.29:3000/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Server xatosi yuz berdi");
      }

      alert("Ma'lumot muvaffaqiyatli yuborildi");
      navigate("/");
    } catch (error) {
      alert(`Xatolik: ${error.message}`);
      console.error("Xatolik haqida ma'lumot:", error);
    }
  };  return (
    <div className="h-70vh max-w-[1000px] w-90% mx-auto">
      <form onSubmit={postMethod} className="grid grid-cols-2 gap-4">
        <InputField
          label="Ismi"
          name="name"
          value={name}
          onChange={setName}
          required
        />
        <InputField
          label="Mahsulot nomi"
          name="product_name"
          value={productName}
          onChange={setProductName}
          required
        />
        <InputField
          label="Narxi"
          name="cost"
          type="number"
          value={cost}
          onChange={setCost}
        />
        <InputField
          label="Telefon raqami"
          name="phone_number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
        <InputField
          label="2 - Telefon raqami"
          name="phone_number2"
          value={phoneNumber2}
          onChange={setPhoneNumber2}
        />
        <InputField
          label="Ish joyi"
          name="workplace"
          value={workplace}
          onChange={setWorkplace}
        />
        <InputField
          label="Pasport seriyasi"
          name="passport_series"
          value={passportSeries}
          onChange={setPassportSeries}
        />
        <InputField
          label="Berilgan Vaqti"
          name="given_day"
          type="date"
          value={givenDay}
          onChange={setGivenDay}
        />
        <InputField
          label="Nechi oyga berildi"
          name="time"
          type="number"
          value={time}
          onChange={setTime}
        />
        <InputField
          label="Qo'shimcha ma'lumot"
          name="description"
          value={description}
          onChange={setDescription}
        />
        <InputField
          label="Sotuvchi"
          name="seller"
          value={seller}
          onChange={setSeller}
        />

        <DropdownField
          label="Manzilni Tanlang"
          name="zone"
          value={zone}
          onChange={setZone}
          options={zones}
          required
        />
        <DropdownField
          label="Yig'uvchi"
          name="collector"
          value={collector}
          onChange={setCollector}
          options={collectors}
          required
        />

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

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}) => (
  <div className="flex justify-between py-2 px-4 items-center">
    <p className="text-xl">{label}</p>
    <input
      type={type}
      name={name}
      className="p-2 border-2 rounded-lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  </div>
);

const DropdownField = ({ label, name, value, onChange, options, required }) => (
  <div className="flex justify-between py-2 px-4 items-center">
    <p className="text-xl">{label}</p>
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg"
      required={required}
    >
      <option value="">{label}</option>
      {options?.map((item) => (
        <option key={item?.id} value={item?.zone_name || item?.collector_name}>
          {item?.zone_name || item?.collector_name}
        </option>
      ))}
    </select>
  </div>
);

export default AddBtn;