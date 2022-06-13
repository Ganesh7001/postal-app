import logo from './logo.svg';
import './App.css';
import {BeforeLogin} from './BeforeLogin/BeforeLogin'
import {AfterLogin} from './AfterLogin/AfterLogin'
import {Header} from './common/Header';
import {Footer} from './common/Footer'
import React,{useEffect, useState} from 'react'
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  useEffect(()=>{
   let _isLoggedIn= sessionStorage.isLogged
   if(_isLoggedIn){
     setIsLoggedIn(_isLoggedIn)
   }
  },[])
  const getLoginInfo=(data)=>{
     setIsLoggedIn(data)
  }
  const fnLogout=()=>{
     sessionStorage.clear();
     setIsLoggedIn(false)
  }
  return (
    <div className="App">
      <Header />
     {isLoggedIn ? <AfterLogin fnLogout={fnLogout} />
     : <BeforeLogin getLoginInfo={getLoginInfo} />
     }
     <Footer />
    </div>
  );
}

export default App;
