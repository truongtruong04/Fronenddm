import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients'; // Đảm bảo rằng bạn đã cấu hình đúng client này
import { contract } from '../CollateralManagerAbi'; // Thay thế với đường dẫn đến ABI của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const LockCollateral = () => {
  const [user, setUser] = useState<string>('');
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !assetAddress || amount === '') {
      alert('Please provide user address, asset address, and amount.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'lockCollateral',
        args: [user, assetAddress, amount],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling lockCollateral:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Lock Collateral</h2>
      <form onSubmit={submit}>
        <label htmlFor='user'>User Address</label>
        <input
          type='text'
          name='user'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
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
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button type='submit'>Lock Collateral</button>
      </form>
    </div>
  );
};

export default LockCollateral;
