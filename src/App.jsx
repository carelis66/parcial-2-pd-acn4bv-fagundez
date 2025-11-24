import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages públicas
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";

// Auth
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Cliente 
import DashboardCliente from "./pages/cliente/DashboardCliente";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/services" element={<Servicios />} />

        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard Cliente */}
        <Route path="/cliente" element={<DashboardCliente />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;





