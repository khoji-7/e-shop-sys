import React, {useEffect, useState} from "react";
import TableHeader from "./TableHeader"; // Import the TableHeader component
import UserModal from "./UserModal"; // Modal component import

const Table = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Search state

    useEffect(() => {
        fetch(`http://3.77.237.29:3000/users?page=1`)
        .then((response) => response.json())
        .then((item) => setData(item))
        .catch((error) => {
            console.error("Error:", error);
        });
    }, []);

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    // Filter data based on search term (for name)
    const searchData =
        searchTerm.length >= 2
            ? data.filter(
                  (item) =>
                      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : data;

    return (
        <div className="bg-[#f4f4f8] max-w-[1100px] w-[95%] mx-auto mt-4">
            <TableHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Table content remains the same */}
            <div className="mt-5">
                <table className="w-full border-[1px] border-gray-400">
                    <thead className="bg-[#f9fafb] rounded-t-md border-2 border-gray-300">
                        <tr>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Id</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Ismi</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Mahsulot nomi</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Narxi</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Raqami</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Berilgan vaqti</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Oylik to'lov</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Oldindan to'lov</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchData?.map((item, index) => (
                            <tr key={item?.id} className="border-2 border-gray-200 h-16">
                                <td className="px-5 py-2">{index + 1}</td>
                                <td
                                    className="px-5 py-2 text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => openModal(item)}
                                >
                                    {item?.name}
                                </td>
                                <td className="px-5 py-2">{item?.product_name}</td>
                                <td className="px-5 py-2">{item?.cost} so'm</td>
                                <td className="px-5 py-2">{item?.phone_number}</td>
                                <td className="px-5 py-2">{formatDate(item?.given_day)}</td>
                                <td className="px-5 py-2">{item?.monthly_income} so'm</td>
                                <td className="px-5 py-2">{item?.payment} so'm</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && <UserModal isOpen={isModalOpen} closeModal={closeModal} user={selectedUser} />}
        </div>
    );
};

export default Table;
