import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {
  Login,
  Dashboard,
  StudyGroup,
  CreateGroup,
  Register,
  Tasks,
  Resources,
  Schedule,
  Partners,
  StudyRooms,
} from "./pages";
import Layout from "./components/Layout";
import GroupDetails from "./pages/StudyGroup/GroupDetails";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
function App() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Study Groups */}
          <Route path="/study-groups" element={<StudyGroup />} />
          <Route path="/study-groups/:id" element={<GroupDetails />} />
          <Route path="/create-study-group" element={<CreateGroup />} />
          <Route path="/study-rooms" element={<StudyRooms />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
