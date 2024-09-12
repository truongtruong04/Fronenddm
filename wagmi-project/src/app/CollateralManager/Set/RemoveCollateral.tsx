import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients'; // Đảm bảo rằng bạn đã cấu hình đúng client này
import { contract } from '../CollateralManagerAbi'; // Thay thế với đường dẫn đến ABI của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const RemoveCollateral = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || amount <= 0) {
      alert('Please provide a valid asset address and amount.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'removeCollateral',
        args: [assetAddress, amount],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling removeCollateral:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Remove Collateral</h2>
      <form onSubmit={submit}>
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />
        <label htmlFor='amount'>Amount</label>
        <input
          type='number'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button type='submit'>Remove Collateral</button>
      </form>
    </div>
  );
};

export default RemoveCollateral;
