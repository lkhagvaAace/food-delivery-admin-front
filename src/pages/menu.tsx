import { Categorybar } from "@/components/Categorybar";
import { CreateFoodBar } from "@/components/CreateFoodBar";
import { EditCategoryBar } from "@/components/EditCategoryBar";
import { EditCategoryName } from "@/components/EditCategoryName";
import { Header } from "@/components/Header";
import { MenuMain } from "@/components/MenuMain";
import { MenuSideBar } from "@/components/MenuSideBar";
import { EditCategoryNameVisiblityContext } from "@/context/EditCategoryNameCon";
import { EditCategoryVisiblityContext } from "@/context/EditCategoryVisiblity";
import { isCategoryBarVisibleContext } from "@/context/createCategoryVisiblity";
import { isFoodBarVisibleContext } from "@/context/createFoodVisiblity";
import { tree } from "next/dist/build/templates/app-page";
import React, { useContext, useState } from "react";

const Menu = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const { isFoodBarVisible, setIsFoodBarVisible } = useContext(
    isFoodBarVisibleContext
  );
  const { isCategoryBarVisible, setIsCategoryBarVisible } = useContext(
    isCategoryBarVisibleContext
  );
  return (
    <div className="w-full relative min-h-screen flex justify-center items-center">
      {isFoodBarVisible === true ? <CreateFoodBar /> : null}
      {isCategoryBarVisible === true ? <Categorybar /> : null}

      <div
        className={`bg-gray-100 min-h-screen w-full flex flex-col items-center relative ${
          isCategoryBarVisible || isFoodBarVisible ? "opacity-25" : null
        }`}
      >
        <Header />
        <div className="flex w-full h-5/6">
          <MenuSideBar
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedCategoryName={setSelectedCategoryName}
          />
          <MenuMain
            selectedCategoryName={selectedCategoryName}
            selectedCategoryId={selectedCategoryId}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
