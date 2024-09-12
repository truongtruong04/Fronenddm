import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay bằng ABI của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const CalculateInterest = () => {
  const [loanAmount, setLoanAmount] = useState<string>(''); // Khoản vay
  const [interestRate, setInterestRate] = useState<string>(''); // Lãi suất
  const [startTime, setStartTime] = useState<string>(''); // Thời gian bắt đầu
  const [interest, setInterest] = useState<string | null>(null); // Kết quả tính lãi
  const account = useAccount();

  const calculateInterest = async () => {
    try {
      const interestResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address, // Địa chỉ contract của bạn
        functionName: 'calculateInterest', // Hàm bạn muốn gọi
        args: [BigInt(loanAmount), BigInt(interestRate), BigInt(startTime)], // Tham số hàm
      });

      // Cast interestResult to BigInt and then convert to string
      setInterest((interestResult as BigInt).toString()); // Chuyển đổi kiểu
    } catch (error) {
      console.error('Error calculating interest:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Calculate Interest</h2>
      <label htmlFor='loanAmount'>Loan Amount</label>
      <input
        type='number'
        name='loanAmount'
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />

      <label htmlFor='interestRate'>Interest Rate</label>
      <input
        type='number'
        name='interestRate'
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />

      <label htmlFor='startTime'>Start Time</label>
      <input
        type='number'
        name='startTime'
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <button type='button' onClick={calculateInterest}>Calculate Interest</button>

      <div className="result">
        <h6>Calculated Interest: {interest ? interest : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default CalculateInterest;
