import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div className="lum-container text-center pt-5" style={{color: '#fff'}}>Cargando...</div>;

    if (!user || user.role !== 'admin') {
        return <Navigate to="/salon" replace />;
    }

    return children;
}
