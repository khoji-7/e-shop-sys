import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import UserModal from "./UserModal";
import { MdEditSquare } from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";

const Table = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/users?page=1`)
            .then((response) => response.json())
            .then((item) => {
                setData(item);
                
            })
            .catch((error) => console.error("Error:", error));
    }, [API_URL]);

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

    const searchData = searchTerm.length >= 2
        ? Array.isArray(data)
            ? data.filter(
                (item) =>
                    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (item.product_name && item.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            : []
        : data;

    // Pagination logic
    const totalItems = searchData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = searchData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="bg-[#f4f4f8] max-w-[1100px] w-[95%] mx-auto mt-4 h-[500px]">
            <TableHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                openModal={openModal}
            />

            <div className="mt-5 h-[420px] overflow-y-scroll">
                <table className="w-full border-[1px] border-gray-400 h-[350px] ">
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
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={item?.id} className="border-2 border-gray-200 h-16">
                                <td className="px-5 py-1">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td
                                    className="px-5 py-1 text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => openModal(item)}
                                >
                                    {item?.name}
                                </td>
                                <td className="px-5 py-1 ">{item?.product_name}</td>
                                <td className="px-5 py-1">{item?.cost} so'm</td>
                                <td className="px-5 py-1">{item?.phone_number}</td>
                                <td className="px-5 py-1">{formatDate(item?.given_day)}</td>
                                <td className="px-5 py-1">{item?.monthly_income} so'm</td>
                                <td className="px-5 py-1">{item?.payment} so'm</td>
                                <td className="px-2 py-4 flex items-center justify-between ">
                                    <button  >
                                       <MdEditSquare className="text-[#4070f4] text-3xl"/>
                                    </button>
                                    <button>
                                        <FaUserXmark className="text-red-400 text-3xl"/>
                                    </button>
                                </td>

                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-1 w-32 rounded-md bg-[#0042fd] text-white rounded hover:bg-[#4070f4] disabled:bg-blue-500"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-1 w-32  rounded-md bg-[#0042fd] text-white rounded hover:bg-[#4070f4] disabled:bg-blue-500"
                >
                    Next
                </button>
            </div>

            {isModalOpen && <UserModal isOpen={isModalOpen} closeModal={closeModal} user={selectedUser} />}
        </div>
    );
};

export default Table;
