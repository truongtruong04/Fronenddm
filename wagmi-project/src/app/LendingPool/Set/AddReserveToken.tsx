import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay bằng ABI thực của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const AddReserveToken = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [assetAddress, setAssetAddress] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!symbol || !assetAddress) {
      alert('Please provide both symbol and asset address.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, // Địa chỉ contract của bạn
        functionName: 'addReserveToken', // Hàm bạn muốn gọi
        args: [symbol, assetAddress], // Các đối số
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling addReserveToken:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Reserve Token</h2>
      <form onSubmit={submit}>
        <label htmlFor='symbol'>Symbol</label>
        <input
          type='text'
          name='symbol'
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />
        <button type='submit'>Add Reserve Token</button>
      </form>
    </div>
  );
};

export default AddReserveToken;
