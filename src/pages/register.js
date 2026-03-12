import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register(){

 const navigate = useNavigate();

 const [form,setForm]=useState({
  name:"",
  email:"",
  password:""
 });

 const handleSubmit = async(e)=>{
  e.preventDefault();

  await API.post("/register",form);

  alert("Registered Successfully");

  navigate("/");
 };

 return(

  <div className="container">

    <div className="card">

      <h2 className="title">Register</h2>

      <form onSubmit={handleSubmit}>

        <input
        className="input"
        placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}
        />

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

        <button className="btn">Register</button>

      </form>

    </div>

  </div>

 );
}

export default Register;