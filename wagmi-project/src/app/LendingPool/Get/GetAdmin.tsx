import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay bằng ABI của bạn
import { Address } from 'viem';

const GetAdmin = () => {
  const [admin, setAdmin] = useState<string | null>(null);

  const getAdmin = async () => {
    try {
      const adminResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address, // Địa chỉ contract của bạn
        functionName: 'admin', // Hàm gọi tên 'admin'
        args: [], // Hàm này không có tham số
      });
      setAdmin(adminResult as string); // Lưu kết quả là địa chỉ admin
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Admin</h2>
      <button type='button' onClick={getAdmin}>Get Admin</button>
      <div className="admin">
        <h6>Admin: {admin ? admin : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default GetAdmin;
