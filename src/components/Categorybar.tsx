import { instance } from "@/Instance";
import { isCategoryBarVisibleContext } from "@/context/createCategoryVisiblity";
import { Cancel } from "@/svg/Cancel";
import { createCategory } from "@/utilities/createCategory";
import { CreateCategorySchema } from "@/validations/createCategoryValidation";
import { useFormik } from "formik";
import React, { useContext } from "react";

export const Categorybar = () => {
  const { isCategoryBarVisible, setIsCategoryBarVisible } = useContext(
    isCategoryBarVisibleContext
  );
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: CreateCategorySchema,
    onSubmit: () => {},
  });
  const insertFoodIntoDB = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await createCategory(e, errors, values);
    if (res == 400) return alert("This category already exist!");
    else alert("Successfully created");
  };
  return (
    <form
      onSubmit={insertFoodIntoDB}
      className="flex absolute bg-white flex-col items-center w-96 rounded-lg h-fit py-8 px-4 border-[1px] border-solid border-black z-30"
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-between p-2">
          <button
            onClick={() => setIsCategoryBarVisible(false)}
            className="w-8 h-8"
          >
            <Cancel />
          </button>
          <p className="text-black font-medium text-lg">Create new category</p>
          <p></p>
        </div>
        <hr></hr>
      </div>
      <div className="flex flex-col w-full gap-2 mt-4 justify-center">
        <label className="text-gray-600 text-xs px-4">Category name</label>
        <input
          id="categoryName"
          value={values.categoryName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
          placeholder="Food"
          type="text"
        />
        {errors.categoryName ? (
          <p className="text-red-500 pl-4 text-sm font-semibold">
            {errors.categoryName}
          </p>
        ) : null}
        <hr></hr>
      </div>
      <div className="flex gap-4 items-center w-full justify-end pt-2 mr-2">
        <button
          onClick={() => (values.categoryName = "")}
          className="text-black"
        >
          Clear
        </button>
        <button
          type="submit"
          className={`text-white ${
            errors.categoryName ? "bg-gray-300" : "bg-black"
          } rounded-lg w-24 h-8`}
        >
          Continue
        </button>
      </div>
    </form>
  );
};
