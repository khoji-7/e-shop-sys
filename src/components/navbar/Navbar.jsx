import React from "react";
import img from "../../assets/img.jpg"

const HeaderNav = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 w-[1180px] bg-white">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">CreditiOn</h1>
            </div>

            <div className="flex-1 max-w-xl px-4 flex items-center gap-4 text-gray-400">
                <input type="search" placeholder="Search..." className="w-[300px] bg-muted/50 px-4 py-2 rounded-3xl  border text-gray-400 " />
                <div className="flex items-center gap-3">
                <img src={img} alt="Profile photo" className="object-cover w-12 h-12 rounded-full border" />
                <div className="text-xs">
                  <p>
                    Surname
                  </p>
                  <p>
                    Name
                  </p>
                </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderNav;
