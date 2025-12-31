import { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import ProtectedChat from "./components/ProtectedChat";
import { Loader } from "lucide-react";
import AuthRedirect from "./components/AuthRedirect";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthRedirect>
          <SignUpPage />
        </AuthRedirect>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthRedirect>
          <SignUpPage />
        </AuthRedirect>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthRedirect>
          <LoginPage />
        </AuthRedirect>
      ),
    },
    {
      path: "/chat",
      element: (
        <ProtectedChat>
          <ChatPage />
        </ProtectedChat>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <>
      <div className="min-h-screen bg-slate-900 relative flex items-center justify-center md:p-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px]" />
        <div className="absolute  top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
        <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
        <RouterProvider router={routes}></RouterProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            duration: 3000,
          }}
        />
      </div>
    </>
  );
}

export default App;
