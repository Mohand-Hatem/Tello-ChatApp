import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

function ProtectedChat({ children }) {
  const { authUser } = useAuthStore();

  return authUser ? children : <Navigate to={"/login"} />;
}

export default ProtectedChat;
