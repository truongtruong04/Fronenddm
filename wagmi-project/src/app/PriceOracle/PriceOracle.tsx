"use client";

import React from "react";
import UpdateAssetPrice from "../PriceOracle/Set/SetAssetPrice";
import SetDefaultLiquidationThreshold from "../PriceOracle/Set/SetDefaultLiquidation";
import UpdateLiquidationThreshold from "../PriceOracle/Set/SetLiquidationThreshold";

import GetAssetPrice from "../PriceOracle/Get/GetAssetPrice";
import GetLiquidationThresholds from "../PriceOracle/Get/GetLiquidationThesholds";
import GetDefaultLiquidationThreshold from "../PriceOracle/Get/GetLiquidationThreshold";
import GetOwner from "../PriceOracle/Get/GetOwner";
import App from "../connect";
const PriceOrcale = () => {
  return (
    <div className="main-container ">
      <App />
      <div className="grid-container">
        <div className="colum1">
          <GetOwner />
          <GetAssetPrice />
          <GetLiquidationThresholds />
          <GetDefaultLiquidationThreshold />
        </div>
        <div className="colum2">
          <UpdateAssetPrice />
          <SetDefaultLiquidationThreshold />
          <UpdateLiquidationThreshold />
        </div>
      </div>
    </div>
  );
};
export default PriceOrcale;
