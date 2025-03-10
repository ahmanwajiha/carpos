import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import ManageCars from "./pages/ManageCars"
import AddCar from "./pages/AddCar"
import Login from "./pages/Login"

function App() {
  return (
    <Routes>
      {/* Login route without sidebar */}
      <Route path="/logina" element={<Login />} />

      {/* All other routes with sidebar */}
      <Route
        path="/*"
        element={
          <div className="flex min-h-screen bg-white">
            <Sidebar />
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manage-cars" element={<ManageCars />} />
                <Route path="/manage-cars/add" element={<AddCar />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  )
}

export default App
