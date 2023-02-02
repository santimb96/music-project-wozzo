import React from "react";
import './index.scss';
const SpinnerLoading = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SpinnerLoading;
