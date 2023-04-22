import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer
      autoClose={2000}
      hideProgressBar
      position="top-center"
      theme="colored"
      transition={Zoom}
    />
  );
};

export default Toast;
