import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import toast from 'react-hot-toast';
import { localhost } from "./local";


const Singup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[name,setName]=useState("");
 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${localhost}/api/singup`, { email, password,name}); 
      console.log(res)  
      toast.success("SingUp successful");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <img src="./images/note.jpg" alt="Note" className="w-20 h-16 rounded-lg" />
        </div>
        <div className="text-white text-center text-2xl mb-4">SingUp</div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            SingUp
          </button>
        </div>


        <div className="already-account text-white underline text-xl ">
          <Link to="/login">Already have account</Link>
        </div>
      </div>
    </div>
  );
};

export default Singup;
