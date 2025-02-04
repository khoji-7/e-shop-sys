import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import UserModal from "./UserModal";
import UserEditModal from "./UserEdit"; // Yangi komponentni import qilish
import { MdEditSquare } from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";

const Table = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/users?page=1`)
            .then((response) => response.json())
            .then((item) => setData(item))
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

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/users/delete/${id}`, { method: "DELETE" });

            if (response.ok) {
                setData((prevData) => prevData.filter((user) => user.id !== id));
            } else {
                console.error("Xatolik yuz berdi!");
            }
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const updateUser = (updatedUser) => {
        setData((prevData) => prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    };

    const searchData = searchTerm.length >= 2
        ? data.filter(
            (item) =>
                (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.product_name && item.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : data;

    const totalItems = searchData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = searchData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-[#f4f4f8] max-w-[1100px] w-[95%] mx-auto mt-4 h-[500px]">
            <TableHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} openModal={openModal} />

            <div className="mt-5 h-[420px] overflow-y-scroll">
                <table className="w-full border-[1px] border-gray-400 h-[350px]">
                    <thead className="bg-[#f9fafb] rounded-t-md border-2 border-gray-300">
                        <tr>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Id</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Ismi</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Mahsulot nomi</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Narxi</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Telefon</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={item.id} className="border-2 border-gray-200 h-16">
                                <td className="px-5 py-1">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td className="px-5 py-1">{item.name}</td>
                                <td className="px-5 py-1">{item.product_name}</td>
                                <td className="px-5 py-1">{item.cost} so'm</td>
                                <td className="px-5 py-1">{item.phone_number}</td>
                                <td className="px-2 py-4 flex items-center justify-between">
                                    <button onClick={() => openEditModal(item)}>
                                        <MdEditSquare className="text-[#4070f4] text-3xl" />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)}>
                                        <FaUserXmark className="text-red-400 text-3xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-1">
    <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
    >
        Previous
    </button>
    <span className="text-gray-600">
        Page {currentPage} of {totalPages}
    </span>
    <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
    >
        Next
    </button>
</div>


            <UserEditModal isOpen={isEditModalOpen} closeModal={closeEditModal} user={selectedUser} updateUser={updateUser} />
        </div>
    );
};

export default Table;
