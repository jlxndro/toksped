import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import UserChoice from "./pages/UserChoice";
import Pembeli from "./pages/Pembeli";
import Penjual from "./pages/Penjual";
import ProtectedRoute from "./components/protectedroute";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pembeli" element={<Pembeli />} />
          <Route
            path="/penjual"
            element={
              <ProtectedRoute>
                <Penjual />
              </ProtectedRoute>
            }
          />
          <Route path="/user-choice" element={<UserChoice />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
