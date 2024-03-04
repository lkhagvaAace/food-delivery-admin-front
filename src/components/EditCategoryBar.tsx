import { EditCategoryVisiblityContext } from "@/context/EditCategoryVisiblity";
import { Cancel } from "@/svg/Cancel";
import { Edit } from "@/svg/Edit";
import { Trash } from "@/svg/Trash";
import React, { useContext } from "react";
import { EditCategoryNameVisiblityContext } from "@/context/EditCategoryNameCon";
import { EditbleCategoryContext } from "@/context/EditableCategory";
import { deleteCategory } from "@/utilities/deleteCategory";
import { Category } from "@/types/CategoryType";

export const EditCategoryBar = () => {
  const { editCategoryVisiblity, setEditCategoryVisiblity } = useContext(
    EditCategoryVisiblityContext
  );
  const { editableCategory, setEditableCategory } = useContext(
    EditbleCategoryContext
  );
  const { editCategoryNameVisiblity, setEditCategoryNameVisiblity } =
    useContext(EditCategoryNameVisiblityContext);

  const deleteCategoryUtils = async () => {
    setEditCategoryVisiblity(false);
    const res = await deleteCategory(editableCategory);
    if (res == 400) alert("Failed to delete");
    else alert("Successfully deleted!");
  };
  return (
    <div className="bg-white w-fit h-24 absolute m-auto flex flex-col items-end rounded-lg mr-[-500px]">
      <button
        onClick={() => {
          setEditCategoryVisiblity(false);
          setEditableCategory(null);
        }}
        className="w-fit h-fit flex justify-end absolute pt-2 pr-2"
      >
        <Cancel />
      </button>
      <button
        onClick={() => {
          setEditCategoryNameVisiblity(true);
          setEditCategoryVisiblity(false);
        }}
        className="w-full gap-8 h-1/2 flex px-4 py-2 text-black text-lg items-center"
      >
        <Edit />
        Edit name
      </button>
      <button
        onClick={() => {
          deleteCategoryUtils();
        }}
        className="w-full gap-8 h-1/2 flex justify-between px-4 py-2 text-red-500 text-lg items-center"
      >
        <Trash /> Delete Category
      </button>
    </div>
  );
};
