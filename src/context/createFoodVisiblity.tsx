import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  isFoodBarVisible: boolean;
  setIsFoodBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const iContextState = {
  isFoodBarVisible: false,
  setIsFoodBarVisible: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const isFoodBarVisibleContext =
  createContext<ThemContextType>(iContextState);
export const FoodBarVisiblity = ({ children }: ChildrenType) => {
  const [isFoodBarVisible, setIsFoodBarVisible] = useState<true | false>(false);
  return (
    <isFoodBarVisibleContext.Provider
      value={{ isFoodBarVisible, setIsFoodBarVisible }}
    >
      {children}
    </isFoodBarVisibleContext.Provider>
  );
};
