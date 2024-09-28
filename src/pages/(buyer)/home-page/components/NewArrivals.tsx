import React, { useEffect, useState } from "react";
import { Button, Grid2, useMediaQuery, useTheme } from "@mui/material";
import { getProductList } from "../../../../api/ProductApi";
import { toast } from "../../../../utils/Toastify";
import ProductItem from "./components/ProductItem";
import Grid from "@mui/material/Grid";
import { fakeProductList } from "../../../../constants/constant_product_list";
import { ProductProps } from "../../../../types/product_types";

const NewArrivals = () => {
  const [productList, setProductList] =
    useState<ProductProps[]>(fakeProductList);
  const [row, setRow] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  const getItemsPerRow = () => {
    if (isXs) return 2;
    if (isSm) return 3;
    if (isMd) return 3;
    return 4;
  };

  const itemsPerRow = getItemsPerRow();

  const handleShowMore = () => {
    setRow((prev) => prev + 1);
  };

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      try {
        const params = {
          limit: 10,
          page: 0,
          size: 100,
        };
        const response_data = await getProductList(params);
        const productsData = response_data.content;
        console.log("NewArrivals", productsData);
        setProductList(productsData);
      } catch (error: any) {
        // toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  return (
    <div className="w-full my-[20px] mt-[40px] mb-10 px-0">
      <h2 className="mx-auto text-[18px] sm:text-[22px] mb-6 text-start">
        New Arrivals 2023
      </h2>
      <Grid2 container spacing={2} className="transition-all">
        {productList.length > 0 ? (
          productList.slice(0, itemsPerRow * row).map((item, index) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 4, lg: 3 }} key={index}>
              <ProductItem key={item.id} item={item} loading={loading} />
            </Grid2>
          ))
        ) : (
          <Grid2 size={12}>
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-bold text-lg">No Products</p>
            </div>
          </Grid2>
        )}
      </Grid2>

      <div className="w-full items-center justify-center flex mt-[25px]">
        {row * itemsPerRow < productList.length ? (
          <Button
            variant="contained"
            className="bg-black text-white mt-5 capitalize text-sm sm:text-base"
            onClick={handleShowMore}
          >
            See more Products
          </Button>
        ) : (
          <Button
            variant="contained"
            className="bg-black text-white capitalize rounded-lg text-sm sm:text-base"
            onClick={() => setRow(1)}
          >
            Hide Products
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
