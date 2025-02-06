import React from "react";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { TbUserDollar } from "react-icons/tb";



const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-64 h-[100vh] bg-[#363740] flex  pt-8 flex-col">
            <h1 className="text-white text-4xl font-bold mx-auto">
                Admin
            </h1>
            <div className="flex flex-col mx-auto mt-10 text-xl text-white items-start">
                <div className="pt-4 flex items-center gap-5 cursor-pointer " onClick={()=> navigate("/")}>
                    <MdDashboard/>
                    <p className="">
                        Dashboard
                    </p>
                </div>
                <div className="pt-4 flex items-center gap-5 cursor-pointer "  onClick={()=> navigate("/collector")} >
                    <RiAdminLine/>
                    <p className="">
                        Collector
                    </p>
                </div>
                <div className="pt-4 flex items-center gap-5 cursor-pointer "  onClick={()=> navigate("/zone")} >
                    <FaLocationDot/>
                    <p className="">
                        Zone
                    </p>
                </div>
                <div className="pt-4 flex items-center gap-5 cursor-pointer "  onClick={()=> navigate("/collectormoney")} >
                    <TbUserDollar/>
                    <p className="">
                        Yig'uvchilar 
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default Sidebar;
