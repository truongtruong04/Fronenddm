import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../PriceOracleAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetAssetPrice = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [assetPrice, setAssetPrice] = useState<string | null>(null);
  const account = useAccount();

  const getAssetPrice = async () => {
    if (!assetAddress) {
      alert('Please provide an asset address.');
      return;
    }

    try {
      // Sử dụng type assertion để chỉ định rằng kết quả trả về là một bigint
      const priceResult = (await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'getAssetPrice',
        args: [assetAddress],
      })) as bigint;

      setAssetPrice(priceResult.toString());
    } catch (error) {
      console.error('Error fetching asset price:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Asset Price</h2>
      <label htmlFor='assetAddress'>Asset Address</label>
      <input
        type='text'
        name='assetAddress'
        value={assetAddress}
        onChange={(e) => setAssetAddress(e.target.value)}
      />
      <button type='button' onClick={getAssetPrice}>Get Asset Price</button>
      <div className="asset-price">
        <h6>Asset Price: {assetPrice ? assetPrice : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default GetAssetPrice;
