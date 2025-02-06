import React, { useState } from 'react';
import UserModal from '../table/UserModal';

const PaymentList = ({ type, users, onClose }) => {
    console.log('Users:', users);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const titles = {
        notPaid: "To'lamaganlar Ro'yxati",
        todayPaid: "Bugun To'laganlar Ro'yxati",
        monthPaid: "Bu Oy To'laganlar Ro'yxati"
    };
    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    

    // Close user details modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };
    const paymentData = Array.isArray(users) ? users.flat() : [];

    return (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 backdrop-blur-md flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-full">
                <h2 className="text-xl font-bold mb-4">{titles[type]}</h2>
                <div className="overflow-auto max-h-[500px] w-full">
                    <table className="w-full border border-gray-400">
                        <thead className="bg-gray-100 border-2 border-gray-300">
                            <tr>
                                {["Id", "Ismi", "Mahsulot nomi", "Narxi", "Berilgan vaqti", "Muddati", "Qo'shimcha", "Tel nomer", "Yig'uvchi"].map((header) => (
                                    <th key={header} className="py-2 px-5 text-gray-600 font-medium">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData?.length > 0 ? (
                                paymentData.map((user) => (
                                    <tr key={user?.id} className="border-2 border-gray-200 h-16 text-gray-500">
                                        <td className="px-5 py-1">{user?.id}</td>
                                        <td className="px-5 py-1 cursor-pointer" onClick={() => openModal(user)} >{user?.name || 'Noma\'lum'}</td>
                                        <td className="px-5 py-1">{user?.product_name || 'Noma\'lum'}</td>
                                        <td className="px-5 py-1">{user?.cost || 'Noma\'lum'}</td>
                                        <td className="px-5 py-1">{user?.given_day ? new Date(user.given_day).toLocaleString("en-GB") : 'Noma\'lum'}</td>
                                        <td className="px-5 py-1">{user?.time || 'Noma\'lum'}</td>
                                        <td className="px-5 py-1">{user?.description || 'Noma\'lum'}</td>
                                        <td className="px-5 py-1">{user?.phone_number || 'Noma\'lum'}</td>
                                        <td className="px-5 py-1">{user?.collector || 'Noma\'lum'}</td>
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
            {isModalOpen && <UserModal user={selectedUser} closeModal={closeModal} />}
        </div>
    );
};

export default PaymentList;
