import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
    FaBars,
    FaHome,
    FaCar,
    FaUserCog,
    FaChevronDown
} from "react-icons/fa"

const Sidebar = () => {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)
    const [openVehiclesMenu, setOpenVehiclesMenu] = useState(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)

    const handleToggle = () => {
        setCollapsed(!collapsed)
        // Close submenus if collapsing the entire sidebar
        if (!collapsed) {
            setOpenVehiclesMenu(false)
            setProfileMenuOpen(false)
        }
    }

    // Highlight active link for exact path
    const linkClasses = (path) => {
        const isActive = location.pathname === path
        return `
      flex items-center gap-2 py-2 px-4 rounded-md cursor-pointer 
      hover:bg-blue-500 transition-colors
      ${isActive ? "bg-blue-500 border-l-4 border-white" : ""}
    `
    }

    // For "Manage Vehicles," highlight if any sub-route is active
    const isManageVehiclesActive = location.pathname.startsWith("/manage-vehicles")
    const vehiclesLinkClasses = `
    flex items-center gap-2 py-2 px-4 rounded-md cursor-pointer
    hover:bg-blue-500 transition-colors
    ${isManageVehiclesActive ? "bg-blue-500 border-l-4 border-white" : ""}
  `

    return (
        <div
            className={`
        h-screen flex flex-col bg-blue-600 text-white
        ${collapsed ? "w-20" : "w-64"}
        transition-all duration-300
      `}
        >
            {/* Top section: Logo + Toggle button */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-blue-500">
                <span className="text-xl font-bold">
                    {collapsed ? "LB" : "Lightbox"}
                </span>
                <button onClick={handleToggle} className="text-white focus:outline-none">
                    <FaBars />
                </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 mt-4">
                <ul className="space-y-1">
                    {/* Dashboard */}
                    <li>
                        <Link to="/" className={linkClasses("/")}>
                            <FaHome />
                            {!collapsed && <span>Dashboard</span>}
                        </Link>
                    </li>

                    {/* Manage Vehicles (collapsible submenu) */}
                    <li>
                        <button
                            type="button"
                            onClick={() => setOpenVehiclesMenu(!openVehiclesMenu)}
                            className={vehiclesLinkClasses}
                        >
                            <FaCar />
                            {!collapsed && <span>Manage Vehicles</span>}
                        </button>

                        {/* Submenu for Manage Vehicles */}
                        {openVehiclesMenu && !collapsed && (
                            <ul className="ml-8 space-y-1 mt-1">
                                <li>
                                    <Link
                                        to="/manage-vehicles/add"
                                        className={linkClasses("/manage-vehicles/add")}
                                    >
                                        Add Car
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/manage-vehicles/list"
                                        className={linkClasses("/manage-vehicles/list")}
                                    >
                                        List Car
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Manage Accounts */}
                    <li>
                        <Link
                            to="/manage-accounts"
                            className={linkClasses("/manage-accounts")}
                        >
                            <FaUserCog />
                            {!collapsed && <span>Manage Accounts</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Bottom section: Profile info with collapsible menu */}
            <div className="border-t border-blue-500 p-4 relative">
                {/* Profile row */}
                <button
                    type="button"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center justify-between w-full focus:outline-none"
                >
                    <div className="flex items-center gap-2">
                        {/* Avatar Circle (replace with an <img> if desired) */}
                        <div className="bg-blue-400 rounded-full w-9 h-9 flex items-center justify-center">
                            <span className="font-bold text-white">A</span>
                        </div>
                        {/* Conditionally show name/email if not collapsed */}
                        {!collapsed && (
                            <div className="leading-tight text-left">
                                <div className="font-semibold">Allan King</div>
                                <div className="text-sm text-blue-200">allan.king@example.com</div>
                            </div>
                        )}
                    </div>

                    {/* Chevron (only if expanded sidebar) */}
                    {!collapsed && (
                        <FaChevronDown
                            className={`transition-transform ${profileMenuOpen ? "rotate-180" : ""
                                }`}
                        />
                    )}
                </button>

                {/* Profile menu (collapses upward) */}
                {profileMenuOpen && !collapsed && (
                    <div
                        className="
              absolute
              bottom-[70px]     /* positions the menu above the profile row */
              left-4
              right-4
              bg-white
              text-gray-700
              rounded-md
              shadow-lg
              z-10
            "
                    >
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Account settings
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Sign out
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
