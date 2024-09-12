import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay thế bằng ABI thực tế của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const Liquidate = () => {
  const [userAddress, setUserAddress] = useState<string>(''); 
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAddress) {
      alert('Please provide a user address to liquidate.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'liquidate',
        args: [userAddress as Address],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling liquidate:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Liquidate</h2>
      <form onSubmit={submit}>
        <label htmlFor='userAddress'>User Address to Liquidate</label>
        <input
          type='text'
          name='userAddress'
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button type='submit'>Liquidate</button>
      </form>
    </div>
  );
};

export default Liquidate;
