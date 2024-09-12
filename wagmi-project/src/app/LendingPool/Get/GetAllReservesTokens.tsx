import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay bằng ABI của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetAllReservesTokens = () => {
    const [tokens, setTokens] = useState<{ symbol: string, assetAddress: string }[]>([]); 
    const account = useAccount();

    const fetchTokens = async () => {
        try {
            const tokensResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'getAllReservesTokens',
                args: [],
            });
            setTokens(tokensResult as { symbol: string, assetAddress: string }[]);
        } catch (error) {
            console.error('Error fetching reserves tokens:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get All Reserves Tokens</h2>
            <button type='button' onClick={fetchTokens}>Fetch Tokens</button>
            <div className="tokens">
                {tokens.length > 0 ? (
                    tokens.map((token, index) => (
                        <div key={index} className="token-item">
                            <h6>Symbol: {token.symbol}</h6>
                            <p>Address: {token.assetAddress}</p>
                        </div>
                    ))
                ) : (
                    <h6>No tokens available</h6>
                )}
            </div>
        </div>
    );
};

export default GetAllReservesTokens;
