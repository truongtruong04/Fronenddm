"use client";

import React from "react";
import SetServiceFee from "../Borrower/Set/SetServiceFee";
import SetRiskParameters from "../Borrower/Set/SetRiskParameters";
import RepayLoan from "../Borrower/Set/SetRepayLoan";
import LiquidateLoan from "../Borrower/Set/SetLiquidateLoan";
import CreateLoan from "../Borrower/Set/SetCreateLoan";
import SetContractAddress from "../Borrower/Set/SetContractAddress";
import CalculateTotalRepayment from "../Borrower/Set/SetCaculateTotalRepayment";

import GetAdmin from "../Borrower/Get/GetAdmin";
import CalculateLoanHealthIndex from "../Borrower/Get/GetCaculateLoanHealthIndex";
import GetCollateralManager from "../Borrower/Get/GetCollateralManager";
import GetLendingPool from "../Borrower/Get/GetLendingPool";
import GetAllLoanIDs from "../Borrower/Get/GetLoanID";
import GetPriceOracle from "../Borrower/Get/GetPriceOracle";
import GetRiskParameters from "../Borrower/Get/GetRiskParameters";
import GetServiceFee from "../Borrower/Get/GetServiceFee";
import GetUserLoan from "../Borrower/Get/GetUserLoan";

import App from "../connect";
const Borrower = () => {
  return (
    <div className="main-container">
      <App />
      <div className="grid-container">
        <div className="colum1">
          <SetServiceFee />
          <SetRiskParameters />
          <RepayLoan />
          <LiquidateLoan />
          <CreateLoan />
          <SetContractAddress />
          <CalculateTotalRepayment />
        </div>
        <div className="colum2">
          <GetAdmin />
          <CalculateLoanHealthIndex />
          <GetCollateralManager />
          <GetLendingPool />
          <GetAllLoanIDs />
          <GetPriceOracle />
          <GetRiskParameters />
          <GetServiceFee />
          <GetUserLoan />
        </div>
      </div>
    </div>
  );
};
export default Borrower;
