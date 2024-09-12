import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay bằng ABI của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const ApproveLoan = () => {
  const [userAddress, setUserAddress] = useState<string>(''); // Địa chỉ user cần duyệt
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAddress) {
      alert('Please provide a user address.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, // Địa chỉ contract của bạn
        functionName: 'approvedLoan', // Hàm bạn muốn gọi
        args: [userAddress], // Tham số là địa chỉ của user
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling approvedLoan:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Approve Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor='userAddress'>User Address</label>
        <input
          type='text'
          name='userAddress'
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button type='submit'>Approve Loan</button>
      </form>
    </div>
  );
};

export default ApproveLoan;
