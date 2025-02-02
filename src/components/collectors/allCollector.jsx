import React, {useEffect, useState} from "react";

import {MdEditSquare} from "react-icons/md";
import {FaUserXmark} from "react-icons/fa6";

const Collector = () => {
    const [data, setData] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/collector`)
        .then((response) => response.json())
        .then((item) => {
            setData(item);
            console.log("Fetched data:", item);
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);

    console.log("data ", data);

    return (
        <div className="bg-[#f4f4f8] max-w-[1100px] w-[95%] mx-auto mt-4 h-[500px]">
            <div className="mt-5 h-[420px] overflow-y-scroll">
                <table className="w-full border-[1px] border-gray-400 h-[350px] ">
                    <thead className="bg-[#f9fafb] rounded-t-md border-2 border-gray-300">
                        <tr>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Id</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Ismi</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Ishga kirgan vaqti</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Xulosa</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item?.id} className="border-2 border-gray-200 h-16">
                                <td className="px-5 py-1 text-gray-500   cursor-pointer">{item?.id}</td>
                                <td className="px-5 py-1 text-gray-500   cursor-pointer">{item?.collector_name}</td>
                                <td className="px-5 py-1 text-gray-500   cursor-pointer">
                                    {new Date(item.createdat).toLocaleString("en-GB")}
                                </td>
                                <td className="px-5 py-1 text-gray-500   cursor-pointer">{item?.description}</td>


                                <td className="px-2 py-5 gap-3 flex  w-24 h-5 mx-auto ">
                                    <button>
                                        <MdEditSquare className="text-[#4070f4] text-3xl" />
                                    </button>
                                    <button>
                                        <FaUserXmark className="text-red-400 text-3xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Collector;
