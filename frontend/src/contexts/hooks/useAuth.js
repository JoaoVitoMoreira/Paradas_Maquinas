import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verifica se o usuário está logado no backend
  const checkUserLogged = async () => {
    try {
      const response = await fetch("http://localhost:4000/usuarios", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json(); // 👈 isso estava faltando

      console.log("Resposta do backend:", data); // 👈 pode deixar pra debug

      if (response.ok && data.usuario) {
        setUser({ nome: data.usuario.nome_usua });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Erro ao verificar login:", err);
      setUser(null);
    }
  };

  // Ao carregar a página, verifica se o usuário está logado
  useEffect(() => { 
    checkUserLogged();
  }, []);

  // Função de login
  const signin = async (nome, senha) => {
  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nome, senha }),
    });

    const data = await response.json();
    console.log("🔐 Login response:", response.status, data);

    if (!response.ok) {
      return data.message || "Erro ao fazer login";
    }

    await checkUserLogged();

    return null;
  } catch (error) {
    console.error("Erro ao se conectar com o servidor:", error);
    return "Erro ao se conectar com o servidor";
  }
};

  // Função de logout
  const signout = async () => {
    try {
      await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
