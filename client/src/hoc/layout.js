//layout - this is a hoc
import React from 'react';
//import header
import Header from '../components/Header/header';

const Layout = (props) => {
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;