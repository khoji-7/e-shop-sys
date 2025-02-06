import React, { useState } from "react";
import UserModal from "../table/UserModal";

const TodayPaidUsers = ({ users, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 backdrop-blur-md flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-full">
                <h2 className="text-xl font-bold mb-4">Bugun To'laganlar Ro'yxati</h2>
                <div className="overflow-auto max-h-[500px] w-full">
                    <table className="w-full border border-gray-400">
                        <thead className="bg-gray-100 border-2 border-gray-300">
                            <tr>
                                {["Id", "Ismi", "Mahsulot nomi", "Narxi", "Berilgan vaqti", "Muddati", "Qo'shimcha", "Tel nomer", "Yig'uvchi"].map((header) => (
                                    <th key={header} className="py-2 px-5 text-gray-600 font-medium">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((item) => (
                                    <tr key={item?.id} className="border-2 border-gray-200 h-16 text-gray-500">
                                        <td className="px-5 py-1">{item?.id}</td>
                                        <td className="px-5 py-1 cursor-pointer" onClick={() => openModal(item)}>{item.name}</td>
                                        <td className="px-5 py-1">{item?.product_name}</td>
                                        <td className="px-5 py-1">{item?.cost}</td>
                                        <td className="px-5 py-1">{new Date(item.given_day).toLocaleString("en-GB")}</td>
                                        <td className="px-5 py-1">{item?.time} oy</td>
                                        <td className="px-5 py-1">{item?.description}</td>
                                        <td className="px-5 py-1">{item?.phone_number}</td>
                                        <td className="px-5 py-1">{item?.collector}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">Ma'lumotlar mavjud emas</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <button onClick={onClose} className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg">Yopish</button>
            </div>

            {isModalOpen && <UserModal user={selectedUser} onClose={closeModal} />}
        </div>
    );
};

export default TodayPaidUsers;
