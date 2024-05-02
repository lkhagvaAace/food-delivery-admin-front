import React from "react";
import { Basket } from "../svg/Basket";
import { Profile } from "../svg/Profile";
import { Logo } from "../svg/Logo";
import { useRouter } from "next/router";

type Props = {};

export const Header = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex w-full px-32 h-1/6 justify-between py-4 bg-white">
      <nav className="flex items-center gap-16">
        <button
          onClick={() => router.push("/")}
          className="w-6 h-6 rounded-[50]"
        >
          <Logo />
        </button>
        <button
          onClick={() => router.push("/")}
          className={`${
            router.asPath === "/" ? "text-green-500" : "text-black"
          } font-semibold w-fit h-8`}
        >
          НҮҮР
        </button>
        <button
          onClick={() => router.push("/menu")}
          className={`${
            router.asPath === "/menu" ? "text-green-500" : "text-black"
          } font-semibold w-fit h-8`}
        >
          ХООЛНЫ ЦЭС
        </button>
      </nav>
      <div className="flex justify-center items-center gap-16">
        <input
          type="text"
          placeholder="Хайх"
          className="border-2 border-black border-solid rounded-lg w-64 h-12 pl-4 bg-white text-gray-600 px-4"
        />
      </div>
    </div>
  );
};
