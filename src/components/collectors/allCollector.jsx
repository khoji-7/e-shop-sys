import React, { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Collector = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({ type: null, isOpen: false });
  const [collector, setCollector] = useState({ name: "", description: "" });
  const [editingCollector, setEditingCollector] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchCollectors = async () => {
    try {
      const response = await fetch(`${API_URL}/collector`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching collectors:", error);
    }
  };

  useEffect(() => {
    fetchCollectors();
  }, []);

  const toggleModal = (type = null, collector = null) => {
    if (type === "edit" && collector) {
      setEditingCollector(collector);
      setCollector({ name: collector.collector_name, description: collector.description });
    } else {
      setEditingCollector(null);
      setCollector({ name: "", description: "" });
    }
    setModal({ type, isOpen: !!type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCollector = {
      collector_name: collector.name,
      description: collector.description,
    };

    try {
      const response = await fetch(`${API_URL}/collector/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCollector),
      });

      if (response.ok) {
        fetchCollectors();
        toggleModal();
      }
    } catch (error) {
      console.error("Error adding collector:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editingCollector || !editingCollector.id) return;

    console.log("Editing collector ID:", editingCollector.id);

    const updatedCollector = {
      collector_name: collector.name,
      description: collector.description,
    };

    try {
      const response = await fetch(`${API_URL}/collector/update/${editingCollector.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCollector),
      });

      if (response.ok) {
        fetchCollectors();
        toggleModal();
      } else {
        console.error("Error updating collector:", await response.text());
      }
    } catch (error) {
      console.error("Error editing collector:", error);
    }
  };

  return (
    <div className="bg-[#f4f4f8] max-w-[1100px] w-[95%] mx-auto mt-4 h-[500px]">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-2" onClick={() => toggleModal("add")}>
        Add Collector
      </button>

      <div className="mt-5 h-[550px] overflow-y-scroll">
        <table className="w-full border border-gray-400 h-[550px]">
          <thead className="bg-[#f9fafb] border-2 border-gray-300">
            <tr>
              <th className="py-2 px-5 text-gray-600 font-medium">Id</th>
              <th className="py-2 px-5 text-gray-600 font-medium">Ismi</th>
              <th className="py-2 px-5 text-gray-600 font-medium">Ishga kirgan vaqti</th>
              <th className="py-2 px-5 text-gray-600 font-medium">Xulosa</th>
              <th className="py-2 px-5 text-gray-600 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border-2 border-gray-200 h-16">
                <td className="px-5 py-1 text-gray-500">{item.id}</td>
                <td className="px-5 py-1 text-gray-500">{item.collector_name}</td>
                <td className="px-5 py-1 text-gray-500">{new Date(item.createdat).toLocaleString("en-GB")}</td>
                <td className="px-5 py-1 text-gray-500">{item.description}</td>
                <td className="px-5 py-1">
                  <button onClick={() => toggleModal("edit", item)}>
                    <MdEditSquare className="text-[#4070f4] text-3xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {modal.isOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className="p-4 bg-white rounded-lg max-w-[500px] w-[90%] relative">
              <p className="text-center text-2xl mb-4 text-neutral-500">
                {modal.type === "edit" ? "Edit Collector" : "Add Collector"}
              </p>
              <form onSubmit={modal.type === "edit" ? handleEdit : handleSubmit} className="flex flex-col items-center gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={collector.name}
                  onChange={(e) => setCollector({ ...collector, name: e.target.value })}
                  className="border text-black border-black rounded-md px-4 py-1"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={collector.description}
                  onChange={(e) => setCollector({ ...collector, description: e.target.value })}
                  className="border text-black border-black rounded-md px-4 py-1"
                  required
                />
                <button type="submit" className="w-52 px-4 py-1 rounded-md text-white bg-blue-500">
                  {modal.type === "edit" ? "Save Changes" : "Add"}
                </button>
              </form>
              <button onClick={() => toggleModal()} className="px-4 py-2 text-white rounded-md bg-red-500 absolute top-3 right-3">
                <IoClose />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collector;
