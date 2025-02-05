import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const AllZone = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [zoneName, setZoneName] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchZones();
    }, []);

    const fetchZones = () => {
        fetch(`${API_URL}/zones`)
            .then((response) => response.json())
            .then((item) => setData(item))
            .catch((error) => console.error("Error:", error));
    };

    const handleAddZone = async (e) => {
        e.preventDefault();
        const newZone = { zone_name: zoneName, description };

        try {
            await axios.post(`${API_URL}/zones/add`, newZone, {
                headers: { "Content-Type": "application/json" },
            });

            setModal(false);
            setZoneName("");
            setDescription("");
            fetchZones();
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const handleUpdateZone = async (e) => {
        e.preventDefault();
        const updatedZone = { zone_name: zoneName, description };

        try {
            await axios.put(`${API_URL}/zones/update/${editId}`, updatedZone, {
                headers: { "Content-Type": "application/json" },
            });

            setModal(false);
            setZoneName("");
            setDescription("");
            setEditId(null);
            fetchZones();
        } catch (error) {
            console.error("Xatolik:", error);
        }
    };

    const handleDownload = async (zone) => {
        try {
            const response = await axios.get(`http://3.77.237.29:3000/excel-download?zone_name=${zone}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${zone}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Faylni yuklab olishda xatolik:", error);
        }
    };

    return (
        <div>
            <div className="mt-5 h-[420px] overflow-y-scroll">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
                    onClick={() => {
                        setModal(true);
                        setEditId(null);
                        setZoneName("");
                        setDescription("");
                    }}
                >
                    Add zone
                </button>
                <table className="w-full border-[1px] border-gray-400 h-[350px]">
                    <thead className="bg-[#f9fafb] rounded-t-md border-2 border-gray-300">
                        <tr>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Id</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Joy nomi</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Malumot</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Vaqti</th>
                            <th className="py-2 px-5 text-gray-600 font-medium text-[16px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="border-2 border-gray-200 h-16">
                                <td className="px-5 py-1">{item.id}</td>
                                <td className="px-5 py-1">{item.zone_name}</td>
                                <td className="px-5 py-1">{item.description}</td>
                                <td className="px-5 py-1">
                                    {new Date(item.createdat).toLocaleString("en-GB")}
                                </td>
                                <td className="px-5 py-1 flex gap-2">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                                        onClick={() => {
                                            setEditId(item.id);
                                            setZoneName(item.zone_name);
                                            setDescription(item.description);
                                            setModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded-md"
                                        onClick={() => handleDownload(item.zone_name)}
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
                    <div className="p-4 bg-white rounded-lg max-w-[500px] w-[90%] relative flex col-span-1">
                        <button
                            onClick={() => setModal(false)}
                            className="top-1 right-3 absolute bg-red-400 text-white p-2 rounded-md"
                        >
                            <FaTimes />
                        </button>
                        <form className="flex gap-2 flex-col px-4 py-2" onSubmit={editId ? handleUpdateZone : handleAddZone}>
                            <input
                                type="text"
                                placeholder="Zone name"
                                className="border px-2 py-1 rounded-md"
                                value={zoneName}
                                onChange={(e) => setZoneName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                className="border px-2 py-1 rounded-md"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                                {editId ? "Update" : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllZone;
