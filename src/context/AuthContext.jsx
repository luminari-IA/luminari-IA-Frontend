import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('luminary_token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // Validar token y cargar usuario
            api.get('/user')
                .then((res) => {
                    setUser(res.data);
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { access_token, user: userData } = response.data;
            
            localStorage.setItem('luminary_token', access_token);
            setToken(access_token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.errors?.email?.[0] || 'Error al iniciar sesión' 
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/auth/register', { 
                name, 
                email, 
                password,
                password_confirmation: password // Misma contraseña
            });
            const { access_token, user: userData } = response.data;
            
            localStorage.setItem('luminary_token', access_token);
            setToken(access_token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.errors?.email?.[0] || 'Error en el registro' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('luminary_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
