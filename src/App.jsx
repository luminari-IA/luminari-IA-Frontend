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

export default function App() {
  return (
    <>
      {/* Modal de términos — se muestra en TODA la app al primer acceso */}
      <TermsModal />

      <Routes>
        <Route path="/"                      element={<Landing />} />
        <Route path="/login"                 element={<Login />} />
        <Route path="/registro"              element={<Register />} />
        <Route path="/prueba-gratuita"       element={<PruebaGratuita />} />
        <Route path="/onboarding/intereses"  element={<OnboardingIntereses />} />
        <Route path="/onboarding/nivel"      element={<OnboardingNivel />} />
        <Route path="/onboarding/ia"         element={<OnboardingIA />} />
        <Route path="/salon"                 element={<Salon />} />
        <Route path="/salon/vivo"            element={<ClasesEnVivo />} />
        <Route path="/salon/nivel"           element={<NivelEducativo />} />
        <Route path="/salon/evaluaciones"    element={<Evaluaciones />} />
        <Route path="*"                      element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
