import { instance } from "@/Instance";
import { Header } from "@/components/Header";
import { Left } from "@/svg/Left";
import { Right } from "@/svg/Right";
import { Order } from "@/types/orderType";
import React, { useMemo, useState } from "react";

const index = ({ orderData, count }: { orderData: Order[]; count: number }) => {
  const array: number[] = [];
  for (let i = 1; i <= Math.ceil(count / 8); i++) {
    array.push(i);
  }
  const [searchValue, setSearchValue] = useState("");
  const [domOrders, setDomOrders] = useState<Order[]>([]);
  const [selectedCount, setSelectedCount] = useState(1);
  const filterOrdersBySearchValue = useMemo(async () => {
    setDomOrders(
      orderData.filter((el) => {
        return el.userId.email
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      })
    );
  }, [searchValue]);
  const fetchingOrders = useMemo(async () => {
    const res = await instance.get(`/getOrdersToAdmin?skip=${selectedCount}`);
    orderData = res.data;
    setDomOrders(orderData);
  }, [selectedCount]);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex flex-col mt-16 w-3/4 h-[800px] bg-white rounded-lg">
        <div className="flex justify-between items-center px-12 h-[100px]">
          <p className="text-3xl font-semibold text-black">Admin dashboard</p>
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="pl-8 bg-gray-100 w-96 h-12 rounded-lg text-black"
          />
        </div>
        <div className="h-4/5 bg-white">
          <div className="h-[60px] bg-gray-100 w-full flex justify-between pr-24 px-12 items-center">
            <p className="text-gray-700 font-semibold text-lg">Order name</p>
            <p className="text-gray-700 font-semibold text-lg">Buyer info</p>
            <p className="text-gray-700 font-semibold text-lg">Payment</p>
            <p className="text-gray-700 font-semibold text-lg">Address</p>
            <p className="text-gray-700 font-semibold text-lg">
              Delivery state
            </p>
          </div>
          <div className="flex flex-col">
            {domOrders.length > 0 &&
              domOrders.map((el) => {
                return (
                  <div
                    key={el._id}
                    className="text-black text-xl h-1/6 w-full flex py-2 pr-24 pl-12
                     justify-between"
                  >
                    <div className="flex w-1/6 h-full gap-2">
                      <img className="w-24 h-16" src={`${el.foods[0].img}`} />
                      <div className="flex w-1/2 flex-col">
                        <p className="text-lg font-semibold">
                          #{el.orderNumber}
                        </p>
                        <p className="text-sm">{el.foods[0].name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col text-sm mt-2">
                      <p className="font-semibold text-lg">
                        {el.userId.phoneNumber}
                      </p>
                      <p>{el.userId.email}</p>
                    </div>
                    <div className="flex text-sm gap-4 items-center">
                      <div className="flex flex-col justify-center">
                        <p className="font-semibold text-lg">
                          {el.totalPrice.toLocaleString()}₮
                        </p>
                        <p>{el.createdDate}</p>
                      </div>
                      <p className="bg-green-300 text-lg px-4 py-2 h-fit rounded-xl text-[#0A4E22]">
                        Paid
                      </p>
                    </div>
                    <p className="text-sm w-1/6 pt-4">
                      БЗД, 2-р хороо, Нархан хотхон, 2-р орц, 5 - 63тоот
                    </p>
                    <p
                      className={`${
                        el.process === "Waiting" &&
                        "bg-gray-300 text-gray-700 mt-4"
                      } h-fit py-2 px-4 rounded-xl`}
                    >
                      {el.process}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="w-3/4 justify-between flex text-black font-semibold mt-8">
        <button className="border-black border-solid border-[1px] rounded-lg px-4 py-2 bg-white flex gap-2 items-center">
          <span className="w-1/3 h-full flex justify-center items-center">
            <Left />
          </span>
          Previous
        </button>
        <div className="text-gray-600 flex gap-4">
          {array.length > 0 &&
            array.map((el) => {
              return (
                <button
                  id={`${el}`}
                  className={`text-gray-400 ${
                    selectedCount === el && "bg-gray-200 text-black"
                  } px-4 py-2 rounded-xl `}
                  onClick={() => setSelectedCount(el)}
                >
                  {el}
                </button>
              );
            })}
        </div>
        <button className="border-black border-solid border-[1px] rounded-lg px-4 py-2 bg-white flex gap-2 items-center">
          Next
          <span className="w-1/3 h-full flex justify-center items-center">
            <Right />
          </span>
        </button>
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps = async () => {
  const res = await instance.get("/getOrdersToAdmin");
  const countRes = await instance.get("/getOrderCount");
  let orderData: Order[] = res.data;
  const count: number = countRes.data.message;
  return { props: { orderData, count } };
};
