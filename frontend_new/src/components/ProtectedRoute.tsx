import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: "student" | "warden";
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userType = localStorage.getItem("userType") as "student" | "warden";

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (requiredUserType && userType !== requiredUserType) {
      // Redirect to appropriate dashboard if user type doesn't match
      navigate(userType === "student" ? "/student/dashboard" : "/warden/dashboard");
      return;
    }
  }, [navigate, requiredUserType]);

  return <>{children}</>;
}