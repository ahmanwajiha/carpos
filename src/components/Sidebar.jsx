import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaBars,
    FaHome,
    FaCar,
    FaUserCog,
    FaChevronDown,
} from "react-icons/fa";

const Sidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [openVehiclesMenu, setOpenVehiclesMenu] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleToggle = () => {
        setCollapsed(!collapsed);
        if (!collapsed) {
            setOpenVehiclesMenu(false);
            setProfileMenuOpen(false);
        }
    };

    // Active link highlighting
    const linkClasses = (path) => {
        const isActive = location.pathname === path;
        return `
      flex items-center gap-2 py-2 px-4 rounded-md cursor-pointer 
      hover:bg-blue-500 transition-colors
      ${isActive ? "bg-blue-500 border-l-4 border-white" : ""}
    `;
    };

    // Check if Manage Cars submenu is active
    const isManageCarsActive = location.pathname.startsWith("/admin/manage-cars");

    return (
        <div
            className={`
        fixed top-0 left-0 h-screen bg-blue-600 text-white
        flex flex-col ${collapsed ? "w-20" : "w-64"}
        transition-all duration-300 z-50
      `}
        >
            {/* Top Section: Logo + Toggle Button */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-blue-500">
                <span className="text-xl font-bold">
                    {collapsed ? "LB" : "Lightbox"}
                </span>
                <button onClick={handleToggle} className="text-white focus:outline-none">
                    <FaBars />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 mt-4">
                <ul className="space-y-1">
                    {/* Dashboard */}
                    <li>
                        <Link to="/admin" className={linkClasses("/admin")}>
                            <FaHome />
                            {!collapsed && <span>Dashboard</span>}
                        </Link>
                    </li>

                    {/* Manage Cars (Collapsible Submenu) */}
                    <li>
                        <button
                            type="button"
                            onClick={() => setOpenVehiclesMenu(!openVehiclesMenu)}
                            className={`
                flex items-center gap-2 py-2 px-4 rounded-md cursor-pointer
                hover:bg-blue-500 transition-colors
                ${isManageCarsActive ? "bg-blue-500 border-l-4 border-white" : ""}
              `}
                        >
                            <FaCar />
                            {!collapsed && <span>Manage Cars</span>}
                        </button>

                        {/* Submenu for Manage Cars */}
                        {openVehiclesMenu && !collapsed && (
                            <ul className="ml-8 space-y-1 mt-1">
                                <li>
                                    <Link to="/admin/manage-cars/add" className={linkClasses("/admin/manage-cars/add")}>
                                        Add Car
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/manage-cars/list" className={linkClasses("/admin/manage-cars/list")}>
                                        List Cars
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Manage Accounts */}
                    <li>
                        <Link to="/admin/manage-accounts" className={linkClasses("/admin/manage-accounts")}>
                            <FaUserCog />
                            {!collapsed && <span>Manage Accounts</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Profile Section */}
            <div className="border-t border-blue-500 p-4 relative">
                <button
                    type="button"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center justify-between w-full focus:outline-none"
                >
                    <div className="flex items-center gap-2">
                        {/* Avatar Circle */}
                        <div className="bg-blue-400 rounded-full w-9 h-9 flex items-center justify-center">
                            <span className="font-bold text-white">A</span>
                        </div>

                        {/* User Info (Only Visible When Sidebar Expanded) */}
                        {!collapsed && (
                            <div className="leading-tight text-left">
                                <div className="font-semibold">Allan King</div>
                                <div className="text-sm text-blue-200">allan.king@example.com</div>
                            </div>
                        )}
                    </div>

                    {/* Profile Menu Dropdown */}
                    {!collapsed && (
                        <FaChevronDown
                            className={`transition-transform ${profileMenuOpen ? "rotate-180" : ""}`}
                        />
                    )}
                </button>

                {/* Profile Menu (Dropdown) */}
                {profileMenuOpen && !collapsed && (
                    <div className="
              absolute bottom-[70px] left-4 right-4
              bg-white text-gray-700 rounded-md shadow-lg z-10
            "
                    >
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Account Settings
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Sign Out
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
