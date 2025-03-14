import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
                }`}
        >
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className={`text-2xl font-bold transition-all ${isScrolled ? "text-blue-600" : "text-white"}`}>
                    <Link to="/">AUTO24</Link>
                </div>

                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-6 font-medium transition-all">
                    <li><Link to="/buy" className={`hover:text-blue-600 ${isScrolled ? "text-black" : "text-white"}`}>Buy</Link></li>
                    <li><Link to="/sell" className={`hover:text-blue-600 ${isScrolled ? "text-black" : "text-white"}`}>Sell</Link></li>
                    <li><Link to="/finance" className={`hover:text-blue-600 ${isScrolled ? "text-black" : "text-white"}`}>Finance</Link></li>
                    <li><Link to="/insure" className={`hover:text-blue-600 ${isScrolled ? "text-black" : "text-white"}`}>Insure</Link></li>
                    <li><Link to="/blog" className={`hover:text-blue-600 ${isScrolled ? "text-black" : "text-white"}`}>Blog</Link></li>
                    <li className="flex items-center">
                        <Link to="/tools" className={`hover:text-blue-600 ${isScrolled ? "text-black" : "text-white"}`}>Tools</Link>
                        <FiChevronDown className={`ml-1 transition-all ${isScrolled ? "text-black" : "text-white"}`} />
                    </li>
                </ul>

                {/* Right Section (Call + Language + Sign In) */}
                <div className="flex items-center space-x-6 transition-all">
                    {/* Call Us */}
                    <div className="hidden md:flex items-center space-x-2 text-sm font-medium">
                        <FaPhoneAlt className="text-blue-600" />
                        <span className={`${isScrolled ? "text-black" : "text-white"}`}>
                            +250 788 308 775
                        </span>
                    </div>

                    {/* Language Selector */}
                    <div className="flex items-center space-x-1 text-sm font-medium">
                        <span className={`${isScrolled ? "text-black" : "text-white"}`}>🇺🇸 EN</span>
                        <FiChevronDown className={`transition-all ${isScrolled ? "text-black" : "text-white"}`} />
                    </div>

                    {/* Sign In Button */}
                    <Link
                        to="/login"
                        className={`px-4 py-2 border rounded-md transition-all ${isScrolled ? "bg-gray-100 text-black border-gray-300" : "bg-transparent text-white border-white"
                            } hover:bg-gray-200`}
                    >
                        Sign In
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
