import React from 'react';
import './App.css';
import Base from './components/base/base'
import Bill from './components/logic/logic'
import Poper from './components/poper/poper'
import Footer from './components/footer/footer'



function App()   {
  return (
  <>
    <Poper/>
    <Base>
    <Bill/>
    </Base>
    <Footer/>

  </>

  );
}

export default App;
