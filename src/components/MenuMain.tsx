import { isFoodBarVisibleContext } from "@/context/createFoodVisiblity";
import { getFoods } from "@/utilities/getFoods";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Food } from "@/types/FoodType";

export const MenuMain = ({ selectedCategoryId, selectedCategoryName }: any) => {
  const { isFoodBarVisible, setIsFoodBarVisible } = useContext(
    isFoodBarVisibleContext
  );

  const [foods, setFoods] = useState<Food[]>([]);
  const [domFoods, setDomFoods] = useState<Food[]>([]);
  const [onHover, setOnHover] = useState(false);
  const [hoveredId, setHoveredId] = useState("");
  const setFoodsFromDB = (data: Food[]) => {
    setFoods(data);
    setDomFoods(data);
  };
  useEffect(() => {
    getFoods(setFoodsFromDB);
  }, []);
  const filteringbByCategory = useMemo(async () => {
    const filteredFoods = foods.filter(
      (el: Food) => el.category === selectedCategoryId
    );
    setDomFoods(filteredFoods);
  }, [selectedCategoryId]);
  return (
    <div className="flex flex-col w-4/5">
      <div className="flex justify-between items-center px-16 h-[100px]">
        <p className="text-3xl font-semibold text-black">
          {selectedCategoryName}
        </p>
        <button
          onClick={() => setIsFoodBarVisible(true)}
          className="text-white bg-green-500 w-48 h-12 text-lg rounded-lg"
        >
          Add new food
        </button>
      </div>
      <div className="flex w-full h-fit justify-start px-32 flex-wrap gap-16">
        {domFoods.length > 0 &&
          domFoods.map((el) => {
            return (
              <div
                key={el._id}
                className="text-black w-1/4 h-64 rounded-lg flex flex-col gap-2 relative"
              >
                {el.isSale.salePercent > 0 && (
                  <div className="flex justify-end w-full h-48 z-50 absolute">
                    <div className="absolute bg-green-500 text-white font-semibold w-fit h-fit p-2 rounded-xl mt-2 mr-2 border-[1px] border-solid border-white">
                      {el.isSale.salePercent}%
                    </div>
                  </div>
                )}
                <div
                  onMouseEnter={(e) => {
                    setOnHover(true);
                  }}
                  onMouseLeave={() => setOnHover(false)}
                  className="flex w-full h-fit justify-center items-center"
                >
                  <img
                    id={el._id}
                    src={`${el.img}`}
                    className="w-full h-48 rounded-lg relative"
                  />
                </div>
                <p className="font-bold text-xl">{el.name}</p>
                <div className="text-green-500 font-semibold">
                  {el.isSale.salePercent > 0 ? (
                    <div className="flex gap-2">
                      <p>
                        {(
                          (el.price / 100) *
                          (100 - el.isSale.salePercent)
                        ).toLocaleString()}
                        ₮
                      </p>
                      <p className="line-through text-black">
                        {el.price.toLocaleString()}₮
                      </p>
                    </div>
                  ) : (
                    <p>{el.price.toLocaleString()}₮</p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
