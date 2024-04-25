import React, { useEffect ,useState} from 'react';
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { localhost } from './local';

const DashBoard = () => {
  const token=useSelector(state=>state.token.token);
  const[name,setName]=useState("")
  
  const navigate=useNavigate();


  useEffect(()=>{
    try{
      const handleLogin=async()=>{

        const res = await axios.get(`{localhost}/api/userDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data.userDetails.name)
        setName(res.data.userDetails.name)


      }

      handleLogin()
    }
    catch(error){
      console.log(error)
    }
  },[token])
  const handleClick=()=>{
    navigate('/signup')
  }

  const handleClickToken=()=>{
    navigate('/createNotes')
  }
  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="flex justify-center items-center">
          <img src="./images/navbar.png" className="w-80 h-96 mt-10" alt="" />
        </div>
        <div className="flex  flex-col m-auto justify-start ml-0 text-left text-white">
          {
            token==null?
            <>
            
            
            <h2 className="text-white text-3xl px-5 text-center">Welcome to E-Notes</h2>
            <p className='text-xl mt-5'>let's start the journey of writing your notes in flexible way</p>
  
             <button className=" rounded-full mt-5 bg-gray-900 text-large h-14 w-full focus:outline-none focus:ring-2 focus: focus:ring-offset-2 focus:ring-offset-gray-800" onClick={handleClick}>Create Account</button>
            </>
            :
            <>

                        
<h2 className="text-white text-3xl px-5 text-center">Welcome to E-Notes {name.toUpperCase()}</h2>
            <p className='text-xl mt-5'>let's start the journey of writing your notes in flexible way</p>
  
             <button className=" rounded-full mt-5 bg-gray-900 text-large h-14 w-full focus:outline-none focus:ring-2 focus: focus:ring-offset-2 focus:ring-offset-gray-800" onClick={handleClickToken}>Create Notes</button>

            
            
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
