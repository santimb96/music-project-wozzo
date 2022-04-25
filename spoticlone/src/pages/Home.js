import React from "react";
import Header from "../components/common/Header";
import MediaList from "../components/MediaList";
import SidebarHome from "../components/common/SidebarHome";
import HomeHeader from "../components/HomeHeader";

const Home = () => {
  return (
    <div className="row home-page">
      <SidebarHome />
      <div className="col-12 col-md-10 p-0 bg-dark">
        <div className="row">
          <HomeHeader />          
        </div>
      </div>
    </div>
  );
};

export default Home;
