// import React from 'react';
import {Link} from '@tanstack/react-router';

const Header = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
};

export default Header;
