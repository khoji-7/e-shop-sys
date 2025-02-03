import React, {useEffect, useState} from "react";
import {MdOutlineAttachMoney} from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import {FiCheckCircle} from "react-icons/fi";
import {MdPeopleAlt} from "react-icons/md";

const Dashboard = () => {
    const [allMoney, setAllMoney] = useState([]);
    const [headPay, setHeadPay] = useState();
    const [payUser, setPayUser] = useState([]);
    const [monthPay, setMonthPay] = useState();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/main/all`)
        .then((response) => response.json())
        .then((item) => {
            setAllMoney(item); // "data" massiv bo'lsa, uni ishlating
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);

    useEffect(() => {
        fetch(`${API_URL}/main/notPayed`)
        .then((response) => response.json())
        .then((item) => {
            setHeadPay(item.count || []);
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);

    useEffect(() => {
        fetch(`${API_URL}/main/today`)
        .then((response) => response.json())
        .then((item) => {
            setPayUser(item.count);
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);
    useEffect(() => {
        fetch(`${API_URL}/main/month`)
        .then((response) => response.json())
        .then((item) => {
            setMonthPay(item);
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);
    console.log("dsasd",allMoney)
    return (
        <div className="">
            <div className="max-w-[1100px] w-[90%] mx-auto flex px-4  justify-between gap-4">
                <div className="bg-red-400 flex-col  text-white rounded-xl border-2 h-[90px] py-3 items-center px-4  w-72">
                    <div className="text-2xl  gap-1 items-center flex mx-auto text my-auto">
                    <MdOutlineAttachMoney /> <p>Jami pul</p>
                    </div>

                   <p>
                   {allMoney?.all_income?.sum} so'm to'landi
                   </p>
                </div>
                <div className="bg-blue-500 text-white rounded-xl border-2 h-[90px] py-3 items-center px-4  w-72">
                <div className="text-2xl gap-1 items-center flex mx-auto text my-auto">
                    <CgDanger /> <p>To'lamaganlar</p>
                    </div>
                    <p>
                        {headPay}/{allMoney?.income_users_count?.count} kishi to'lamadi
                    </p>
                </div>
                <div className="bg-green-500 text-white rounded-xl border-2  h-[90px] py-3 items-center px-4  w-72">
                <div className="text-2xl gap-1 items-center flex mx-auto text my-auto">
                    <FiCheckCircle /> <p>Oylik to'lov</p>
                    </div>

                   <p>
                   {(monthPay || {}).count}  kishi to'ladi
                   </p>
                </div>
                <div className="bg-orange-400 text-white rounded-xl border-2 border-gray-200  h-[90px] py-3 items-center px-4  w-72">
                <div className="text-2xl gap-1 items-center flex mx-auto text my-auto">
                    <MdPeopleAlt /> <p>Bugungi to'lov</p>
                    </div>

                    <p>{payUser} kishi to'ladi</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
