import { Routes, Route, Navigate } from 'react-router-dom'
import TermsModal from './components/TermsModal'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import OnboardingIntereses from './pages/OnboardingIntereses'
import OnboardingNivel from './pages/OnboardingNivel'
import OnboardingIA from './pages/OnboardingIA'
import Salon from './pages/Salon'
import ClasesEnVivo from './pages/ClasesEnVivo'
import NivelEducativo from './pages/NivelEducativo'
import Evaluaciones from './pages/Evaluaciones'
import PruebaGratuita from './pages/PruebaGratuita'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <>
      <TermsModal />
      <Routes>
        <Route path="/"                      element={<Landing />} />
        <Route path="/login"                 element={<Login />} />
        <Route path="/registro"              element={<Register />} />
        <Route path="/prueba-gratuita"       element={<PruebaGratuita />} />
        <Route path="/onboarding/intereses"  element={<OnboardingIntereses />} />
        <Route path="/onboarding/nivel"      element={<OnboardingNivel />} />
        <Route path="/onboarding/ia"         element={<OnboardingIA />} />
        
        {/* Rutas Privadas */}
        <Route path="/salon"                 element={<ProtectedRoute><Salon /></ProtectedRoute>} />
        <Route path="/salon/vivo"            element={<ProtectedRoute><ClasesEnVivo /></ProtectedRoute>} />
        <Route path="/salon/nivel"           element={<ProtectedRoute><NivelEducativo /></ProtectedRoute>} />
        <Route path="/salon/evaluaciones"    element={<ProtectedRoute><Evaluaciones /></ProtectedRoute>} />
        <Route path="/salon/perfil"          element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        {/* Rutas Administrador */}
        <Route path="/admin"                 element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        
        <Route path="*"                      element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
