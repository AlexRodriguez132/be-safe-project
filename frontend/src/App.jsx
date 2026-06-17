import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/courses/AdminLayout';
import UserLayout from './components/courses/UserLayout';
import AdminCursosPage from './pages/admin/AdminCursosPage';
import NuevoCursoPage from './pages/admin/NuevoCursoPage';
import DetalleCursoPage from './pages/admin/DetalleCursoPage';
import NuevoModuloPage from './pages/admin/NuevoModuloPage';
import NuevaLeccionPage from './pages/admin/NuevaLeccionPage';
import HomePage from './pages/user/HomePage';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Vista usuario */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mis-cursos" element={<PlaceholderPage title="Mis cursos" />} />
          <Route path="/calendario" element={<PlaceholderPage title="Calendario" />} />
          <Route path="/pagos" element={<PlaceholderPage title="Pagos" />} />
          <Route path="/grupos" element={<PlaceholderPage title="Grupos" />} />
          <Route path="/clases-en-vivo" element={<PlaceholderPage title="Clases en vivo" />} />
          <Route path="/asesorias" element={<PlaceholderPage title="Asesorías" />} />
          <Route path="/configuracion" element={<PlaceholderPage title="Configuración" />} />
        </Route>

        {/* Vista admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/cursos" replace />} />
          <Route path="cursos" element={<AdminCursosPage />} />
          <Route path="cursos/nuevo" element={<NuevoCursoPage />} />
          <Route path="cursos/editar/:id" element={<NuevoCursoPage />} />
          <Route path="cursos/:id/detalle" element={<DetalleCursoPage />} />
          <Route path="cursos/:id/modulos/nuevo" element={<NuevoModuloPage />} />
          <Route path="cursos/:id/modulos/:idModulo/editar" element={<NuevoModuloPage />} />
          <Route path="cursos/:id/modulos/:idModulo/lecciones/nuevo" element={<NuevaLeccionPage />} />
          <Route path="cursos/:id/modulos/:idModulo/lecciones/:idLeccion/editar" element={<NuevaLeccionPage />} />
          {/* Rutas pendientes — otros módulos */}
          <Route path="dashboard" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="usuarios" element={<PlaceholderPage title="Usuarios" />} />
          <Route path="pagos" element={<PlaceholderPage title="Pagos" />} />
          <Route path="grupos" element={<PlaceholderPage title="Grupos" />} />
          <Route path="configuracion" element={<PlaceholderPage title="Configuración" />} />
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
