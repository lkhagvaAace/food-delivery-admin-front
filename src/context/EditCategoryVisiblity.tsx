import React, { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  editCategoryVisiblity: boolean;
  setEditCategoryVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
};
const iContextState = {
  editCategoryVisiblity: false,
  setEditCategoryVisiblity: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const EditCategoryVisiblityContext =
  createContext<ThemContextType>(iContextState);
export const EditCategoryBarVisiblity = ({ children }: ChildrenType) => {
  const [editCategoryVisiblity, setEditCategoryVisiblity] = useState<
    true | false
  >(false);
  return (
    <EditCategoryVisiblityContext.Provider
      value={{ editCategoryVisiblity, setEditCategoryVisiblity }}
    >
      {children}
    </EditCategoryVisiblityContext.Provider>
  );
};
