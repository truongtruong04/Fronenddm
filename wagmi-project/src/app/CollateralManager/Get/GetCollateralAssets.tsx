import React, { useState } from 'react';
import { publicClient } from '../../../clients'; // Đảm bảo rằng bạn đã cấu hình đúng client này
import { contract } from '../CollateralManagerAbi'; // Thay thế với đường dẫn đến ABI của bạn
import { Address } from 'viem';

const GetCollateralAssets = () => {
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [collateralData, setCollateralData] = useState<{
    amount: number;
    isLocked: boolean;
    aTokenAmount: number;
  } | null>(null);

  const fetchCollateralAssets = async () => {
    if (!address1 || !address2) {
      alert('Please provide both addresses.');
      return;
    }

    try {
      const result = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'collateralAssets',
        args: [address1, address2],
      });

      const [amount, isLocked, aTokenAmount] = result as [number, boolean, number];
      setCollateralData({ amount, isLocked, aTokenAmount });
    } catch (error) {
      console.error('Error fetching collateral assets:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Collateral Assets</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchCollateralAssets(); }}>
        <label htmlFor='address1'>Address 1</label>
        <input
          type='text'
          name='address1'
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <label htmlFor='address2'>Address 2</label>
        <input
          type='text'
          name='address2'
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <button type='submit'>Get Collateral Assets</button>
      </form>
      {collateralData && (
        <div className="collateral-data">
          <h6>Amount: {collateralData.amount}</h6>
          <h6>Is Locked: {collateralData.isLocked ? 'Yes' : 'No'}</h6>
          <h6>aToken Amount: {collateralData.aTokenAmount}</h6>
        </div>
      )}
    </div>
  );
};

export default GetCollateralAssets;
