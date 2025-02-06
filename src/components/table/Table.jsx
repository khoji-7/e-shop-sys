import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import UserModal from "./UserModal";
import UserEditModal from "./UserEdit";
import PaymentModal from "./Payment"; // New component for payment modal
import { MdEditSquare } from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa"; // Icon for payment button

const Table = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State for payment modal
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch data from the API
    useEffect(() => {
        fetch(`${API_URL}/users?page=${currentPage}`)
            .then((response) => response.json())
            .then((item) => setData(item))
            .catch((error) => console.error("Error:", error));
    }, [API_URL, currentPage]);

    // Open user details modal
    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    

    // Close user details modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    // Open edit modal
    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    // Close edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    // Open payment modal
    const openPaymentModal = (user) => {
        setSelectedUser(user);
        setIsPaymentModalOpen(true);
    };

    // Close payment modal
    const closePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setSelectedUser(null);
    };

    // Handle user deletion
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

    // Update user data
    const updateUser = (updatedUser) => {
        setData((prevData) => prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    };

    const handlePayment = async (paymentData) => {
        try {
            const response = await fetch(`${API_URL}/payment/add/${selectedUser.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentData),
            });
    
            if (response.ok) {
                alert("To'lov muvaffaqiyatli amalga oshirildi!");
                closePaymentModal();
            } else {
                alert("Xatolik");
                console.log("To'lovda xatolik yuz berdi");
            }
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };
    
    // Filter data based on search term
    const searchData =
        searchTerm.length >= 3
            ? data.filter(
                  (item) =>
                      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (item.product_name && item.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
              )
            : data;

    const totalItems = searchData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Paginate data
    const paginatedData = searchData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // Handle previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };




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
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Status</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={item.id} className="border-2 border-gray-200 h-16">
                                <td className="px-5 py-1">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td className="px-5 py-1 cursor-pointer" onClick={() => openModal(item)}>
                                    {item.name}
                                </td>
                                <td className="px-5 py-1">{item.product_name}</td>
                                <td className="px-5 py-1">{item.cost} so'm</td>
                                <td className="px-5 py-1">{item.phone_number}</td>
                                <td className="px-5 py-1">
                                    <span className={item?.payment_status ? "text-green-500" : "text-red-500"}>
                                        {item.payment_status ? "To'landi" : "To'lanmadi"}
                                    </span>
                                </td>
                                <td className="px-2 py-4 flex items-center justify-between">
                                    <button onClick={() => openEditModal(item)}>
                                        <MdEditSquare className="text-[#4070f4] text-3xl" />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)}>
                                        <FaUserXmark className="text-red-400 text-3xl" />
                                    </button>
                                    <button onClick={() => openPaymentModal(item)}>
                                        <FaMoneyCheckAlt className="text-green-500 text-3xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-2">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 ${
                        currentPage === 1
                            ? "text-white cursor-not-allowed bg-blue-400 rounded-md"
                            : "text-white bg-blue-600 rounded-md"
                    }`}
                >
                    Previous
                </button>
                <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 ${
                        currentPage === totalPages
                            ? "text-white cursor-not-allowed bg-blue-400 rounded-md"
                            : "text-white bg-blue-600 rounded-md"
                    }`}
                >
                    Next
                </button>
            </div>

            {isModalOpen && <UserModal user={selectedUser} closeModal={closeModal} />}

            <UserEditModal
                isOpen={isEditModalOpen}
                closeModal={closeEditModal}
                user={selectedUser}
                updateUser={updateUser}
            />

            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    closeModal={closePaymentModal}
                    handlePayment={handlePayment}
                />
            )}
        </div>
    );
};

export default Table;