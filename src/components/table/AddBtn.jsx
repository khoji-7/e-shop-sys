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
    const [collectors, setCollectors] = useState([]);
    const [zones, setZones] = useState([]);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!API_URL) {
            console.error("API URL aniqlanmagan! Iltimos, .env faylni tekshiring.");
            return;
        }
        fetchCollectors();
        fetchZones();
    }, []);

    const fetchZones = async () => {
        try {
            const response = await fetch(`${API_URL}/zones`);
            const data = await response.json();
            setZones(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Manzillarni yuklashda xatolik:", error);
        }
    };

    const fetchCollectors = async () => {
        try {
            const response = await fetch(`${API_URL}/collector`);
            const data = await response.json();
            setCollectors(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Yig'uvchilarni yuklashda xatolik:", error);
        }
    };

    const postMethod = async (e) => {
        e.preventDefault();

        if (!name || !productName || !zone || !collector) {
            alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
            return;
        }

        const formattedTime = time ? new Date().setMonth(new Date().getMonth() + Number(time)) : null;
        const formattedGivenDay = givenDay ? new Date(givenDay).toISOString() : null;

        const formData = {
            name,
            product_name: productName,
            cost: cost || "0",
            phone_number: phoneNumber,
            phone_number2: phoneNumber2,
            workplace,
            time: formattedTime ? new Date(formattedTime).toISOString() : "",
            zone,
            seller,
            collector,
            passport_series: passportSeries,
            description,
            given_day: formattedGivenDay,
        };

        try {
            const response = await fetch(`http://3.77.237.29:3000/api-swagger/users/add`, {
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
    };

    return (
        <div className="h-70vh max-w-[1000px] w-90% mx-auto">
            <form onSubmit={postMethod} className="grid grid-cols-2 gap-4">
                <InputField label="Ismi" value={name} onChange={setName} required />
                <InputField label="Mahsulot nomi" value={productName} onChange={setProductName} required />
                <InputField label="Narxi" value={cost} onChange={setCost} />
                <InputField label="Telefon raqami" value={phoneNumber} onChange={setPhoneNumber} />
                <InputField label="2 - Telefon raqami" value={phoneNumber2} onChange={setPhoneNumber2} />
                <InputField label="Ish joyi" value={workplace} onChange={setWorkplace} />
                <InputField label="Pasport seriyasi" value={passportSeries} onChange={setPassportSeries} />
                <InputField label="Berilgan Vaqti" type="date" value={givenDay} onChange={setGivenDay} />
                <InputField label="Nechi oyga berildi" value={time} onChange={setTime} />
                <InputField label="Qo'shimcha ma'lumot" value={description} onChange={setDescription} />
                <InputField label="Sotuvchi" value={seller} onChange={setSeller} />

                <DropdownField label="Manzilni Tanlang" value={zone} onChange={setZone} options={zones} required />
                <DropdownField label="Yig'uvchi" value={collector} onChange={setCollector} options={collectors} required />

                <button type="submit" className="col-span-2 p-2 bg-blue-500 max-w-36 text-white rounded-lg">
                    Yuborish
                </button>
            </form>
        </div>
    );
};

const InputField = ({ label, type = "text", value, onChange, required }) => (
    <div className="flex flex-col">
        <label className="text-xl">{label}</label>
        <input
            type={type}
            className="p-2 border-2 rounded-lg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
        />
    </div>
);

const DropdownField = ({ label, value, onChange, options, required }) => (
    <div className="flex flex-col">
        <label className="text-xl">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            required={required}
        >
            <option value="">{label}</option>
            {options?.map((item) => (
                <option key={item.id} value={ item?.zone_name || item?.collector_name}>
                    {item.name || item.zone_name || item.collector_name}
                </option>
            ))}
        </select>
    </div>
);

export default AddBtn;
