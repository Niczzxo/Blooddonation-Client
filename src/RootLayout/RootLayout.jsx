import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className='flex-1 pt-24'>
                <Outlet></Outlet>
            </div>
            <Footer/>
        </div>
    );
};

export default RootLayout;