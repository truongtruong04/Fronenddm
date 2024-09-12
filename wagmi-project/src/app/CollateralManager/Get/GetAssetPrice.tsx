import React, { useState } from 'react';
import { publicClient } from '../../../clients'; // Đảm bảo rằng bạn đã cấu hình đúng client này
import { contract } from '../CollateralManagerAbi'; // Thay thế với đường dẫn đến ABI của bạn
import { Address } from 'viem';

const GetAssetPrice = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [assetPrice, setAssetPrice] = useState<number | null>(null);

  const fetchAssetPrice = async () => {
    if (!assetAddress) {
      alert('Please provide an asset address.');
      return;
    }

    try {
      const priceResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'getAssetPrice',
        args: [assetAddress],
      });

      setAssetPrice(priceResult as number);
    } catch (error) {
      console.error('Error fetching asset price:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Asset Price</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchAssetPrice(); }}>
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />
        <button type='submit'>Get Price</button>
      </form>
      {assetPrice !== null && (
        <div className="price">
          <h6>Asset Price: {assetPrice}</h6>
        </div>
      )}
    </div>
  );
};

export default GetAssetPrice;
