'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    return (
        <div className="topnav">
            <Link className='active' to="/">Home</Link>
            <Link to="/collateralmanager">Collateral Manager</Link>
            <Link to="/priceoracle">Price Oracle</Link>
            <Link to="/lendingPool">Lending Pool</Link>
            <Link to="/borrower">Borrower</Link>
        </div>
    );
};

export default Nav;