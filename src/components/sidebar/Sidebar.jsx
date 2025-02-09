import React from "react";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { TbUserDollar } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";



const Sidebar = () => {
    const navigate = useNavigate();
    const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};

    return (
        <div className="w-64 h-[100vh] bg-[#363740] flex items-center  pt-8 flex-col">
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
            <button onClick={logout} className="flex absolute mx-auto w-32 items-center gap-3 text-white bottom-5 text-xl">
               <IoLogOut className="text-2xl"/>  Log Out
            </button>
        </div>
    );
};

export default Sidebar;
