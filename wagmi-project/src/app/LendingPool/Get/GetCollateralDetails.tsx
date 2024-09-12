import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay bằng ABI của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetCollateralDetails = () => {
    const [collaterals, setCollaterals] = useState<{ assetAddress: string, amount: number }[]>([]); 
    const [userAddress, setUserAddress] = useState<string>(''); 
    const account = useAccount();

    const fetchCollateralDetails = async () => {
        if (!userAddress) {
            alert('Please enter a user address.');
            return;
        }

        try {
            const collateralResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'getCollateralDetails',
                args: [userAddress as Address],
            });
            setCollaterals(collateralResult as { assetAddress: string, amount: number }[]);
        } catch (error) {
            console.error('Error fetching collateral details:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Collateral Details</h2>
            <input
                type='text'
                placeholder='Enter User Address'
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
            />
            <button type='button' onClick={fetchCollateralDetails}>Fetch Collaterals</button>
            <div className="collaterals">
                {collaterals.length > 0 ? (
                    collaterals.map((collateral, index) => (
                        <div key={index} className="collateral-item">
                            <h6>Asset Address: {collateral.assetAddress}</h6>
                            <p>Amount: {collateral.amount}</p>
                        </div>
                    ))
                ) : (
                    <h6>No collateral details available</h6>
                )}
            </div>
        </div>
    );
};

export default GetCollateralDetails;
