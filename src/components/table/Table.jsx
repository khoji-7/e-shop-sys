import React, { useEffect, useState } from "react";
import { MdFilterList, MdAdd } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import UserModal from "./UserModal";  // Modal komponentini import qilish

const Table = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`http://3.77.237.29:3000/users?page=1`)
      .then((response) => response.json())
      .then((item) => setData(item))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Modalni ochish
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Modalni yopish
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-[#f4f4f8] max-w-[1100px] w-[95%] mx-auto">
      <div className="flex justify-between items-center w-[90%]">
        <div className="flex gap-4">
          <button className="flex gap-4 px-4 py-2 bg-white rounded-lg border-[1px] border-gray-300 cursor-pointer">
            <MdFilterList className="text-2xl" />
            <p>Filter</p>
          </button>
          <button className="flex gap-4 px-4 py-2 bg-white rounded-lg bg-[#0042fd] text-white border-gray-400 cursor-pointer">
            <MdAdd className="text-2xl" />
            <p>Add Users</p>
          </button>
        </div>
        <div className="w-80 px-4 py-2 flex gap-4 bg-white rounded-3xl items-center text-gray-400 border-[1px] border-gray-300">
          <IoSearchOutline className="text-2xl" />
          <input type="text" placeholder="Search..." className="px-2 py-1" />
        </div>
      </div>

      {/* Table */}
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
            {data?.map((item, index) => (
              <tr key={item?.id} className="border-2 border-gray-200 h-16">
                <td className="px-5 py-2">{index + 1}</td>
                <td
                  className="px-5 py-2 text-blue-500 hover:underline cursor-pointer"
                  onClick={() => openModal(item)} // Modalni ochish
                >
                  {item?.name}
                </td>
                <td className="px-5 py-2">{item?.product_name}</td>
                <td className="px-5 py-2">{item?.cost} so'm</td>
                <td className="px-5 py-2">{item?.phone_number}</td>
                <td className="px-5 py-2">{item?.given_day}</td>
                <td className="px-5 py-2">{item?.monthly_income} so'm</td>
                <td className="px-5 py-2">{item?.payment} so'm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <UserModal isOpen={isModalOpen} closeModal={closeModal} user={selectedUser} />
      )}
    </div>
  );
};

export default Table;
