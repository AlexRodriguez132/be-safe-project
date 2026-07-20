import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/courses/AdminLayout';
import UserLayout from './components/courses/UserLayout';
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import AdminCursosPage from './pages/admin/AdminCursosPage';
import NuevoCursoPage from './pages/admin/NuevoCursoPage';
import DetalleCursoPage from './pages/admin/DetalleCursoPage';
import NuevoModuloPage from './pages/admin/NuevoModuloPage';
import NuevaLeccionPage from './pages/admin/NuevaLeccionPage';
import NuevoCuestionarioPage from './pages/admin/NuevoCuestionarioPage';
import VistaPreviaCursoPage from './pages/admin/VistaPreviaCursoPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import HomePage from './pages/user/HomePage';
import MisCursosPage from './pages/user/MisCursosPage';
import './styles/global.css';
import InstructorDashboardPage from './instructor/InstructorDashboardPage';
import InstructorLayout from './components/instructor/InstructorLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* Usuario */}
        <Route element={<UserLayout />}>
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/mis-cursos" element={<MisCursosPage />} />
          <Route path="/calendario" element={<PlaceholderPage title="Calendario" />} />
          <Route path="/pagos" element={<PlaceholderPage title="Pagos" />} />
          <Route path="/grupos" element={<PlaceholderPage title="Grupos" />} />
          <Route path="/clases-en-vivo" element={<PlaceholderPage title="Clases en vivo" />} />
          <Route path="/asesorias" element={<PlaceholderPage title="Asesorías" />} />
          <Route path="/configuracion" element={<PlaceholderPage title="Configuración" />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="cursos" element={<AdminCursosPage />} />
          <Route path="cursos/nuevo" element={<NuevoCursoPage />} />
          <Route path="cursos/editar/:id" element={<NuevoCursoPage />} />
          <Route path="cursos/:id/detalle" element={<DetalleCursoPage />} />
          <Route path="cursos/:id/vista-previa" element={<VistaPreviaCursoPage />} />
          <Route path="cursos/:id/modulos/nuevo" element={<NuevoModuloPage />} />
          <Route path="cursos/:id/modulos/:idModulo/editar" element={<NuevoModuloPage />} />
          <Route path="cursos/:id/modulos/:idModulo/lecciones/nuevo" element={<NuevaLeccionPage />} />
          <Route path="cursos/:id/modulos/:idModulo/lecciones/:idLeccion/editar" element={<NuevaLeccionPage />} />
          <Route path="cursos/:id/modulos/:idModulo/cuestionarios/nuevo" element={<NuevoCuestionarioPage />} />
          <Route path="cursos/:id/modulos/:idModulo/cuestionarios/:idCuestionario/editar" element={<NuevoCuestionarioPage />} />
          <Route path="usuarios" element={<PlaceholderPage title="Usuarios" />} />
          <Route path="pagos" element={<PlaceholderPage title="Pagos" />} />
          <Route path="grupos" element={<PlaceholderPage title="Grupos" />} />
          <Route path="configuracion" element={<PlaceholderPage title="Configuración" />} />
        </Route>

        <Route path="/instructor" element={<InstructorLayout/>}>
            <Route index element={<Navigate to="/instructor/dashboard"/>}/>
            <Route path="dashboard" element={<InstructorDashboardPage/>}/>
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div style={{ padding: 40, color: '#6b7280' }}>
      <h2>{title}</h2>
      <p>Módulo pendiente — otro equipo.</p>
    </div>
  );
}
