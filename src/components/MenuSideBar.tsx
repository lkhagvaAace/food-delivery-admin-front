import { EditCategoryVisiblityContext } from "@/context/EditCategoryVisiblity";
import React, { useContext, useEffect, useState } from "react";
import { EditCategoryBar } from "./EditCategoryBar";
import { EditCategoryName } from "./EditCategoryName";
import { EditCategoryNameVisiblityContext } from "@/context/EditCategoryNameCon";
import { getCategoriesFromDatabass } from "@/utilities/getCategories";
import { WhiteMore } from "@/svg/WhiteMore";
import { BlackMore } from "@/svg/BlackMore";
import { isCategoryBarVisibleContext } from "@/context/createCategoryVisiblity";
import { EditbleCategoryContext } from "@/context/EditableCategory";
import { Category } from "@/types/CategoryType";

export const MenuSideBar = ({
  setSelectedCategoryId,
  setSelectedCategoryName,
}: any) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategoryies] = useState<Category[]>([]);
  const { editCategoryVisiblity, setEditCategoryVisiblity } = useContext(
    EditCategoryVisiblityContext
  );
  const { editableCategory, setEditableCategory } = useContext(
    EditbleCategoryContext
  );
  const { isCategoryBarVisible, setIsCategoryBarVisible } = useContext(
    isCategoryBarVisibleContext
  );
  const { editCategoryNameVisiblity, setEditCategoryNameVisiblity } =
    useContext(EditCategoryNameVisiblityContext);

  const getCategoriesFunction = (data: Category[]) => {
    setCategoryies(data);
  };
  useEffect(() => {
    getCategoriesFromDatabass(getCategoriesFunction);
  }, []);
  return (
    <div className="bg-white w-1/5 flex min-h-screen flex-col items-center relative pt-4">
      {editCategoryVisiblity === true ? <EditCategoryBar /> : null}
      {editCategoryNameVisiblity === true ? <EditCategoryName /> : null}
      <p className="text-3xl text-black font-semibold py-4">Food menu</p>
      <div className="w-full flex flex-col gap-4 items-center justify-center mt-8">
        {categories &&
          categories.map((el) => {
            return (
              <button
                id={`${el?._id}`}
                key={el._id}
                onClick={(e: any) => {
                  setSelectedCategoryId(e.target.id);
                  setSelectedCategoryName(el.name);
                  setSelectedCategory(e.target.id);
                }}
                onDoubleClick={() => setSelectedCategory("")}
                className={`${
                  selectedCategory === el?._id
                    ? "text-white bg-green-500"
                    : "text-black bg-white"
                } rounded-lg text-xl w-56 h-12 flex justify-between items-center px-4 py-2 border-[1px] border-gray-300 border-solid`}
              >
                <p>{el?.name}</p>
                <button
                  onClick={() => {
                    setEditableCategory(el);
                    setEditCategoryVisiblity(true);
                  }}
                >
                  {selectedCategory === el?._id ? <WhiteMore /> : <BlackMore />}
                </button>
              </button>
            );
          })}
        <button
          onClick={() => setIsCategoryBarVisible(true)}
          className="text-gray-400 w-48 h-12 text-lg mt-8 flex items-center justify-center border-2 border-gray-400 border-solid rounded-lg"
        >
          + Create new category
        </button>
      </div>
    </div>
  );
};
