import React, { useState } from 'react';
import { publicClient } from '../../../clients'; // Đảm bảo rằng bạn đã cấu hình đúng client này
import { contract } from '../CollateralManagerAbi'; // Thay thế với đường dẫn đến ABI của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetMockToken = () => {
    const [mockTokenAddress, setMockTokenAddress] = useState<string | null>(null);
    const account = useAccount();

    const getMockToken = async () => {
        try {
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address,
                functionName: 'mockToken',
                args: [],
            });
            setMockTokenAddress(result as string);
        } catch (error) {
            console.error('Error fetching mock token address:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Mock Token Address</h2>
            <button type='button' onClick={getMockToken}>Get Mock Token Address</button>
            <div className="mock-token">
                <h6>Mock Token Address: {mockTokenAddress ? mockTokenAddress : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetMockToken;
