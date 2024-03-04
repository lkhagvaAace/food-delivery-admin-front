import { Header } from "@/components/Header";
import React from "react";

const index = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex flex-col mt-16 w-3/4 h-[800px] bg-white rounded-lg">
        <div className="flex justify-between items-center px-12 h-[100px]">
          <p className="text-3xl font-semibold text-black">Admin dashboard</p>
          <input
            type="text"
            placeholder="Search"
            className="pl-8 bg-gray-100 w-96 h-12 rounded-lg"
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
          <div className="flex flex-col"></div>
        </div>
      </div>
    </div>
  );
};

export default index;
