import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
    const { token, user, isLoading } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (location.search.includes('viewAsStudent=true')) {
            sessionStorage.setItem('viewAsStudent', 'true');
        }
    }, [location]);

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

    const isViewingAsStudent = sessionStorage.getItem('viewAsStudent') === 'true';

    if (user && user.role === 'admin' && !isViewingAsStudent) {
        return <Navigate to="/admin" replace />;
    }

    return children;
}
