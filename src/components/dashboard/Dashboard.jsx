import React, {useEffect, useState} from "react";
import {MdOutlineAttachMoney} from "react-icons/md";
import {MdOutlinePayments} from "react-icons/md";
import {FiCheckCircle} from "react-icons/fi";
import {MdPeopleAlt} from "react-icons/md";

const Dashboard = () => {
    const [allMoney, setAllMoney] = useState([]);
    const [headPay, setHeadPay] = useState([]);
    const [payUser, setPayUser] = useState([]);
    const [monthPay, setMonthPay] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/payment/money`)
        .then((response) => response.json())
        .then((item) => {
            setAllMoney(item.result.income || []); // "data" massiv bo'lsa, uni ishlating
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);

    useEffect(() => {
        fetch(`${API_URL}/payment/primary`)
        .then((response) => response.json())
        .then((item) => {
            setHeadPay(item.count || []);
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);

    useEffect(() => {
        fetch(`${API_URL}/payment/month-paid-users?page=1`)
        .then((response) => response.json())
        .then((item) => {
            setPayUser(item.count);
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);
    useEffect(() => {
        fetch(`${API_URL}/payment/this-month-money`)
        .then((response) => response.json())
        .then((item) => {
            setMonthPay(item);
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);
    return (
        <div className="">
            <div className="max-w-[1100px] w-[90%] mx-auto flex px-4  justify-between gap-4">
                <div className="bg-red-400 flex-col  text-white rounded-xl border-2 h-[90px] py-3 items-center px-4  w-72">
                    <div className="text-2xl  gap-1 items-center flex mx-auto text my-auto">
                    <MdOutlineAttachMoney /> <p>Jami pul</p>
                    </div>

                    {allMoney?.map((item, index) => (
                        <p key={index}>{item.sum} so'm</p>
                    ))}
                </div>
                <div className="bg-blue-500 text-white rounded-xl border-2 h-[90px] py-3 items-center px-4  w-72">
                <div className="text-2xl gap-1 items-center flex mx-auto text my-auto">
                    <MdOutlinePayments /> <p>Bosh to'lov</p>
                    </div>

                    {headPay?.map((item, index) => (
                        <p key={index}>{item.sum}  so'm</p>
                    ))}
                </div>
                <div className="bg-green-500 text-white rounded-xl border-2  h-[90px] py-3 items-center px-4  w-72">
                <div className="text-2xl gap-1 items-center flex mx-auto text my-auto">
                    <FiCheckCircle /> <p>Oylik to'lov</p>
                    </div>

                    {monthPay?.map((item, index) => (
                        <p key={index}>{item.sum}  so'm</p>
                    ))}
                </div>
                <div className="bg-orange-400 text-white rounded-xl border-2 border-gray-200  h-[90px] py-3 items-center px-4  w-72">
                <div className="text-2xl gap-1 items-center flex mx-auto text my-auto">
                    <MdPeopleAlt /> <p>To'laganlar</p>
                    </div>

                    <p>{payUser} kishi to'ladi</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
