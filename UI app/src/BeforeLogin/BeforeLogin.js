import React,{useState} from 'react'
import {Login} from './Login';
import {Register} from './Register'
import './beforeLogin.css'

export const BeforeLogin = (props) => {
  const [isShowLogin,setIsShowLogin]=useState(true)
  const toggle=(data)=>{
     setIsShowLogin(data)
  }
  return (
    <div>
     {isShowLogin ? <Login toggle={toggle} getLoginInfo={props.getLoginInfo} />
     :
      <Register toggle={toggle} />
     }

    </div>
  )
}
