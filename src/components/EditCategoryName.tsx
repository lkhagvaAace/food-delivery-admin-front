import { EditCategoryNameVisiblityContext } from "@/context/EditCategoryNameCon";
import { EditbleCategoryContext } from "@/context/EditableCategory";
import { editCategory } from "@/utilities/editCategory";
import { CreateCategorySchema } from "@/validations/createCategoryValidation";
import { useFormik } from "formik";
import React, { useContext } from "react";

export const EditCategoryName = ({ setEditBarVisiblity }: any) => {
  const { editableCategory, setEditableCategory } = useContext(
    EditbleCategoryContext
  );
  const { editCategoryNameVisiblity, setEditCategoryNameVisiblity } =
    useContext(EditCategoryNameVisiblityContext);
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: CreateCategorySchema,
    onSubmit: () => {},
  });

  const edit = async (e: React.FormEvent<HTMLFormElement>) => {
    const res = await editCategory(
      e,
      editableCategory,
      values.categoryName,
      errors.categoryName
    );
    if (res == 200) {
      alert("Successfully Updated");
      setEditableCategory(null);
      setEditCategoryNameVisiblity(false);
    } else {
      alert("Failed to update");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        edit(e);
      }}
      className="flex flex-col bg-gray-200 rounded-lg w-fit h-fit p-8 absolute mt-64 justify-center gap-2"
    >
      <input
        id="categoryName"
        value={values.categoryName}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        placeholder="Fruits"
        className="border-2 border-black border-solid rounded-lg w-64 h-12 pl-4 bg-white text-gray-600 px-4"
      />
      {errors.categoryName ? (
        <p className="text-red-500 text-sm">{errors.categoryName}</p>
      ) : null}
      <div className="flex justify-between gap-4">
        <button
          onClick={() => {
            setEditCategoryNameVisiblity(false), setEditableCategory(null);
          }}
          className="text-white bg-red-500 w-24 h-8 text-lg rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          // onClick={() => setEditCategoryNameVisiblity(false)}
          className="text-white bg-green-500 w-24 h-8 text-lg rounded-lg"
        >
          Done
        </button>
      </div>
    </form>
  );
};
