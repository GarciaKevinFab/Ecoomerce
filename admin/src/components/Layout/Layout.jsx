import React, { useState } from "react";
import Routers from "../../router/Routers";
import Topbar from './../topbar/Topbar';
import Sidebar from "./../sidebar/Sidebar";
import './layout.css'

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const layoutClass = sidebarOpen ? "layoutWithSidebarOpen" : "";

    return (
        <>
            <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} />
            <div className={`mainContent ${layoutClass}`}>
                <Routers />
            </div>
        </>
    );
};


export default Layout;
