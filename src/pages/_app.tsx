import { EditCategoryNameVisiblity } from "@/context/EditCategoryNameCon";
import { EditCategoryBarVisiblity } from "@/context/EditCategoryVisiblity";
import { EditbleCategory } from "@/context/EditableCategory";
import { CategoryBarVisiblity } from "@/context/createCategoryVisiblity";
import { FoodBarVisiblity } from "@/context/createFoodVisiblity";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EditbleCategory>
      <FoodBarVisiblity>
        <CategoryBarVisiblity>
          <EditCategoryBarVisiblity>
            <EditCategoryNameVisiblity>
              <Component {...pageProps} />
            </EditCategoryNameVisiblity>
          </EditCategoryBarVisiblity>
        </CategoryBarVisiblity>
      </FoodBarVisiblity>
    </EditbleCategory>
  );
}
