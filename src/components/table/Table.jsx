import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import UserModal from "./UserModal";
import UserEditModal from "./UserEdit";
import PaymentModal from "./Payment";
import { MdEditSquare } from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Table = () => {
  const [data, setData] = useState([]);
  const [zones, setZones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedZone, setSelectedZone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectPayUser, setSelecPaytUser] = useState("");
  const [totalPages, setTotalPages] = useState(1); // Sahifalar soni
  const itemsPerPage = 20;

  const API_URL = process.env.REACT_APP_API_URL;

  // Foydalanuvchilar sonini olish
  const fetchUserCount = async () => {
    try {
      const response = await fetch(`${API_URL}/users/count`);
      if (!response.ok) {
        throw new Error("Foydalanuvchilar sonini olishda xatolik yuz berdi");
      }
      const { count } = await response.json();
      // Sahifalar sonini hisoblash
      const calculatedPages = Math.ceil(count / itemsPerPage);
      setTotalPages(calculatedPages);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!API_URL) {
      setError("API URL aniqlanmagan! Iltimos, .env faylni tekshiring.");
      return;
    }
  
    const fetchUserCount = async () => {
      try {
        const response = await fetch(`${API_URL}/users/count`);
        if (!response.ok) {
          throw new Error("Foydalanuvchilar sonini olishda xatolik yuz berdi");
        }
        const { count } = await response.json();
        setTotalPages(Math.ceil(count / itemsPerPage));
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        // Foydalanuvchilar sonini olish
        await fetchUserCount();
  
        // Foydalanuvchilar ma'lumotlarini olish
        let url = `${API_URL}/users?page=${currentPage}`;
        if (selectedZone) {
          url += `&zone=${selectedZone}`;
        }
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
        }
        const responseData = await response.json();
        setData(responseData.data || responseData);
  
        // Zonalar ma'lumotlarini olish
        const zonesResponse = await fetch(`${API_URL}/zones`);
        if (!zonesResponse.ok) {
          throw new Error("Zonelarni yuklashda xatolik yuz berdi");
        }
        const zonesData = await zonesResponse.json();
        setZones(zonesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [currentPage, selectedZone, API_URL]);

  // Paginationni boshqarish
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Modal funksiyalari
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

  const openPaymentModal = (user,userName) => {
    setSelectedUser(user);
    setIsPaymentModalOpen(true);
    setSelecPaytUser(userName)
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedUser(null);
  };

  // Foydalanuvchini o'chirish
  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(`${user.name} ni o'chirmoqchimisiz?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/users/delete/${user.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((u) => u.id !== user.id));
      } else {
        throw new Error("Xatolik yuz berdi!");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Foydalanuvchini yangilash
  const updateUser = (updatedUser) => {
    setData((prevData) =>
      prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    closeEditModal();
  };

  // To'lovni amalga oshirish
  const handlePayment = async (paymentData) => {
    try {
      const response = await fetch(
        `${API_URL}/payment/add/${selectedUser.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (response.ok) {
        alert("To'lov muvaffaqiyatli amalga oshirildi!");
        closePaymentModal();
        const updatedData = data.map((user) =>
          user.id === selectedUser.id ? { ...user, payment_status: true } : user
        );
        setData(updatedData);
      } else {
        throw new Error("Xatolik");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Filtrlash
  const filteredData = data.filter((item) => {
    const matchesSearch =
      searchTerm.length >= 3
        ? (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.product_name &&
            item.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
    const matchesZone = selectedZone
      ? item.zone === selectedZone.toString()
      : true;

    return matchesSearch && matchesZone;
  });

  return (
    <div className="bg-[#f4f4f8] max-w-[1100px] w-[95%] mx-auto mt-2 min-h-[500px]">
      <TableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        zones={zones}
        setData={setData}
      />

      {loading ? (
        <div className="text-center mt-4">Yuklanmoqda...</div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : (
        <>
          <div className="mt-3 h-96 overflow-y-scroll">
            <table className="w-full border-[1px] border-gray-400 h-80 overflow-y-scroll">
              <thead className="bg-[#f9fafb] rounded-t-md border-2 border-gray-300">
                <tr>
                  <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">
                    Id
                  </th>
                  <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">
                    Ismi
                  </th>
                  <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">
                    Manzili
                  </th>
                  <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">
                    Narxi
                  </th>
                  <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">
                    Telefon
                  </th>
                  <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">
                    Status
                  </th>
                  <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="border-2 border-gray-200 h-16">
                    <td className="px-5 py-1">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td
                      className="px-5 py-1 cursor-pointer"
                      onClick={() => openModal(item)}
                    >
                      {item.name}
                    </td>
                    <td className="px-5 py-1">{item.zone}</td>
                    <td className="px-5 py-1">
                      {Number(item.cost).toLocaleString()} so'm
                    </td>
                    <td className="px-5 py-1">{item.phone_number}</td>
                    <td className="px-5 py-1">
                      <span
                        className={
                          item?.payment_status ? "text-green-500" : "text-red-500"
                        }
                      >
                        {item.payment_status ? "To'landi" : "To'lanmadi"}
                      </span>
                    </td>
                    <td className="px-2 py-4 flex items-center justify-between">
                      <button onClick={() => openEditModal(item)}>
                        <MdEditSquare className="text-[#4070f4] text-3xl" />
                      </button>
                      <button onClick={() => handleDelete(item)}>
                        <FaUserXmark className="text-red-400 text-3xl" />
                      </button>
                      <button onClick={() => openPaymentModal(item,item.name)}>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Next
            </button>
          </div>
        </>
      )}

      {isModalOpen && <UserModal user={selectedUser} closeModal={closeModal} />}
      <UserEditModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        user={selectedUser}
        updateUser={updateUser}
      />
      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          closeModal={closePaymentModal}
          handlePayment={handlePayment}
          userName={selectPayUser}
        />
      )}
    </div>
  );
};

export default Table;