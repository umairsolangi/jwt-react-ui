import { useEffect,useState } from "react";
import API from "../services/api";

function Profile(){

 const [user,setUser]=useState(null);

 useEffect(()=>{

  const token = localStorage.getItem("token");

  API.get("/profile",{
   headers:{
    Authorization:`Bearer ${token}`
   }
  })
  .then(res=>{
   setUser(res.data);
  });

 },[]);

 return(

  <div className="container">

    <div className="profile-box">

      <h2 className="title">Profile</h2>

      {user && (
        <>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        </>
      )}

    </div>

  </div>

 );
}

export default Profile;