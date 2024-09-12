import React, { useState } from 'react';
import { publicClient } from '../../../clients'; // Đảm bảo rằng bạn đã cấu hình đúng client này
import { contract } from '../CollateralManagerAbi'; // Thay thế với đường dẫn đến ABI của bạn
import { Address } from 'viem';

const GetCollateralFee = () => {
    const [collateralFee, setCollateralFee] = useState<number | null>(null);

    const getCollateralFee = async () => {
        try {
            const feeResult = await publicClient.readContract({
                abi: contract.abi, // ABI của hợp đồng
                address: contract.address as Address, // Địa chỉ hợp đồng
                functionName: 'addCollateralFee', // Tên hàm bạn muốn gọi
                args: [], // Đối số của hàm (nếu có)
            });
            setCollateralFee(feeResult as number); // Lưu kết quả vào state
        } catch (error) {
            console.error('Error fetching collateral fee:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Collateral Fee</h2>
            <button type='button' onClick={getCollateralFee}>Get Collateral Fee</button>
            <div className="fee">
                <h6>Collateral Fee: {collateralFee !== null ? collateralFee : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetCollateralFee;
