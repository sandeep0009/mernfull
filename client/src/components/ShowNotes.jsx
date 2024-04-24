import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

import { GrView, GrUpdate } from "react-icons/gr";
import { FaArrowCircleDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ShowNotes = () => {
  const token = useSelector(state => state.token.token);
  const [data, setData] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false); 
  const [showUpdateModal, setShowUpdateModal] = useState(false); 
  useEffect(() => {
    const handleShowNotes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/getnotes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.notes);
      } catch (error) {
        console.log(error);
      }
    };

    handleShowNotes();
  }, [token]);

  const handleNoteById = async (id) => {
    try {
      console.log('Clicked note ID:', id);
      const res = await axios.get(`http://localhost:3000/api/getNotesId?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.post);
      setSelectedNote(res.data.post); 
      setShowViewModal(true); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false); 
  };

  const handleNoteUpdate = async (id) => {
    try {
      console.log('Clicked note ID:', id);
      const res = await axios.get(`http://localhost:3000/api/getNotesId?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)
      setSelectedNote(res.data); 
      setShowUpdateModal(true); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false); 
  };

  const handleNoteDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deletenote?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("Note deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteDownload=async(id)=>{
    try{
      const res=await axios.get(`http://localhost:3000/api/downloadPdfCopy?id=${id}`,{
        headers:{
          Authorization: `Bearer ${token}`,

        },
        responseType:'blob',
      })
      const blobUrl=window.URL.createObjectURL(new Blob([res.data]));
      const downloadLink=document.createElement('a');
      downloadLink.href=blobUrl;
      downloadLink.download='note.pdf',
      document.body.appendChild(downloadLink);

      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl)

    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 ml-5">
      {showViewModal && selectedNote && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h1 className="text-xl font-bold mb-4">View Note</h1>
            <p>Subject: {selectedNote.subject}</p>
            <p>Chapter: {selectedNote.chapter}</p>
            <p>Description: {selectedNote.description}</p>
            <button onClick={handleCloseViewModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mt-4">Close</button>
          </div>
        </div>
      )}
      {showUpdateModal && selectedNote && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h1 className="text-xl font-bold mb-4">Update Note</h1>
            <input type="text" value={selectedNote.subject} onChange={(e) => setSelectedNote({ ...selectedNote, subject: e.target.value })} className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md mb-2 w-full" />
            <textarea value={selectedNote.description} onChange={(e) => setSelectedNote({ ...selectedNote, description: e.target.value })} className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md mb-2 w-full" />
            <div className="flex justify-end">
              <button onClick={handleCloseUpdateModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2">Cancel</button>
              <button onClick={() => handleNoteUpdate(selectedNote._id)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Update</button>
            </div>
          </div>
        </div>
      )}
      {data.map((note) => (
        <div key={note._id} className="relative">
          <div className="bg-gray-700 rounded-xl text-white h-36 hover:bg-gray-600 cursor-pointer overflow-hidden" >
            <div className="p-4">
              <h1 className="text-xl font-bold mb-2">Subject: {note.subject}</h1>
              <p className="mb-4">Chapter: {note.chapter}</p>
              <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">Description: {note.description}</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 flex flex-col space-y-2 mt-2 mr-2 text-white h-64 cursor-pointer">
            <GrView onClick={() => handleNoteById(note._id)} />
            <GrUpdate onClick={() => handleNoteUpdate(note._id)} />
            <FaArrowCircleDown onClick={() => handleNoteDownload(note._id)} />
            <MdDelete onClick={() => handleNoteDelete(note._id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowNotes;
