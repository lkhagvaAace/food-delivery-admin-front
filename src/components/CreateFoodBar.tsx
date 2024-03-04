import { instance } from "@/Instance";
import { isFoodBarVisibleContext } from "@/context/createFoodVisiblity";
import { Cancel } from "@/svg/Cancel";
import { getCategoriesFromDatabass } from "@/utilities/getCategories";
import { CreateFoodSchema } from "@/validations/createFoodValidation";
import { useFormik } from "formik";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Category } from "@/types/CategoryType";
import { createNewFood } from "@/utilities/createFood";
import { getSelectedCategoryId } from "@/utilities/getSelectedCategoryId";
import axios from "axios";
import { object } from "yup";

export const CreateFoodBar = () => {
  const { isFoodBarVisible, setIsFoodBarVisible } = useContext(
    isFoodBarVisibleContext
  );
  const [categories, setCategoryies] = useState<Category[]>([]);
  const [selectedCategoryForFood, setSelectedCategoryForFood] = useState("");
  const [isSale, setIsSale] = useState(false);
  const [imgFile, setImgFile] = useState({});
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      category: categories[0]?.name,
      ingredients: "",
      price: 0,
      isSale: false,
      salePercent: 0,
      img: object,
    },
    validationSchema: CreateFoodSchema,
    onSubmit: () => {},
  });
  const checkHasFoodSale = () => {
    if (isSale === false) return false;
    return { isSale: isSale, salePercent: values.salePercent };
  };
  const getCategories = (data: Category[]) => {
    setCategoryies(data);
  };
  useEffect(() => {
    getCategoriesFromDatabass(getCategories);
  }, []);
  const getCategoryId = async (name: string) => {
    const id = await getSelectedCategoryId(name);
    setSelectedCategoryForFood(id);
  };
  return (
    <form
      onSubmit={(e) => {
        createNewFood(
          e,
          errors,
          checkHasFoodSale,
          values,
          selectedCategoryForFood,
          imgFile
        );
        setIsFoodBarVisible(false);
      }}
      className="absolute z-30 my-32 flex flex-col bg-white items-center w-1/3 rounded-lg h-fit pb-4 border-[1px] border-solid border-black"
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-between p-2">
          <button
            onClick={() => setIsFoodBarVisible(false)}
            className="w-8 h-8"
          >
            <Cancel />
          </button>
          <p className="text-black font-bold text-xl pr-12">Create food</p>
          <p></p>
        </div>
        <hr></hr>
      </div>
      <div className="flex flex-col w-full gap-2 mt-4">
        <label className="text-gray-600 text-xs px-4">Хоолны нэр</label>
        <input
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
          placeholder="Food"
          type="text"
        />
        {errors.name ? (
          <p className="text-sm text-red-500 pl-8">{errors.name}</p>
        ) : null}
      </div>
      <div className="flex flex-col w-full gap-2 mt-4">
        <label className="text-gray-600 text-xs px-4">Хоолны ангилал</label>
        <select
          onChange={(e) => getCategoryId(e.target.value)}
          className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
        >
          {categories.length > 0 &&
            categories.map((el) => {
              return (
                <option key={el?._id} className="text-black text-lg">
                  {el?.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="flex flex-col w-full gap-2 mt-4">
        <label className="text-gray-600 text-xs px-4">Хоолны орц</label>
        <input
          id="ingredients"
          value={values.ingredients}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
          placeholder="Food"
          type="text"
          required={true}
        />
        {errors.ingredients ? (
          <p className="text-sm text-red-500 pl-8">{errors.ingredients}</p>
        ) : null}
      </div>
      <div className="flex flex-col w-full gap-2 mt-4">
        <label className="text-gray-600 text-xs px-4">Хоолны үнэ</label>
        <input
          id="price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
          placeholder="Food"
          type="text"
        />
        {errors.price ? (
          <p className="text-sm text-red-500 pl-8">{errors.price}</p>
        ) : null}
      </div>
      <div className="flex flex-col w-full mt-4 gap-4">
        <div className="flex items-center px-4 gap-4">
          <div className="form-control">
            <input
              onChange={(e) => {
                setIsSale(e.target.checked);
              }}
              type="checkbox"
              className="toggle"
            />
          </div>
          <label className="text-gray-600 text-xs">Хямдралтай эсэх</label>
        </div>
        {!isSale ? (
          <input
            className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
            placeholder="20%"
            type="number"
            disabled
          />
        ) : (
          <input
            id="salePercent"
            value={values.salePercent}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
            placeholder="20%"
            type="number"
          />
        )}
      </div>
      <div className="flex flex-col justify-center w-full p-4">
        <label className="text-gray-600 text-xs">Хоолны зураг</label>
        <div className="w-1/2 px-4 h-fit py-8 gap-4 bg-gray-100 rounded-lg border-[1px] border-dashed border-gray-500 flex flex-col justify-center items-center my-4">
          <p className="text-xl font-semibold text-gray-700">
            Add image for the food
          </p>
          <input
            id="file"
            type="file"
            onChange={(e) => setImgFile(e.target.files[0])}
            multiple={false}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="flex gap-4 items-center w-full justify-end pt-2 mr-2">
        <button
          onClick={() => {
            (values.name = ""), (values.ingredients = ""), (values.price = 0);
          }}
          className="text-black font-semibold"
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-black text-white w-24 rounded-lg font-semibold h-8"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
