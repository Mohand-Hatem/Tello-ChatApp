import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function AuthRedirect({ children }) {
  const { authUser } = useAuthStore();

  return authUser ? <Navigate to={"/chat"} /> : children;
}

export default AuthRedirect;
