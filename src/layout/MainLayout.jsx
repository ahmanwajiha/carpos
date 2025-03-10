import Sidebar from "../components/Sidebar"

const MainLayout = ({ children }) => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-6">
                {children}
            </div>
        </div>
    )
}

export default MainLayout
