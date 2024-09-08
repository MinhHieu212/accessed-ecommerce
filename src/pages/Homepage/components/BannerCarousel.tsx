import { Button, Paper } from "@mui/material";
import { IconGardenCart } from "@tabler/icons-react";
import { relative } from "path";
import React from "react";
import Carousel from "react-material-ui-carousel";

interface BannerProp {
  cover_url: string;
  direct_path: string;
  color: string;
  image_object: string;
}

const bannerList: BannerProp[] = [
  {
    cover_url:
      "https://i.pinimg.com/originals/ea/bd/aa/eabdaadef69a169117a2900e77bfde9f.jpg",
    image_object: "top",
    color: "black",
    direct_path: "/outline-generator",
  },
  {
    cover_url:
      "https://vatvostudio.vn/wp-content/uploads/2023/01/GALAXY-S23-SERIES-LO-ANH-POSTER-TRUOC-NGAY-RA-MAT.jpg",
    image_object: "top",
    color: "white",
    direct_path: "/course-outline",
  },
  {
    cover_url:
      "https://vatvostudio.vn/wp-content/uploads/2023/01/Galaxy-S23-series-lo-poster-truoc-ngay-ra-mat-6.jpg",
    image_object: "center",
    color: "white",
    direct_path: "/outline-generator",
  },

  {
    cover_url:
      "https://cuahangsamsung.vn/filemanager/userfiles/hinh-san-pham/banner/samsung-banner-watch.png",
    image_object: "center",
    color: "gray",
    direct_path: "/ai-buildere",
  },
];

const Banner = (props: BannerProp) => {
  return (
    <Paper
      elevation={3}
      style={{
        backgroundImage: `url(${props.cover_url})`,
        backgroundPosition: props.image_object,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        margin: "0 auto",
        height: "500px",
        color: props.color,
        width: "100%",
        borderRadius: "15px",
        position: "relative",
      }}
    >
      <div className="absolute bottom-[140px] left-[100px]">
        <div className="flex-col flex items-start justify-center">
          <p className="text-[40px] my-0  font-bold">New Year Sale</p>
          <p className="text-[40px] my-0  font-bold">Offer 2024</p>
          <p className="text-[50px] my-0  font-bold">20% OFF</p>
        </div>
        <Button
          className={`bg-black text-white flex items-center justify-center`}
          variant="contained"
          size="large"
        >
          <IconGardenCart className="mr-2" size={22} />
          <span className={`capitalize mt-[1px]`}>Shopping now</span>
        </Button>
      </div>
    </Paper>
  );
};

const BannerCarousel = () => {
  return (
    <div className="mx-auto w-full] mb-10">
      <Carousel
        next={() => console.log(`we left and are now at`)}
        prev={() => console.log(`we left and are now at`)}
        indicatorContainerProps={{
          style: {
            position: "absolute",
            bottom: "10px",
            left: "30px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          },
        }}
      >
        {bannerList.map((item, i) => (
          <Banner
            key={i}
            cover_url={item.cover_url}
            direct_path={item.direct_path}
            color={item.color}
            image_object={item.image_object}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
