import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand fs-2 text-danger ms-4">Quiz App</a>
        <h1 className='fs-3 text-danger mx-4 mt-2'>Total question:10</h1>
    </nav>
  );
};

export default Header;
