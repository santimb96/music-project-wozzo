import React from "react";
import './index.scss';
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
const GlobalLoading = () => {
  return (
    <div className="loading-page"><SpinnerLoading /></div>
  );
};

export default GlobalLoading;