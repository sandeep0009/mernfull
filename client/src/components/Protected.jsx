import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  const token = useSelector(state => state.token.token);
  return (
    <>
    {
      token?(
      <div><Component /></div>
      ):navigate('/login')
    }
    </>
  );
}

export default Protected;
