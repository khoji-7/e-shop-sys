import React, { useEffect, useState } from "react";
import {  MdPeopleAlt } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
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
        // console.log("Jami pul:", allMoney);
        // console.log("To'lamaganlar:", notPaid);
        // console.log("Bugun to'laganlar:", today);
        // console.log("Bu oy to'laganlar:", month);

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
      .catch((error) => console.error("Xatolik:", error));
  }, [API_URL]);

  return (
    <div className="max-w-[1100px] w-[90%] mt-1 mx-auto flex px-4 justify-between gap-4">
      <StatCard
        color="bg-red-400"
        title="Jami pul"
        value={
          <>
            <span>
              {parseInt(
                stats?.allMoney?.paid_money?.sum || 0,
                10
              ).toLocaleString()}{" "}
              /
              {parseInt(
                stats?.allMoney?.all_income?.sum || 0,
                10
              ).toLocaleString()}{" "}
              so'm
            </span>
            <span className="text-sm">
                <br/>
              {stats?.allMoney?.paid_users_count?.count || 0} /
              {stats?.allMoney?.income_users_count?.count || 0} kishi to'lagan
            </span>
          </>
        }
      />
      <StatCard
        icon={<CgDanger />}
        color="bg-blue-500"
        title="To'lamaganlar"
        value={
          <>
            <p className="text-sm">
              {parseInt(stats?.headPay?.sum || 0, 10).toLocaleString()} so'm
            </p>
            <p>
              {stats.headPay?.count || 0} /
              {stats.allMoney?.income_users_count?.count || 0} kishi
            </p>
          </>
        }
        onClick={() =>
          setModalData({
            type: "notPaid",
            title: "To'lamaganlar Ro'yxati",
            users: stats.notPaidUsers,
          })
        }
        clickable
      />
      <StatCard
        icon={<FiCheckCircle />}
        color="bg-green-500"
        title="Bu oydagi to'lov"
        value={
          <>
            <p className="text-sm">
              {parseInt(stats?.monthPay?.sum || 0, 10).toLocaleString()} so'm
            </p>
            <p>{stats.monthPay?.count || 0} kishi</p>
          </>
        }
        onClick={() =>
          setModalData({
            type: "monthPaid",
            title: "Bu oy to'laganlar",
            users: stats.monthPaidUsers,
          })
        }
        clickable
      />
      <StatCard
        icon={<MdPeopleAlt />}
        color="bg-orange-400"
        title="Bugungi to'lov"
        value={
          <>
            <p className="text-sm">
              {parseInt(stats?.payUser?.sum || 0, 10).toLocaleString()} so'm
            </p>{" "}
            <p>{stats.payUser?.count || 0} kishi</p>
          </>
        }
        onClick={() =>
          setModalData({
            type: "todayPaid",
            title: "Bugun to'laganlar",
            users: stats.todayPaidUsers,
          })
        }
        clickable
      />      {modalData && (
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

const StatCard = ({ icon, color, title, value, onClick, clickable }) => (
  <div
    className={`${color} text-white rounded-xl border-2 h-[120px] py-3 items-center px-4 w-[350px] ${
      clickable ? "cursor-pointer" : ""
    }`}
    onClick={onClick}
  >
    <div className="text-lg gap-1 items-center flex mx-auto">
      {icon} <p>{title}</p>
    </div>
    <p>{value}</p>
  </div>
);

export default Dashboard;