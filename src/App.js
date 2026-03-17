import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ResetPassword from "./pages/ResetPassword"; // ✅ Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* ✅ Add the reset-password route */}
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Make login the default fallback if you'd like */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;