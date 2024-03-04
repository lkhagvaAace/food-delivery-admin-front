import React, { ReactNode, useState } from "react";
import { createContext } from "react";
import { Category } from "@/types/CategoryType";

type ThemContextType = {
  editableCategory: Category | null;
  setEditableCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

const InitialValue: ThemContextType = {
  editableCategory: {
    _id: "",
    name: "",
  },
  setEditableCategory: () => {},
};

type ChildrenType = {
  children: ReactNode;
};

export const EditbleCategoryContext =
  createContext<ThemContextType>(InitialValue);

export const EditbleCategory = ({ children }: ChildrenType) => {
  const [editableCategory, setEditableCategory] = useState<Category | null>(
    null
  );

  return (
    <EditbleCategoryContext.Provider
      value={{ editableCategory, setEditableCategory }}
    >
      {children}
    </EditbleCategoryContext.Provider>
  );
};
