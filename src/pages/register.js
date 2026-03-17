import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/register", form);

      navigate("/login", {
        state: { message: "Registration successful! Please check your email to set a new password before logging in." }
      });

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Register</h2>
        
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

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
            placeholder="Temporary Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;