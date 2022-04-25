import React from "react";
import Header from "../components/common/Header";
import MediaList from "../components/MediaList";
import SidebarHome from "../components/common/SidebarHome";

const Home = () => {
  return (
    <div className="row">
        <SidebarHome />
        <MediaList />
    </div>
  )
}

export default Home;