"use client";

import React from "react";
import AddReserveToken from "../LendingPool/Set/AddReserveToken";
import ApproveLoan from "../LendingPool/Set/ApprovedLoan";
import Deposit from "../LendingPool/Set/Deposit";
import Liquidate from "../LendingPool/Set/Liquidate";
import RejectLoan from "../LendingPool/Set/RejectLoan";
import RepayLoan from "../LendingPool/Set/RepayLoan";
import RequestLoan from "../LendingPool/Set/RequestLoan";
import SetMockTokenAddress from "../LendingPool/Set/SetMockTokenAddress";
import SetPriceOracleAddress from "../LendingPool/Set/SetPriceOracleAddress";
import SetToken from "../LendingPool/Set/SetToken";
import WithdrawFunds from "../LendingPool/Set/Withdraw";

import CaculateInterest from "../LendingPool/Get/CaculateInterest";
import GetLoanDetailse from "../LendingPool/Get/Collateral-LiquidationThreshold";
import GetAdmin from "../LendingPool/Get/GetAdmin";
import GetAllReservesTokens from "../LendingPool/Get/GetAllReservesTokens";
import GetCollateralDetails from "../LendingPool/Get/GetCollateralDetails";
import GetLoanDetails from "../LendingPool/Get/GetLoanDetails";
import GetPriceOracleAddress from "../LendingPool/Get/GetPriceOracle";
import GetReserveTokens from "../LendingPool/Get/GetReserveTokens";
import GetServiceFee from "../LendingPool/Get/GetSeviceFee";
import GetToken from "../LendingPool/Get/GetToken";

import App from "../connect";
const LendingPool = () => {
  return (
    <div className="main-container">
      <App />
      <div className="grid-container">
        <div className="colum1">
          <AddReserveToken />
          <ApproveLoan />
          <Deposit />
          <Liquidate />
          <RejectLoan />
          <RepayLoan />
          <RequestLoan />
          <SetMockTokenAddress />
          <SetPriceOracleAddress />
          <SetToken />
          <WithdrawFunds />
        </div>
        <div className="colum2">
          <CaculateInterest />
          <GetLoanDetailse />
          <GetAdmin />
          <GetAllReservesTokens />
          <GetCollateralDetails />
          <GetLoanDetails />
          <GetPriceOracleAddress />
          <GetReserveTokens />
          <GetServiceFee />
          <GetToken />
        </div>
      </div>
    </div>
  );
};
export default LendingPool;
