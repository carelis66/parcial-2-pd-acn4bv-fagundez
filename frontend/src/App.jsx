import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages públicas
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";

// Auth
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import DashboardAdmin from "./pages/admin/DashboardAdmin"; // cuando lo creemos
import DashboardCliente from "./pages/cliente/DashboardCliente";
import DashboardRecepcion from "./pages/recepcion/DashboardRecepcion";

// Protección
import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* Dashboards con protección */}
        <Route
          path="/cliente"
          element={
            <ProtectedRoute rol="cliente">
              <DashboardCliente />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recepcion"
          element={
            <ProtectedRoute rol="recepcion">
              <DashboardRecepcion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute rol="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;







