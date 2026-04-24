import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import EventoDetalle from "./pages/EventoDetalle";
import MisEventos from "./pages/MisEventos";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EventosPage from "./pages/EventosPage";
import UnirseEvento from "./pages/UnirseEventoPage";
import RutaProtegida from "./components/RutaProtegida";
import HomePage from "./pages/HomePage";
import AdminPonentes from "./pages/AdminPonentes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminActividades from "./pages/AdminActividades";
import VerificarCertificado from "./pages/VerificarCertificado";
import AdminInscripciones from "./pages/AdminInscripciones";
import AdminUsuarios from "./pages/AdminUsuarios";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/evento/:id" element={<EventoDetalle />} />
        <Route path="/mis-eventos" element={<RutaProtegida rolPermitido="participante"><MisEventos /></RutaProtegida>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<RutaProtegida rolPermitido="admin"><Dashboard /></RutaProtegida>} />
        <Route path="/eventos" element={<RutaProtegida rolPermitido="admin"><EventosPage /></RutaProtegida>} />
        <Route path="/unirse" element={<UnirseEvento />} />
        <Route path="/admin/ponentes" element={<AdminPonentes />} />
        <Route path="/admin/actividades/:eventoId" element={<AdminActividades />} />
        <Route path="/admin/ponentes/:eventoId" element={<AdminPonentes key={window.location.pathname} />} />
        <Route path="/verificar/:codigo" element={<VerificarCertificado />} />
        <Route path="/admin/inscripciones" element={<AdminInscripciones />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
      </Routes>
    </BrowserRouter>

    <ToastContainer 
    position="top-right"
    autoClose={3000}
    theme="colored"
    />
    </>
  );
}

export default App;