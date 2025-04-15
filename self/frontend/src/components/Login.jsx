import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Login = () => {
  // const [email,setEmail]=useState()
  // const [password,setPassword]=useState()
  
  const [loginInfo,setLoginInfo] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate()

  const handleChange = (e) =>{
    const {name,value}=e.target;
    console.log(name,value);
    const copyLoginInfo={...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
    
  }


  // const handleSubmit = (e) =>{
  //   e.preventDefault()
  //   axios.post('http://localhost:5000/auth/login',{email,password})
  //   .then(result=>{console.log(result)
  //       if(result.data.message==="Login successful"){
  //           navigate('/home')
  //       }
        
  //   })
  //   .catch(err=>console.log(err)
  //   )
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email,password}=loginInfo;
    if(!email || !password) {
      return toast.error("email and password are required")
    }

    try {
      const url = "https://signupform-9ocr.onrender.com/auth/login";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const {success,message,jwtToken,name,error}=result;
      if(success){
        toast.success(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        navigate('/home')
      }
      else if(error){
        const details=error?.details[0].message;
        toast.error(details);
      }
      else if(!success){
        toast.error(message);
      }
      console.log(result);
      
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
           // onChange={(e)=>setEmail(e.target.value)}
           onChange={handleChange}
           value={loginInfo.email}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={loginInfo.password}
            //onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
