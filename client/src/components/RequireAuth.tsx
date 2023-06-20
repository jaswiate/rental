import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { user } = useContext(AuthContext);
    return user?.role === "admin" ? children : <Navigate to="/" replace />;
};
