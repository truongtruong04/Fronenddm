import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay thế bằng ABI thực tế của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const RejectLoan = () => {
  const [userAddress, setUserAddress] = useState<string>(''); // Địa chỉ của người dùng cần reject loan
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAddress) {
      alert('Please provide a user address.');
      return;
    }

    try {
      // Simulate the contract call
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'rejectLoan',
        args: [userAddress],
        account: account.address as Address,
      });

      // Execute the contract call
      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling rejectLoan:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Reject Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor='userAddress'>User Address</label>
        <input
          type='text'
          name='userAddress'
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button type='submit'>Reject Loan</button>
      </form>
    </div>
  );
};

export default RejectLoan;
