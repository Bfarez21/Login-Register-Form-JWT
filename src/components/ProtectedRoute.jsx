// components/ProtectedRoute.jsx

// Importa 'Navigate' de 'react-router-dom' para realizar redirecciones
import { Navigate } from "react-router-dom";
// Importa la función 'jwt_decode' para decodificar tokens JWT
import { jwtDecode } from "jwt-decode";


// Componente que protege rutas, permitiendo solo acceso a usuarios con token válido
export default function ProtectedRoute({ children }) {
  // Obtiene el token JWT almacenado en el localStorage
  const token = localStorage.getItem("token");

  // Si no hay token, redirige a la página de login
  if (!token) return <Navigate to="/login" replace />;

  try {
    // Intenta decodificar el token para acceder a su contenido
    const decoded = jwtDecode(token);

    // Verifica si el token ha expirado (la fecha 'exp' viene en segundos, por eso se multiplica por 1000)
    if (decoded.exp * 1000 < Date.now()) {
      // Si el token ha expirado, elimina el token del almacenamiento local
      localStorage.removeItem("token");
      // Redirige a login porque el token no es válido
      return <Navigate to="/login" replace />;
    }

    // Si el token es válido y no expiró, permite acceder al contenido protegido
    return children;
  } catch {
    // En caso de error al decodificar (token inválido o corrupto), redirige a login
    return <Navigate to="/login" replace />;
  }
}