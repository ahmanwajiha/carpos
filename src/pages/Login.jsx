import React from "react"

const Login = () => {
    return (
        <div className="flex h-screen">
            {/* Left panel with background image */}
            <div
                className="w-1/2 bg-cover bg-center relative hidden md:block"
                style={{ backgroundImage: `url('/login.jpg')` }}
            >
                {/* Brand name at the top-left (optional logo) */}
                <div className="absolute top-4 left-4 text-white text-xl font-bold flex items-center">
                    Car POS
                </div>
            </div>

            {/* Right panel with login form */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="max-w-sm w-full px-6 py-8">
                    <h1 className="text-2xl font-bold mb-6">Log in</h1>
                    <form>
                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Password *
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Continue button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
