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
    const [time, setTime] = useState("");
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
        fetchCollectors();
        fetchZones();
    }, []);
    const fetchZones = () => {
      fetch(`${API_URL}/zones`)
          .then((response) => response.json())
          .then((item) => setZones(item))
          .catch((error) => console.error("Error:", error));
  };

  console.log(zones,"dd")
    const fetchCollectors = async () => {
        try {
            const response = await fetch(`${API_URL}/collector`);
            const result = await response.json();
            setCollectors(result);
        } catch (error) {
            console.error("Error fetching collectors:", error);
        }
    };

    const postMethod = async (e) => {
        e.preventDefault();

        if (!name || !productName || !zone || !collector) {
            alert("Iltimos, barcha majburiy maydonlarni to'ldiring: Ism, Mahsulot nomi, Manzil va Yig'uvchi.");
            return;
        }

        const formattedTime = time ? new Date(new Date().setMonth(new Date().getMonth() + Number(time))).toISOString() : null;
        const formattedGivenDay = givenDay ? new Date(givenDay).toISOString() : null;

        const formData = {
            name,
            product_name: productName,
            cost: cost ? Number(cost) : null,
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
                <InputField label="Ismi" value={name} onChange={setName} />
                <InputField label="Mahsulot nomi" value={productName} onChange={setProductName} />
                <InputField label="Narxi" type="number" value={cost} onChange={setCost} />
                <InputField label="Telefon raqami" value={phoneNumber} onChange={setPhoneNumber} />
                <InputField label="2 - Telefon raqami" value={phoneNumber2} onChange={setPhoneNumber2} />
                <InputField label="Ish joyi" value={workplace} onChange={setWorkplace} />
                <InputField label="Pasport seriyasi" value={passportSeries} onChange={setPassportSeries} />
                <InputField label="Berilgan Vaqti" type="date" value={givenDay} onChange={setGivenDay} />
                <InputField label="Nechi oyga berildi" type="number" value={time} onChange={setTime} />
                <InputField label="Qo'shimcha ma'lumot" value={description} onChange={setDescription} />
                <InputField label="Sotuvchi" value={seller} onChange={setSeller} />

                <div className="flex justify-between py-2 px-4 items-center">
                    <p className="text-xl">Manzilni Tanlang</p>
                    <select
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="">Huduni Tanlang</option>
                        {zones?.map((item) => (
                            <option key={item?.id} value={item?.zone_name}>
                                {item?.zone_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between py-2 px-4 items-center">
                    <p className="text-xl">Yig'uvchi</p>
                    <select
                        value={collector}
                        onChange={(e) => setCollector(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                        required
                    >
                        <option value="">Yig'uvchini tanlang</option>
                        {collectors?.map((item) => (
                            <option key={item?.id} value={item?.collector_name}>
                                {item?.collector_name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="col-span-2 p-2 bg-blue-500 max-w-36 text-white rounded-lg">
                    Yuborish
                </button>
            </form>
        </div>
    );
};

const InputField = ({ label, type = "text", value, onChange }) => (
    <div className="flex justify-between py-2 px-4 items-center">
        <p className="text-xl">{label}</p>
        <input
            type={type}
            className="p-2 border-2 rounded-lg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default AddBtn;
