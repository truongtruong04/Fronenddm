import React, { useState } from 'react';
import { publicClient } from '../../../clients';
import { contract } from '../CollateralManagerAbi'; // Đảm bảo rằng bạn đã cấu hình đúng đường dẫn đến ABI của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetRemoveCollateralFee = () => {
    const [fee, setFee] = useState<number | null>(null);
    const account = useAccount();

    const getRemoveCollateralFee = async () => {
        try {
            const feeResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address,
                functionName: 'removeCollateralFee',
                args: [], // Không có đối số cho hàm này
            });
            setFee(feeResult as number);
        } catch (error) {
            console.error('Error fetching removeCollateralFee:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Remove Collateral Fee</h2>
            <button type='button' onClick={getRemoveCollateralFee}>Get Fee</button>
            <div className="fee">
                <h6>Fee: {fee !== null ? fee : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetRemoveCollateralFee;
