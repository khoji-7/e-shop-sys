import React, {useEffect, useState} from "react";
import {MdOutlineAttachMoney, MdPeopleAlt} from "react-icons/md";
import {CgDanger} from "react-icons/cg";
import {FiCheckCircle} from "react-icons/fi";
import PaymentList from "./NotPay";
const Dashboard = () => {
    const [stats, setStats] = useState({
        allMoney: {},
        headPay: 0,
        payUser: 0,
        monthPay: 0,
        notPaidUsers: [],
        todayPaidUsers: [],
        monthPaidUsers: [],
    });
    const [modalData, setModalData] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        Promise.all([
            fetch(`${API_URL}/main/all`).then((res) => res.json()),
            fetch(`${API_URL}/main/notPayed`).then((res) => res.json()),
            fetch(`${API_URL}/main/today`).then((res) => res.json()),
            fetch(`${API_URL}/main/month`).then((res) => res.json()),
        ])
        .then(([allMoney, notPaid, today, month]) => {
           
            setStats({
                allMoney,
                headPay: notPaid || 0,
                payUser: today || 0,
                monthPay: month || 0,
                notPaidUsers: notPaid.result || [],
                todayPaidUsers: today.result || [],
                monthPaidUsers: month.result || [],
            });
        })
        .catch((error) => console.error("Error:", error));
    }, [API_URL]);
    

    return (
        <div className="max-w-[1100px] w-[90%] mx-auto flex px-4 justify-between gap-4">
            <StatCard
                icon={<MdOutlineAttachMoney />}
                color="bg-red-400"
                title="Jami pul"
                value={`${stats.allMoney?.all_income?.sum || 0} so'm`}
            />
            <StatCard
                icon={<CgDanger />}
                color="bg-blue-500"
                title="To'lamaganlar"
                value={`${stats.headPay?.count}/${stats.allMoney?.income_users_count?.count || 0} kishi  ${stats?.headPay.sum} so'm`}
                onClick={() =>
                    setModalData({type: "notPaid", title: "To'lamaganlar Ro'yxati", users: stats.notPaidUsers})
                }
                clickable
            />
            <StatCard
                icon={<FiCheckCircle />}
                color="bg-green-500"
                title="Oylik to'lov"
                value={`${stats.monthPay?.count} kishi ${stats?.monthPay.sum} so'm`}
                onClick={() =>
                    setModalData({type: "monthPaid", title: "Bu oy to'laganlar", users: stats.monthPaidUsers})
                }
                clickable
            />
            <StatCard
                icon={<MdPeopleAlt />}
                color="bg-orange-400"
                title="Bugungi to'lov"
                value={`${stats.payUser?.count} kishi ${stats?.payUser.sum} so'm`}
                onClick={() =>
                    setModalData({type: "todayPaid", title: "Bugun to'laganlar", users: stats.todayPaidUsers})
                }
                clickable
            />

            {modalData && (
                <PaymentList
                    type={modalData.type}
                    title={modalData.title}
                    users={modalData.users}
                    onClose={() => setModalData(null)}
                />
            )}
        </div>
    );
};

const StatCard = ({icon, color, title, value, onClick, clickable}) => (
    <div
        className={`${color} text-white rounded-xl border-2 h-[90px] py-3 items-center px-4 w-80 ${
            clickable ? "cursor-pointer" : ""
        }`}
        onClick={onClick}
    >
        <div className="text-xl gap-1 items-center flex mx-auto">
            {icon} <p>{title}</p>
        </div>
        <p>{value}</p>
    </div>
);

export default Dashboard;
