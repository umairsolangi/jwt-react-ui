import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Grab the success message passed from Register or ResetPassword
  const message = location.state?.message;

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/login", form);

      localStorage.setItem("token", res.data.token);
      navigate("/profile");

    } catch (err) {
      // Check for our custom 403 error (needs password reset)
      if (err.response && err.response.status === 403) {
        setError(err.response.data.error);
      } 
      // Check for standard 401 invalid credentials
      else if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } 
      // Fallback error
      else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Login</h2>
        
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn">Login</button>
        </form>

        <div className="link">
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;