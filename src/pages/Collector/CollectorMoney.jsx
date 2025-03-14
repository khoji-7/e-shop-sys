import React, { useEffect, useState } from "react";

const CollectorMoney = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/collector/all-money`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Serverdan noto‘g‘ri javob keldi");
        }
        return response.json();
      })
      .then((result) => setData(result))
      .catch((err) => {
        console.error("Fetch xatosi:", err);
        setError("Ma'lumotlarni olishda xatolik yuz berdi");
      });
  }, [API_URL]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Yuklanmoqda...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Yig'uvchilar yig'gan To'lovlar
      </h2>

      {data?.result?.length > 0 ? (
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-6 text-left text-gray-700">Yig'uvchi</th>
              <th className="py-2 px-6 text-left text-gray-700">Miqdor</th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-6 text-gray-900">
                  {item.collector_name}
                </td>
                <td className="py-2 px-6 text-gray-900">
                  {Number(item.total_collected).toLocaleString()} so'm
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Hozircha ma'lumotlar mavjud emas.</p>
      )}
    </div>
  );
};

export default CollectorMoney;