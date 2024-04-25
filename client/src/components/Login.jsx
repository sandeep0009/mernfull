import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { globalLogin } from "../features/loginSlice.js";
import { ToastContainer, toast as toastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localhost } from "./local.js";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const diffToast=()=>{
    toastify.success("login successfull")
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${localhost}/api/login`, { email, password });
      const tokens = localStorage.setItem('token', res.data.token);
      dispatch(globalLogin({ token: res.data.token }));

  
      if (res.status === 201) {
        diffToast();
        toast.promise(
          new Promise(resolve => setTimeout(resolve, 1000)),
          {
            loading: 'Logging in...',
            success: 'Login successful!',
            error: 'Login failed!',
          }
        ).then(() => {
          navigate('/');
        });
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  }
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <img src="./images/note.jpg" alt="Note" className="w-20 h-20 rounded-full" />
        </div>
        <div className="text-white text-center text-2xl mb-4">Login</div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="bg-blue-500 w-full hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400" onClick={handleLogin}>
            Login
          </button>
        </div>


        <div className="forget-password text-white underline text-xl ">
          <Link to="/forgot-password">Forget Password</Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
