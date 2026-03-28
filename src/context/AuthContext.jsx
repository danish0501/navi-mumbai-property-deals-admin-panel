import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Hardcoded Credentials
const ADMIN_CREDENTIALS = {
    email: 'admin@propertydeals.com',
    password: 'admin123'
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in (using localStorage for session persistence)
        const savedUser = localStorage.getItem('admin_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            // Check credentials against hardcoded values
            if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                const userData = { email, role: 'Administrator', name: 'NM Property deals' };
                setUser(userData);
                localStorage.setItem('admin_user', JSON.stringify(userData));
                resolve(userData);
            } else {
                reject(new Error('Invalid credentials. Access Denied.'));
            }
        });
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('admin_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
