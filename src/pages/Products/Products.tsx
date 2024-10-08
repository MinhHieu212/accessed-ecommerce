import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fake_data_products } from "../../data/fake_data_products";

interface CategoryProps {
  id: number;
  name: string;
  parentID: number | null;
  noOfViews: number;
  productsSold: number;
}

interface ProductItemProps {
  id: number;
  name: string;
  oldPrice: number;
  price: number;
  rating: number;
  brandName: string | null;
  viewCount: number;
  imageURL: string[] | null;
  description: string;
  quantitySold: number;
  remainingQuantity: number;
  categories: CategoryProps[];
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const fallbackImageURL =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <div className="w-full mx-auto mb-2 p-3 rounded-xl flex items-center justify-start gap-3 border-2 border-solid border-gray-200 bg-[#f9fcff] ">
      <div className="w-[150px] h-[130px] rounded-lg overflow-hidden">
        <img
          src={
            props.imageURL && props.imageURL.length > 0
              ? props.imageURL[0]
              : fallbackImageURL
          }
          alt={`Product: ${props.name}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex h-full items-start w-full justify-start flex-col p-2">
        <p className="text-lg my-1 font-medium">Name: {props.name}</p>
        <p className="text-sm my-1">
          {props.categories.map(
            (item, index) =>
              `${item.name} ${
                index !== props.categories.length - 1 ? " & " : ""
              }`
          )}
        </p>
        <p className="text-sm my-1 font-medium text-[gray]">
          Price: ${props.price.toFixed(2)} $
        </p>
        <p className="text-sm my-1 font-medium text-[gray]">
          Onhand: {props.remainingQuantity} unit
        </p>
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[1430px] mx-auto h-full">
      <div className="flex h-12 items-center justify-between px-5 mt-5">
        <h2 className="font-bold">Products</h2>
        <Button
          size="large"
          variant="contained"
          className="capitalize"
          onClick={() => navigate("/products/add-product")}
        >
          Add new Product
        </Button>
      </div>
      <Stack
        spacing={2}
        className="h-[calc(100dvh-160px)] overflow-y-scroll px-5 mt-5"
      >
        {fake_data_products.status === 200 ? (
          fake_data_products.data.map((item) => (
            <ProductItem key={item.id} {...item} />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg">No Product Data</p>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default Products;
