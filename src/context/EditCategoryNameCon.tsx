import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  editCategoryNameVisiblity: boolean;
  setEditCategoryNameVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
};
const iContextState = {
  editCategoryNameVisiblity: false,
  setEditCategoryNameVisiblity: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const EditCategoryNameVisiblityContext =
  createContext<ThemContextType>(iContextState);
export const EditCategoryNameVisiblity = ({ children }: ChildrenType) => {
  const [editCategoryNameVisiblity, setEditCategoryNameVisiblity] = useState<
    true | false
  >(false);
  return (
    <EditCategoryNameVisiblityContext.Provider
      value={{ editCategoryNameVisiblity, setEditCategoryNameVisiblity }}
    >
      {children}
    </EditCategoryNameVisiblityContext.Provider>
  );
};
