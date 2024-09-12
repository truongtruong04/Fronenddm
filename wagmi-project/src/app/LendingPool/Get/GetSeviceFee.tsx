import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../LendingPoolAbi'; // Thay bằng ABI hợp đồng thực tế
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetServiceFee = () => {
  const [serviceFee, setServiceFee] = useState<string | null>(null);
  const account = useAccount();

  const fetchServiceFee = async () => {
    try {
      const feeResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'serviceFee',
        args: [],
      });
      
      // Ép kiểu feeResult thành string hoặc number tùy theo nhu cầu
      setServiceFee(feeResult as string);  // Nếu feeResult là chuỗi
      // setServiceFee((feeResult as number).toString());  // Nếu feeResult là số
    } catch (error) {
      console.error('Error fetching service fee:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Service Fee</h2>
      <button type='button' onClick={fetchServiceFee}>Fetch Service Fee</button>
      <div className="service-fee">
        <h6>Service Fee: {serviceFee ? serviceFee : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default GetServiceFee;
