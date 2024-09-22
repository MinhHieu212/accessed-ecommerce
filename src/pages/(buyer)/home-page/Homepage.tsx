import React from "react";
import Categories from "./components/Categories";
import Banners from "./components/Banners";
import Populars from "./components/Populars";
import NewArrivals from "./components/NewArrivals";
import Showcase from "./components/Showcase";
import { useAppSelector } from "../../../store/store";

const Homepage = () => {
  const userRole = useAppSelector((state) => state.roles.user_role);
  return (
    <div className="w-full max-w-[1200px] p-3  mx-auto bg-white">
      <Banners />
      <Categories />
      <Populars />
      <NewArrivals />
      {userRole === "buyer" && <Showcase />}
    </div>
  );
};

export default Homepage;
