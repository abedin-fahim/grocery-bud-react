import React, { useEffect } from 'react';

const Alert = ({ type, message, removeAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
