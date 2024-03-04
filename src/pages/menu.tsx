import { Categorybar } from "@/components/Categorybar";
import { CreateFoodBar } from "@/components/CreateFoodBar";
import { Header } from "@/components/Header";
import { MenuMain } from "@/components/MenuMain";
import { MenuSideBar } from "@/components/MenuSideBar";
import { isCategoryBarVisibleContext } from "@/context/createCategoryVisiblity";
import { isFoodBarVisibleContext } from "@/context/createFoodVisiblity";
import React, { useContext, useState } from "react";

const Menu = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { isFoodBarVisible, setIsFoodBarVisible } = useContext(
    isFoodBarVisibleContext
  );
  const { isCategoryBarVisible, setIsCategoryBarVisible } = useContext(
    isCategoryBarVisibleContext
  );
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center relative">
      <Header />
      {isFoodBarVisible === true ? <CreateFoodBar /> : null}
      {isCategoryBarVisible === true ? <Categorybar /> : null}
      <div className="flex w-full h-5/6">
        <MenuSideBar setSelectedCategoryId={setSelectedCategoryId} />
        <MenuMain selectedCategoryId={selectedCategoryId} />
      </div>
    </div>
  );
};

export default Menu;
