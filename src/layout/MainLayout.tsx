import React from "react";
import SellerHeader from "../components/SellerHeader";
import SellerSideBar from "../components/SellerSideBar";
import BuyerFooter from "../components/BuyerFooter";
import BuyerHeader from "../components/BuyerHeader";
import { useAppSelector } from "../store/store";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const userRole = useAppSelector((state) => state.role.user_role);

  return (
    <div className="flex-col flex items-center justify-start w-[100dvw] h-[100dvh] overflow-hidden">
      {userRole === "buyer" && <BuyerHeader />}
      <div className="flex-row flex items-center justify-start w-full h-full">
        {userRole === "seller" && <SellerSideBar />}
        <div
          className={`flex-col w-full ${
            userRole === "seller" && "h-[100dvh]"
          } flex items-start justify-center`}
        >
          {userRole === "seller" && <SellerHeader />}
          <div className="flex-col h-[calc(100dvh-60px)] w-full overflow-y-scroll flex items-center justify-start">
            <div className="w-full">{children}</div>
            {userRole === "buyer" && <BuyerFooter />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
