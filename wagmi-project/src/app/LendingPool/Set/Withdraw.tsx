import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Đảm bảo đường dẫn ABI hợp đồng chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const WithdrawFunds = () => {
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
        functionName: 'withdraw',
        args: [assetAddress, amount],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling withdraw:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Withdraw Funds</h2>
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
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button type='submit'>Withdraw</button>
      </form>
    </div>
  );
};

export default WithdrawFunds;
