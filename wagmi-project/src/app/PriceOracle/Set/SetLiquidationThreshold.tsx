import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../PriceOracleAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const UpdateLiquidationThreshold = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [threshold, setThreshold] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || !threshold) {
      alert('Please provide both asset address and threshold.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'updateLiquidationThreshold',
        args: [assetAddress, BigInt(threshold)],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling updateLiquidationThreshold:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Liquidation Threshold</h2>
      <form onSubmit={submit}>
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />
        <label htmlFor='threshold'>Threshold</label>
        <input
          type='text'
          name='threshold'
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
        <button type='submit'>Update Threshold</button>
      </form>
    </div>
  );
};

export default UpdateLiquidationThreshold;
