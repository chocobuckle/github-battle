import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='home-container'>
      <h1>Github Battle: Battle your friends... I suppose!</h1>
      <Link className='button' to='/battle'>Fine, I{"'"}ll give it a go.</Link>
    </div>
  );
}
