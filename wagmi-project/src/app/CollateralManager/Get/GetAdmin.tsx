import React, { useState } from 'react';
import { publicClient } from '../../../clients'; // Đảm bảo rằng bạn đã cấu hình đúng client này
import { contract } from '../CollateralManagerAbi'; // Thay thế với đường dẫn đến ABI của bạn
import { Address } from 'viem';

const GetAdmin = () => {
    const [admin, setAdmin] = useState<string | null>(null);

    const getAdmin = async () => {
        try {
            const adminResult = await publicClient.readContract({
                abi: contract.abi, // ABI của hợp đồng
                address: contract.address as Address, // Địa chỉ hợp đồng
                functionName: 'admin', // Tên hàm bạn muốn gọi
                args: [], // Đối số của hàm (nếu có)
            });
            setAdmin(adminResult as string); // Lưu kết quả vào state
        } catch (error) {
            console.error('Error fetching admin:', error);
        }
    }

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
