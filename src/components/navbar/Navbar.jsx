import React from "react";
import img from "../../assets/img.jpg"

const HeaderNav = () => {
  const  namen = "hoji";
    return (
        <header className="flex items-center justify-between px-6 py-3 w-full  bg-white mx-auto">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">CreditiOn</h1>
            </div>

            <div className="flex-1 max-w-44 px-4 flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-3" >
                <img src={img} alt={`Profile picture of ${namen}`}  aria-hidden="true"  className="object-cover w-12 h-12 rounded-full border border-gray-300" />
                <div className="text-xs">
                <p>Avaz</p>
            <p>Azizov</p>

                  
                </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderNav;
