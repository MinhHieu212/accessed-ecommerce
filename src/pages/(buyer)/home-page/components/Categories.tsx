import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { toast } from "../../../../utils/Toastify";
import { constant_category } from "../../../../constants/constant_category";
import DynamicIcon from "../../../../components/DynamicIcon";
import { getCategories } from "../../../../api/CategoryApi";

export interface CategoryProps {
  id: number;
  name: string;
  parentId: number | null;
  subCategories: CategoryProps[];
  icon?: string;
}

const CategoryItem = (props: CategoryProps) => {
  return (
    <Box className="rounded-lg min-w-[100px] max-w-[100px] flex items-center justify-center flex-col">
      <div className="flex items-center justify-center p-4 rounded-full bg-gray-200 shadow-md">
        <DynamicIcon iconName={props.icon || "Smartphone"} size="medium" />
      </div>
      <p className="text-sm my-1 mt-2 font-medium text-[gray] capitalize truncate">
        {props.name || "no name"}
      </p>
    </Box>
  );
};

const Categories = () => {
  const [categories, setCategories] =
    useState<CategoryProps[]>(constant_category);

  useEffect(() => {
    const callApi = async () => {
      try {
        const response_data = await getCategories();
        const categoriesData = response_data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            parentId: item.parentId,
            subCategories: item.subCategories,
            icon: item.icon,
          };
        });
        console.log("Categories", categoriesData);
        setCategories(categoriesData);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    callApi();
  }, []);

  return (
    <div className="w-full my-[20px] mt-10 mb-10">
      <h2 className="mx-[auto] text-[22px]"> Our Top Categories </h2>
      <div className="overflow-x-scroll flex items-start justify-start mx-[auto] scrollBar">
        {categories.length > 0 ? (
          categories.map((item) => <CategoryItem key={item.id} {...item} />)
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg"> Loading... </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
