import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
// import CarListPublic from "./pages/CarListPublic"; // Public car listing page
// import SellCarForm from "./pages/SellCarForm"; // Public car selling form
// import ViewCarPublic from "./pages/ViewCarPublic"; // Public car details page

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ManageCars from "./pages/ListCars";
import AddCar from "./pages/AddCar";
import Login from "./pages/Login";
import ListCars from "./pages/ListCars";
import CarFinancialForm from './pages/CarFinancialForm';
import ViewCarDetails from './pages/ViewCarDetails';
import NewCarsSection from "./components/NewCarSection";

function App() {
  return (
    <Routes>
      {/* Public Website Routes */}
      <Route
        path="/"
        element={
          <div>
            <Navbar />
            <HeroSection />


            <NewCarsSection />


          </div>
        }
      />
      {/* <Route path="/sell-car" element={<SellCarForm />} />
      <Route path="/car/:carId" element={<ViewCarPublic />} /> */}

      {/* Login Route (Standalone Page) */}
      <Route path="/login" element={<Login />} />

      {/* Admin Panel (SPA with Sidebar) */}
      <Route
        path="/admin/*"
        element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4 ml-64 overflow-y-auto h-screen">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manage-cars" element={<ManageCars />} />
                <Route path="/manage-cars/add" element={<AddCar />} />
                <Route path="/manage-cars/list" element={<ListCars />} />
                <Route path="/add-financial-details/:carId" element={<CarFinancialForm />} />
                <Route path="/view-car/:carId" element={<ViewCarDetails />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
