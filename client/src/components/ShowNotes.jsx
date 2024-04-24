import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { GrView, GrUpdate } from 'react-icons/gr';
import { FaArrowCircleDown } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const ShowNotes = () => {
  const token = useSelector(state => state.token.token);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/getnotes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res)
        setData(res.data.notes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const handleNoteUpdate = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/getNotesId?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedNote = res.data.post;
      setData(prevData => prevData.map(note => (note._id === id ? updatedNote : note)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deletenote?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(prevData => prevData.filter(note => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 ml-5">
      {data.map((note) => (
        <div key={note._id} className="relative">
          <div className="bg-gray-700 rounded-xl text-white h-36 hover:bg-gray-600 cursor-pointer overflow-hidden">
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
