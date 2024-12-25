import React from "react";
import { MdFilterList, MdAdd } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

const TableHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-between items-center">
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
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TableHeader;
