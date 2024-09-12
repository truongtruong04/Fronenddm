import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay thế bằng ABI hợp đồng thực tế
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetReserveTokens = () => {
  const [reserveIndex, setReserveIndex] = useState<string>(''); // Chỉ số để lấy token
  const [reserveToken, setReserveToken] = useState<{ symbol: string; assetAddress: string } | null>(null);
  const account = useAccount();

  const getReserveToken = async () => {
    if (!reserveIndex) {
      alert('Please provide a reserve index.');
      return;
    }

    try {
      const result = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'reserveTokens',
        args: [BigInt(reserveIndex)],
      });

      const [symbol, assetAddress] = result as [string, Address];
      setReserveToken({ symbol, assetAddress });
    } catch (error) {
      console.error('Error fetching reserve token:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Reserve Token</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getReserveToken();
        }}
      >
        <label htmlFor="reserveIndex">Reserve Index</label>
        <input
          type="text"
          name="reserveIndex"
          value={reserveIndex}
          onChange={(e) => setReserveIndex(e.target.value)}
        />
        <button type="submit">Get Reserve Token</button>
      </form>

      {reserveToken && (
        <div className="reserve-token-info">
          <h6>Symbol: {reserveToken.symbol}</h6>
          <h6>Asset Address: {reserveToken.assetAddress}</h6>
        </div>
      )}
    </div>
  );
};

export default GetReserveTokens;
