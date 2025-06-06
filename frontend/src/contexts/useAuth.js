import { createContext, useContext, useState, useEffect } from "react";

const API_URL = 'http://localhost:4000';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkSession() {
            try {
                const refreshResponse = await fetch(`${API_URL}/refresh`, { 
                    method: 'POST',
                    credentials: 'include' 
                });

                if (refreshResponse.ok) {
                    const userResponse = await fetch(`${API_URL}/usuario-autenticado`, {
                        method: 'GET',
                        credentials: 'include'
                    });
                    const userData = await userResponse.json();
                    if (userData.usuario) {
                        setUser(userData.usuario);
                    }
                }
            } catch (error) {
                console.log("Nenhuma sessão ativa encontrada.");
            } finally {
                setLoading(false);
            }
        }
        
        checkSession();
    }, []);

    // --- FUNÇÃO DE LOGIN COMPLETA ---
    async function signin(nome, senha) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ nome, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                return data.message || "Erro desconhecido";
            }

            if (data.usuario) {
                setUser(data.usuario);
                return null; 
            }
            
        } catch (error) {
            console.error("Erro de conexão ao fazer login:", error);
            return "Não foi possível conectar ao servidor.";
        }
    }

    // --- FUNÇÃO DE LOGOUT COMPLETA ---
    async function signout() {
        try {
            await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        } finally {
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signin, signout }}>
            {/* Renderiza os componentes filhos apenas quando o carregamento inicial terminar */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);