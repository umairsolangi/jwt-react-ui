import { useState } from "react";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  // useSearchParams helps us grab the ?token=...&email=... from the URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [form, setForm] = useState({
    password: "",
    password_confirmation: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic frontend validation
    if (form.password !== form.password_confirmation) {
      return setError("Passwords do not match");
    }

    try {
      const res = await API.post("/reset-password", {
        email: email,
        token: token,
        password: form.password,
        password_confirmation: form.password_confirmation
      });

      setSuccess(res.data.message);
      
      // Redirect to login after a short delay so they can read the success message
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Password updated successfully. You can now log in." }
        });
      }, 2000);

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || err.response.data.message || "Something went wrong");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  // If someone navigates here without a token or email, show an error
  if (!token || !email) {
    return (
      <div className="container">
        <div className="card">
          <p className="error">Invalid or missing password reset link.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Set New Password</h2>
        <p>Please enter a new password for <strong>{email}</strong>.</p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="input"
            placeholder="New Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            type="password"
            className="input"
            placeholder="Confirm New Password"
            required
            onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
          />

          <button className="btn">Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;