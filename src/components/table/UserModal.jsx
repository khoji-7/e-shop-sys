import React, { useEffect, useState, useRef } from "react";

const UserModal = ({ user, closeModal }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Close the modal if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  // Fetch payment history when user changes
  useEffect(() => {
    if (user?.id) {
      fetch(`${API_URL}/payment/history/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setPaymentHistory(data.result || []); // Ensure that you access the `result` array
        })
        .catch((error) => setError("To'lov tarixini olishda xatolik yuz berdi"));
    }
  }, [user?.id, API_URL]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  if (!user) return null;

  const givenDayFormatted = formatDate(user.given_day);
  const updatedAtFormatted = formatDate(user.updatedat);

  const paymentStatus = user.payment_status ? "To'landi" : "Qarz";
  const paymentStatusColor = user.payment_status ? "text-green-500" : "text-red-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50 max-h-full  transition-all">
      <div
        ref={modalRef}
        className="bg-white p-6 h-[90vh] rounded-lg w-4/5 max-w-4xl overflow-y-scroll transition-all" 
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mijoz Malumotlari</h2>
        </div>

        <div className="mt-4">
          <table className="min-w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden">
            <tbody>
              <tr className="bg-gray-100">
                <td className="py-2 px-6 text-gray-700">Ismi</td>
                <td className="py-2 px-6 text-gray-900">{user.name}</td>
              </tr>
              <tr>
                <td className="py-2 px-6 text-gray-700">Telefon raqami</td>
                <td className="py-2 px-6 text-gray-900">{user.phone_number}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-2 px-6 text-gray-700">Qo'shimcha telefon raqami</td>
                <td className="py-2 px-6 text-gray-900">{user.phone_number2}</td>
              </tr>
              <tr>
                <td className="py-2 px-6 text-gray-700">Mahsulot nomi</td>
                <td className="py-2 px-6 text-gray-900">{user.product_name}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-2 px-6 text-gray-700">Narxi</td>
                <td className="py-2 px-6 text-gray-900">{user.cost} so'm</td>
              </tr>
              <tr>
                <td className="py-2 px-6 text-gray-700">Oylik to'lov</td>
                <td className="py-2 px-6 text-gray-900">{user.monthly_income} so'm</td>
              </tr>

              <tr className="bg-gray-100">
                <td className="py-2 px-6 text-gray-700">Manzili</td>
                <td className="py-2 px-6 text-gray-900">{user.zone}</td>
              </tr>
              <tr>
                <td className="py-2 px-6 text-gray-700">Berilgan vaqti</td>
                <td className="py-2 px-6 text-gray-900">{givenDayFormatted}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-2 px-6 text-gray-700">To'lov muddati kungacha</td>
                <td className="py-2 px-6 text-gray-900">{updatedAtFormatted}</td>
              </tr>
              <tr>
                <td className="py-2 px-6 text-gray-700">Ish joyi</td>
                <td className="py-2 px-6 text-gray-900">{user.workplace}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-2 px-6 text-gray-700">Olingan muddati</td>
                <td className="py-2 px-6 text-gray-900">{user.time} oyga</td>
              </tr>
              <tr>
                <td className="py-2 px-6 text-gray-700">O'tgan oylik tolov holati</td>
                <td className={`py-2 px-6 ${paymentStatusColor}`}>{paymentStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment History */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">To'lov Tarixi</h3>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {paymentHistory.length > 0 ? (
            <table className="min-w-full table-auto border-collapse mt-4 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-6 text-left text-gray-700">Yig'uvchi</th>
                  <th className="py-2 px-6 text-left text-gray-700">Sana</th>
                  <th className="py-2 px-6 text-left text-gray-700">Miqdor</th>
                  <th className="py-2 px-6 text-left text-gray-700">Oy</th>
                  <th className="py-2 px-6 text-left text-gray-700">To'lov holati</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-2 px-6 text-gray-900">{payment.collector}</td>
                    <td className="py-2 px-6 text-gray-900">{formatDate(payment.payment_date)}</td>
                    <td className="py-2 px-6 text-gray-900">{payment.payment_amount} so'm</td>
                    <td className="py-2 px-6 text-gray-900">{payment.payment_month}</td>
                    <td className="py-2 px-6 text-gray-900">{payment.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-2 text-gray-600">To'lov tarixi mavjud emas.</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={closeModal}
            className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
