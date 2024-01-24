// LayoutRoutes.js
import React, { useState } from "react";
import Routers from "./Routers";
import Topbar from '../components/topbar/Topbar';
import Sidebar from "../components/sidebar/Sidebar";
import '../components/Layout/layout.css';

const LayoutRoutes = () => {
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

export default LayoutRoutes;
