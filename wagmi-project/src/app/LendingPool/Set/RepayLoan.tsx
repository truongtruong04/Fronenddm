import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay thế bằng ABI thực tế của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const RepayLoan = () => {
  const [amount, setAmount] = useState<string>(''); // Số lượng tiền muốn trả lại
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || isNaN(Number(amount))) {
      alert('Please provide a valid repayment amount.');
      return;
    }

    try {
      // Simulate the contract call
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'repay',
        args: [BigInt(amount)], // Số tiền trả lại
        account: account.address as Address,
      });

      // Execute the contract call
      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling repay:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Repay Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor='amount'>Repayment Amount</label>
        <input
          type='text'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type='submit'>Repay Loan</button>
      </form>
    </div>
  );
};

export default RepayLoan;
