import React, { useState } from 'react';
import { publicClient } from '../../../clients'; // Đảm bảo rằng bạn đã cấu hình đúng client này
import { contract } from '../CollateralManagerAbi'; // Thay thế với đường dẫn đến ABI của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetPriceOracle = () => {
    const [priceOracle, setPriceOracle] = useState<string | null>(null);
    const account = useAccount();

    const getPriceOracle = async () => {
        try {
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address,
                functionName: 'priceOracle',
                args: [],
            });
            setPriceOracle(result as string);
        } catch (error) {
            console.error('Error fetching price oracle address:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Price Oracle</h2>
            <button type='button' onClick={getPriceOracle}>Get Price Oracle</button>
            <div className="price-oracle">
                <h6>Price Oracle Address: {priceOracle ? priceOracle : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetPriceOracle;
