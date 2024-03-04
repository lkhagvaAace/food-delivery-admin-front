import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  isCategoryBarVisible: boolean;
  setIsCategoryBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const iContextState = {
  isCategoryBarVisible: false,
  setIsCategoryBarVisible: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const isCategoryBarVisibleContext =
  createContext<ThemContextType>(iContextState);
export const CategoryBarVisiblity = ({ children }: ChildrenType) => {
  const [isCategoryBarVisible, setIsCategoryBarVisible] = useState<
    true | false
  >(false);
  return (
    <isCategoryBarVisibleContext.Provider
      value={{ isCategoryBarVisible, setIsCategoryBarVisible }}
    >
      {children}
    </isCategoryBarVisibleContext.Provider>
  );
};
