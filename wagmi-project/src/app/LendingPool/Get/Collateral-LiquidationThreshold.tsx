import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay thế bằng ABI thực tế của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetLoanDetailse = () => {
    const [loanDetails, setLoanDetails] = useState<any>(null); 
    const [userAddress, setUserAddress] = useState<string>(''); 
    const account = useAccount();

    const getLoanDetailse = async () => {
        if (!userAddress) {
            alert('Please provide a user address.');
            return;
        }

        try {
            const loanResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'loans',
                args: [userAddress as Address],
            });
            setLoanDetails(loanResult); 
        } catch (error) {
            console.error('Error fetching loan details:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Loan Details</h2>
            <label htmlFor='userAddress'>User Address</label>
            <input
                type='text'
                name='userAddress'
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
            />
            <button type='button' onClick={getLoanDetailse}>Get Loan Details</button>

            {loanDetails && (
                <div className="loan-details">
                    <p>User: {loanDetails.user}</p>
                    <p>Loan Amount: {loanDetails.loanAmount.toString()}</p>
                    <p>Interest Rate: {loanDetails.interestRate.toString()}</p>
                    <p>Repayment Period: {loanDetails.repaymentPeriod.toString()}</p>
                    <p>Collateral Asset Address: {loanDetails.collateral.assetAddress}</p>
                    <p>Collateral Amount: {loanDetails.collateral.amount.toString()}</p>
                    <p>Start Time: {loanDetails.startTime.toString()}</p>
                    <p>Approved: {loanDetails.isApproved ? 'Yes' : 'No'}</p>
                    <p>Rejected: {loanDetails.isRejected ? 'Yes' : 'No'}</p>
                    <p>Due Time: {loanDetails.dueTime.toString()}</p>
                    <p>Liquidation Threshold: {loanDetails.liquidationThreshold.toString()}</p>
                </div>
            )}
        </div>
    );
};

export default GetLoanDetailse;
