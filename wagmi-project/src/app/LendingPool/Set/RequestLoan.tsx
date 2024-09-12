import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay thế bằng ABI thực tế của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const RequestLoan = () => {
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    interestRate: '',
    repaymentPeriod: '',
    collateralAsset: '',
    collateralAmount: '',
  });

  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { amount, interestRate, repaymentPeriod, collateralAsset, collateralAmount } = loanDetails;

    // Kiểm tra các trường bắt buộc
    if (!amount || !interestRate || !repaymentPeriod || !collateralAsset || !collateralAmount) {
      alert('Please fill in all the fields.');
      return;
    }

    try {
      // Gọi contract requestLoan
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'requestLoan',
        args: [
          BigInt(amount),
          BigInt(interestRate),
          BigInt(repaymentPeriod),
          collateralAsset as Address,
          BigInt(collateralAmount),
        ],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling requestLoan:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <h2>Request Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor="amount">Loan Amount</label>
        <input
          type="text"
          name="amount"
          value={loanDetails.amount}
          onChange={handleInputChange}
        />

        <label htmlFor="interestRate">Interest Rate</label>
        <input
          type="text"
          name="interestRate"
          value={loanDetails.interestRate}
          onChange={handleInputChange}
        />

        <label htmlFor="repaymentPeriod">Repayment Period</label>
        <input
          type="text"
          name="repaymentPeriod"
          value={loanDetails.repaymentPeriod}
          onChange={handleInputChange}
        />

        <label htmlFor="collateralAsset">Collateral Asset (Address)</label>
        <input
          type="text"
          name="collateralAsset"
          value={loanDetails.collateralAsset}
          onChange={handleInputChange}
        />

        <label htmlFor="collateralAmount">Collateral Amount</label>
        <input
          type="text"
          name="collateralAmount"
          value={loanDetails.collateralAmount}
          onChange={handleInputChange}
        />

        <button type="submit">Request Loan</button>
      </form>
    </div>
  );
};

export default RequestLoan;
