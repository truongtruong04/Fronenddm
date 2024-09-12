import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../PriceOracleAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetDefaultLiquidationThreshold = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || !percentage) {
      alert('Please provide both asset address and percentage.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'setDefaultLiquidationThreshold',
        args: [assetAddress, BigInt(percentage)],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling setDefaultLiquidationThreshold:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Default Liquidation Threshold</h2>
      <form onSubmit={submit}>
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />
        <label htmlFor='percentage'>Percentage</label>
        <input
          type='text'
          name='percentage'
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <button type='submit'>Set Threshold</button>
      </form>
    </div>
  );
};

export default SetDefaultLiquidationThreshold;
