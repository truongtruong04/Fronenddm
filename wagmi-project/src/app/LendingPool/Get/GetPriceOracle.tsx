import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay thế bằng ABI thực tế của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetPriceOracleAddress = () => {
    const [priceOracle, setPriceOracle] = useState<string | null>(null); 
    const account = useAccount();

    const getPriceOracleAddress = async () => {
        try {
            const priceOracleResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'priceOracleAddress',
                args: [],
            });
            setPriceOracle(priceOracleResult as string); 
        } catch (error) {
            console.error('Error fetching Price Oracle Address:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Price Oracle Address</h2>
            <button type='button' onClick={getPriceOracleAddress}>Get Price Oracle Address</button>
            <div className="price-oracle">
                <h6>Price Oracle Address: {priceOracle ? priceOracle : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetPriceOracleAddress;
