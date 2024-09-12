'use client';

import React from 'react';
import App from '../connect';
import AddCollateral from '../CollateralManager/Set/AddCollateral';
import LockCollateral from '../CollateralManager/Set/LockCollateral';
import RemoveCollateral from '../CollateralManager/Set/RemoveCollateral';
import SetContractAddress from '../CollateralManager/Set/SetContractAddress';
import SetFee from '../CollateralManager/Set/SetFee';
import SetValiCollateral from '../CollateralManager/Set/SetValiCollateral';
import UnlockCollateral from '../CollateralManager/Set/UnLockCollateral';
import UpdateValiCollateralTokens from '../CollateralManager/Set/UpdateValidCollateralTokens';

import GetAdmin from '../CollateralManager/Get/GetAdmin';
import GetAssetPrice from '../CollateralManager/Get/GetAssetPrice';
import GetCollateralAssets from '../CollateralManager/Get/GetCollateralAssets';
import GetCollateralFee from '../CollateralManager/Get/GetCollateralFee';
import GetMockToken from '../CollateralManager/Get/GetMockToken';
import GetPriceOracle from '../CollateralManager/Get/GetPriceOracle';
import GetRemovalFee from '../CollateralManager/Get/GetRemoveFee';
import CheckValidCollateral from '../CollateralManager/Get/GetValidCollateralTokens';
const CollateralManager = () => {
    return (
        <div className="main-container">
            <App />
            <div className="grid-container">
                <div className = "column1">
                    <AddCollateral />
                    <LockCollateral />
                    <RemoveCollateral />
                    <SetContractAddress />
                    <SetFee />
                    <SetValiCollateral/>
                    <UnlockCollateral />
                    <UpdateValiCollateralTokens />
                </div>
                <div className = "column2">
                    <GetCollateralFee />    
                    <GetAdmin />
                    <GetAssetPrice />
                    <GetCollateralAssets />
                    <GetCollateralFee />
                    <GetMockToken />
                    <GetPriceOracle />
                    <GetRemovalFee />
                    <CheckValidCollateral />
                </div>
            </div>
        </div>
    );
}
export default CollateralManager;