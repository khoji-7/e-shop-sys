import React from "react";

const PaymentList = ({ type, users, onClose }) => {
    const titles = {
        notPaid: "To'lamaganlar Ro'yxati",
        todayPaid: "Bugun To'laganlar Ro'yxati",
        monthPaid: "Bu Oy To'laganlar Ro'yxati"
    };

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
                            {users.map((item) => (
                                <tr key={item.id} className="border-2 border-gray-200 h-16 text-gray-500">
                                    <td className="px-5 py-1">{item.id}</td>
                                    <td className="px-5 py-1">{item.name}</td>
                                    <td className="px-5 py-1">{item.product_name}</td>
                                    <td className="px-5 py-1">{item.cost}</td>
                                    <td className="px-5 py-1">{new Date(item.given_day).toLocaleString("en-GB")}</td>
                                    <td className="px-5 py-1">{item.time} oy</td>
                                    <td className="px-5 py-1">{item.description}</td>
                                    <td className="px-5 py-1">{item.phone_number}</td>
                                    <td className="px-5 py-1">{item.collector}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Yopish
                </button>
            </div>
        </div>
    );
};

export default PaymentList;
