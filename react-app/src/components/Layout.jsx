import React from 'react';
import Header from './../components/dashboard/partials/Header';

const Layout = ({ children }) => {
    return (
        <div className="wrapper">
            <Header />
            { children }
        </div>
    );
};

export default Layout;
