import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay thế bằng ABI của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetLoanDetails = () => {
    const [loanDetails, setLoanDetails] = useState<{
        loanAmount: string;
        interestRate: string;
        repaymentPeriod: string;
        collateralAsset: string;
        collateralAmount: string;
        startTime: string;
        isApproved: boolean;
        isRejected: boolean;
    } | null>(null); 
    const [userAddress, setUserAddress] = useState<string>(''); 
    const account = useAccount();

    const fetchLoanDetails = async () => {
        if (!userAddress) {
            alert('Please enter a user address.');
            return;
        }

        try {
            const loanResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'getLoanDetails',
                args: [userAddress as Address],
            });
            setLoanDetails(loanResult as {
                loanAmount: string;
                interestRate: string;
                repaymentPeriod: string;
                collateralAsset: string;
                collateralAmount: string;
                startTime: string;
                isApproved: boolean;
                isRejected: boolean;
            });
        } catch (error) {
            console.error('Error fetching loan details:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Loan Details</h2>
            <input
                type='text'
                placeholder='Enter User Address'
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
            />
            <button type='button' onClick={fetchLoanDetails}>Fetch Loan Details</button>
            <div className="loan-details">
                {loanDetails ? (
                    <div>
                        <h6>Loan Amount: {loanDetails.loanAmount}</h6>
                        <h6>Interest Rate: {loanDetails.interestRate}</h6>
                        <h6>Repayment Period: {loanDetails.repaymentPeriod}</h6>
                        <h6>Collateral Asset: {loanDetails.collateralAsset}</h6>
                        <h6>Collateral Amount: {loanDetails.collateralAmount}</h6>
                        <h6>Start Time: {loanDetails.startTime}</h6>
                        <h6>Approved: {loanDetails.isApproved ? 'Yes' : 'No'}</h6>
                        <h6>Rejected: {loanDetails.isRejected ? 'Yes' : 'No'}</h6>
                    </div>
                ) : (
                    <h6>No loan details available</h6>
                )}
            </div>
        </div>
    );
};

export default GetLoanDetails;
