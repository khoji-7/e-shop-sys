import React, { useState, useEffect, useCallback } from "react";

const PaymentModal = ({ isOpen, closeModal, handlePayment, userName }) => {
  const [amount, setAmount] = useState("");
  const [collector, setCollector] = useState("");
  const [paymentMonth, setPaymentMonth] = useState(""); // This state will hold the selected month
  const [description, setDescription] = useState("");

  const [collectors, setCollectors] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchCollectors = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/collector`);
      const result = await response.json();
      setCollectors(result);
    } catch (error) {
      console.error("Error fetching collectors:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    if (isOpen) {
      fetchCollectors();
    }
  }, [isOpen, fetchCollectors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = {
      amount,
      collector,
      payment_month: paymentMonth,
      description,
    };
    handlePayment(paymentData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">To'lov qilish</h2>
        <form onSubmit={handleSubmit}>
          {/* Foydalanuvchi ismini ko'rsatish */}
          <p className="mb-4 text-lg font-semibold">Foydalanuvchi: {userName}</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Miqdor
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              To'lovni oluvchi
            </label>
            <select
              value={collector}
              onChange={(e) => setCollector(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Yig'uvchini tanlang</option>
              {collectors?.map((item) => (
                <option key={item?.id} value={item?.collector_name}>
                  {item?.collector_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              To'lov oyi
            </label>
            <select
              value={paymentMonth}
              onChange={(e) => setPaymentMonth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Oy tanlang</option>
              <option value="January">Yanvar</option>
              <option value="February">Fevral</option>
              <option value="March">Mart</option>
              <option value="April">Aprel</option>
              <option value="May">May</option>
              <option value="June">Iyun</option>
              <option value="July">Iyul</option>
              <option value="August">Avgust</option>
              <option value="September">Sentyabr</option>
              <option value="October">Oktabr</option>
              <option value="November">Noyabr</option>
              <option value="December">Dekabr</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Izoh
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              To'lov qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;