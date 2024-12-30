/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "./src/lib/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Show a loader while checking auth status

    // Redirect to admin-login if no user is authenticated
    return user ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
