import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"

const Signup = () => {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()


    const handleSubmit = async (e) =>{
      e.preventDefault()//refersh hone se rokta h 
      try {
        const res = await axios.post('http://localhost:5000/auth/signup', { name, email, password });
        console.log(res);
        
        if(res.data.message==="Signup successful"){
          toast.success("Signup successful!");
          navigate("/home");
          //timeout is for showing the toast message 
          // setTimeout(()=>{
          //   navigate("/home");
          // },1000)
        } 
       
       
        else {
          toast.error(res.data.message || "Signup failed");
        }


      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
     
    }
    


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Signup;
