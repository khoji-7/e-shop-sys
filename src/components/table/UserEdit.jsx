import React, { useState, useEffect } from "react";

const UserEditModal = ({ isOpen, closeModal, user, updateUser }) => {
    const [formData, setFormData] = useState({
        name: "",
        product_name: "",
        cost: "",
        phone_number: "",
        phone_number2: "",
        workplace: "",
        time: "",
        zone: "",
        seller: "",
        collector: "",
        passport_series: "",
        description: "",
        given_day: "",
    });

    const API_URL = process.env.REACT_APP_API_URL;

    // Agar user mavjud bo‘lsa, formData ni yangilash
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
        try {
            const response = await fetch(`${API_URL}/users/update/${user?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                updateUser(updatedUser);
                closeModal();
            } else {
                alert("Xatolik yuz berdi!");
            }
        } catch (error) {
            alert("Xatolik: " + error);
        }
    };

    const fields = [
        { name: "name", label: "Ism", type: "text" },
        { name: "product_name", label: "Mahsulot nomi", type: "text" },
        { name: "cost", label: "Narxi", type: "number" },
        { name: "phone_number", label: "Telefon raqami", type: "text" },
        { name: "phone_number2", label: "Qo‘shimcha telefon raqam", type: "text" },
        { name: "workplace", label: "Ish joyi", type: "text" },
        { name: "time", label: "Vaqt", type: "datetime-local" },
        { name: "zone", label: "Hudud", type: "text" },
        { name: "seller", label: "Sotuvchi", type: "text" },
        { name: "collector", label: "Yig‘uvchi", type: "text" },
        { name: "passport_series", label: "Pasport seriyasi", type: "text" },
        { name: "description", label: "Izoh", type: "text" },
        { name: "given_day", label: "Berilgan sana", type: "datetime-local" },
    ];

    if (!isOpen || !user) return null; // user null bo‘lsa, hech narsa return qilmaymiz

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-md bg-opacity-50">
            <div className="bg-white p-6 rounded-lg  max-w-[80%] ">
                <h2 className="text-xl font-bold mb-4 text-center">Foydalanuvchini tahrirlash</h2>
                <form onSubmit={handleSubmit} className="w-80%  grid grid-cols-2  gap-3  items-end ">
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
                    <button type="submit" className="px-4 py-1 bg-blue-500 text-white  w-40 rounded-md h-10">
                        Saqlash
                    </button>
                </form>
                <button onClick={closeModal} className="mt-2 w-40 bg-gray-500 text-white p-2 rounded-md">
                    Bekor qilish
                </button>
            </div>
        </div>
    );
};

export default UserEditModal;
