import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login(){

 const navigate = useNavigate();

 const [form,setForm]=useState({
  email:"",
  password:""
 });

 const handleSubmit = async(e)=>{
  e.preventDefault();

  const res = await API.post("/login",form);

  localStorage.setItem("token",res.data.token);

  navigate("/profile");
 };

 return(

  <div className="container">

    <div className="card">

      <h2 className="title">Login</h2>

      <form onSubmit={handleSubmit}>

        <input
        className="input"
        placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
        type="password"
        className="input"
        placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button className="btn">Login</button>

      </form>

      <div className="link">
        <p>Don't have account? <Link to='/register'>Register</Link> </p>
      </div>

    </div>

  </div>

 );
}

export default Login;