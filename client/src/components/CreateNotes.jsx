import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast as toastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux"


const CreateNotes = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [chapter, setChapter] = useState('');
 
  const token = useSelector(state => state.token.token);
  
  const diffToast=()=>{
    toastify.success("Note saved successfull")
  }

  const loadNotes = async () => {
    const res = await axios.post('http://localhost:3000/api/createnotes', { subject, description, chapter },
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log(res.data);
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
        console.log("not saved")
      });
    } else {
      toast.error("failed to save");
    }
  }

  useEffect(()=>{
    const hanldeSubscribed=async()=>{
zzzz
    }
  })

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-lg p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a Note</h2>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">
            Chapter
          </label>
          <input
            type="text"
            id="chapter"
            className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 block w-full h-32 px-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
            onClick={loadNotes}
          >
            Save Note
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
    
  );
};

export default CreateNotes;
