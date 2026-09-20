import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { token, user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--lum-bg)', color: 'var(--lum-text)' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (user && user.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
}
