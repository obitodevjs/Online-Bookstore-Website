import React from 'react';
import LogoBook from '../assest/LogoWeb.png'

const Logo = ({ w, h }) => {
  return <img src={LogoBook} width={w} height={h} alt="Logo" />;
};

export default Logo;
