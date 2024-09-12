import React, { useState } from 'react';
import { publicClient, walletClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Đảm bảo sử dụng ABI phù hợp
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const Deposit = () => {
  const [assetAddress, setAssetAddress] = useState<string>(''); // Địa chỉ asset
  const [amount, setAmount] = useState<string>(''); // Số lượng tài sản cần nạp
  const account = useAccount(); // Tài khoản người dùng

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || !amount) {
      alert('Please provide both asset address and amount.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, // Địa chỉ contract của bạn
        functionName: 'deposit', // Hàm bạn muốn gọi
        args: [assetAddress, BigInt(amount)], // Tham số hàm
        account: account.address as Address, // Địa chỉ tài khoản hiện tại
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash); // Ghi lại hash giao dịch
    } catch (error) {
      console.error('Error calling deposit:', error); // Ghi lại lỗi nếu có
    }
  };

  return (
    <div className="form-container">
      <h2>Deposit</h2>
      <form onSubmit={submit}>
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />

        <label htmlFor='amount'>Amount</label>
        <input
          type='number'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type='submit'>Deposit</button>
      </form>
    </div>
  );
};

export default Deposit;
