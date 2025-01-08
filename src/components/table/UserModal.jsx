import React, { useEffect, useRef } from 'react';



const UserModal = ({ user, closeModal }) => {
  const modalRef = useRef(null); // Ref to detect clicks outside of the modal

  // Close the modal when clicking outside the modal area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Close the modal if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  if (!user) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()); // Kun
    const month = String(date.getMonth()+1); // Oy (0-based index, shuning uchun +1)
    const year = date.getFullYear(); // Yil
  
    return `${day}.${month}.${year}`; // Kun Oy Yil formatida qaytarish
  };

  const givenDayFormatted = formatDate(user.given_day);
  const updatedAtFormatted = formatDate(user.updatedat);

  

  const paymentStatus = user.payment_status ? "To'landi" : "Qarz";
  const paymentStatusColor = user.payment_status ? "text-green-500" : "text-red-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div
        ref={modalRef} // Attach the ref to the modal container
        className="bg-white p-6 rounded-lg w-4/5 max-w-4xl overflow-auto"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">User Details</h2>
        </div>

        {/* Table Layout inside the Modal */}
        <div className="mt-4">
          <table className="min-w-full table-auto border-collapse">
            <tbody>
              <tr>
                <td className="py-2 px-4">Ismi</td>
                <td className="py-2 px-4">{user.name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Telefon raqami</td>
                <td className="py-2 px-4">{user.phone_number}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Qo'shimcha telefon raqami</td>
                <td className="py-2 px-4">{user.phone_number2}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Mahsulot nomi</td>
                <td className="py-2 px-4">{user.product_name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Narxi</td>
                <td className="py-2 px-4">{user.cost} so'm</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Oylik to'lov</td>
                <td className="py-2 px-4">{user.monthly_income} so'm</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Oldindan To'lov</td>
                <td className="py-2 px-4">{user.payment} so'm</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Manzili</td>
                <td className="py-2 px-4">{user.address}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Berilgan vaqti</td>
                <td className="py-2 px-4">{givenDayFormatted}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">To'lov muddati kungacha</td>
                <td className="py-2 px-4">{updatedAtFormatted}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Ish joyi</td>
                <td className="py-2 px-4">{user.workplace}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Olingan muddati</td>
                <td className="py-2 px-4">{user.time} oyga</td>
              </tr>
              <tr>
                <td className="py-2 px-4">O'tgan oylik tolov holati</td>
                <td className={`py-2 px-4 ${paymentStatusColor}`}>{paymentStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal} // Close on clicking the close button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;