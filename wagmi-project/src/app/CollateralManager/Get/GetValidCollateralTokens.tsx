import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../CollateralManagerAbi'; // Đảm bảo đường dẫn đến ABI là chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const CheckValidCollateral = () => {
    const [tokenAddress, setTokenAddress] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const account = useAccount();

    const checkValidity = async () => {
        if (!tokenAddress) {
            alert('Please provide a token address.');
            return;
        }

        try {
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address,
                functionName: 'validCollateralTokens',
                args: [tokenAddress],
            });
            setIsValid(result as boolean);
        } catch (error) {
            console.error('Error fetching validity:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Check Valid Collateral</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    checkValidity();
                }}
            >
                <label htmlFor='tokenAddress'>Token Address</label>
                <input
                    type='text'
                    name='tokenAddress'
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                />
                <button type='submit'>Check Validity</button>
            </form>
            <div className="result">
                <h6>Valid: {isValid === null ? 'N/A' : isValid ? 'Yes' : 'No'}</h6>
            </div>
        </div>
    );
};

export default CheckValidCollateral;
