const HeroSection = () => {
    return (
        <div className="relative h-[80vh] bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url('/login.jpg')` }}>  {/* Replace with actual image path */}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative container mx-auto text-white text-center px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Fast And Easy Way to Buy Or Sell Cars 🇷🇼
                </h1>

                {/* Search Bar */}
                <div className="bg-white rounded-md p-2 flex items-center justify-between max-w-lg mx-auto mt-6">
                    <input
                        type="text"
                        placeholder="Search your desired car"
                        className="px-4 py-2 w-full text-black outline-none"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Search</button>
                </div>

                {/* Sell Car Button */}
                <div className="mt-6">
                    <button className="bg-white text-black px-6 py-2 rounded-md font-medium">
                        Sell Car +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
