import React from "react";
import { MdDashboard } from "react-icons/md";
import { MdOutlineTableChart } from "react-icons/md";

const Sidebar = () => {
    return (
        <div className="w-64 h-[100vh] bg-[#363740] flex  pt-8 flex-col">
            <h1 className="text-white text-4xl font-bold mx-auto">
                Admin
            </h1>
            <div className="flex flex-col mx-auto mt-10 text-xl text-white items-start">
                <div className="pt-4 flex items-center gap-5 cursor-pointer ">
                    <MdDashboard/>
                    <p className="">
                        Dashboard
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default Sidebar;
