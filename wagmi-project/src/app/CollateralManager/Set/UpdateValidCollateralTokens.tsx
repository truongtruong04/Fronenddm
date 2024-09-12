import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../CollateralManagerAbi'; // Đảm bảo đường dẫn đến ABI là chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const UpdateValidCollateralTokens = () => {
  const [tokens, setTokens] = useState<string[]>([]);
  const [status, setStatus] = useState<boolean[]>([]);
  const account = useAccount();

  const handleTokenChange = (index: number, value: string) => {
    const updatedTokens = [...tokens];
    updatedTokens[index] = value;
    setTokens(updatedTokens);
  };

  const handleStatusChange = (index: number, value: boolean) => {
    const updatedStatus = [...status];
    updatedStatus[index] = value;
    setStatus(updatedStatus);
  };

  const addTokenField = () => {
    setTokens([...tokens, '']);
    setStatus([...status, false]);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tokens.length !== status.length) {
      alert('Tokens and status arrays must be of the same length.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'updateValidCollateralTokens',
        args: [tokens, status],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling updateValidCollateralTokens:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Valid Collateral Tokens</h2>
      <form onSubmit={submit}>
        {tokens.map((token, index) => (
          <div key={index} className="input-group">
            <label htmlFor={`token-${index}`}>Token Address {index + 1}</label>
            <input
              type='text'
              name={`token-${index}`}
              value={token}
              onChange={(e) => handleTokenChange(index, e.target.value)}
            />
            <label htmlFor={`status-${index}`}>Status {index + 1}</label>
            <select
              name={`status-${index}`}
              value={status[index] ? 'true' : 'false'}
              onChange={(e) => handleStatusChange(index, e.target.value === 'true')}
            >
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
          </div>
        ))}
        <button type='button' onClick={addTokenField}>Add Token</button>
        <button type='submit'>Update Tokens</button>
      </form>
    </div>
  );
};

export default UpdateValidCollateralTokens;
