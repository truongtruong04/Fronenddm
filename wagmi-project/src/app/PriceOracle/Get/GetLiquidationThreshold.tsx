import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../PriceOracleAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';
const GetLiquidationThreshold = () => {
    const [assetAddress, setAssetAddress] = useState<string>('');
    const [threshold, setThreshold] = useState<string | null>(null);
    const account = useAccount();
  
    const getThreshold = async () => {
      if (!assetAddress) {
        alert('Please provide an asset address.');
        return;
      }
  
      try {
        const thresholdResult = await publicClient.readContract({
          abi: contract.abi,
          address: contract.address as Address,
          functionName: 'getLiquidationThreshold',
          args: [assetAddress],
        });
  
        // Kiểm tra và chuyển đổi kiểu của thresholdResult
        if (typeof thresholdResult === 'bigint') {
          setThreshold(thresholdResult.toString());
        } else if (typeof thresholdResult === 'string') {
          setThreshold(thresholdResult);
        } else {
          console.error('Unexpected result type:', typeof thresholdResult);
          setThreshold('N/A');
        }
      } catch (error) {
        console.error('Error fetching liquidation threshold:', error);
        setThreshold('N/A');
      }
    };
  
    return (
      <div className="form-container">
        <h2>Get Liquidation Threshold</h2>
        <form onSubmit={(e) => { e.preventDefault(); getThreshold(); }}>
          <label htmlFor='assetAddress'>Asset Address</label>
          <input
            type='text'
            name='assetAddress'
            value={assetAddress}
            onChange={(e) => setAssetAddress(e.target.value)}
          />
          <button type='submit'>Get Threshold</button>
        </form>
        <div className="threshold">
          <h6>Threshold: {threshold !== null ? threshold : 'N/A'}</h6>
        </div>
      </div>
    );
  };
  
  export default GetLiquidationThreshold;