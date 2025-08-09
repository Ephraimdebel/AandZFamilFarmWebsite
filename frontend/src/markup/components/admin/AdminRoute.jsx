import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import NotFoundPage from "../../pages/NotFoundPage";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;


  return user?.role === 'admin' ? children : <NotFoundPage />;
};

export default AdminRoute;
