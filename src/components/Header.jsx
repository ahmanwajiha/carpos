import { FaUserCircle } from 'react-icons/fa';

function Header() {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <div className="text-xl font-semibold">
                Car POS
            </div>
            <div className="flex items-center space-x-4">
                <FaUserCircle className="text-2xl" />
                <span>Profile Name</span>
                <button className="text-red-600">Logout</button>
            </div>
        </header>
    );
}

export default Header;
