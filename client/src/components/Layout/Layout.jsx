import React from "react";
import Routers from "../../router/Routers";
import Footer from './../Footer/Footer';
import Navbar from "./../Navbar/Navbar";
import Announcement from "./../Announcement/Announcement"

const Layout = () => {
    return (
        <>
            <Announcement />
            <Navbar />
            <Routers />
            <Footer />
        </>
    );
};

export default Layout;