import React, { useState } from 'react'
import {PostelSearch} from './PostelSearch'
import {Profile} from './Profile'
import './afterLogin.css'
export const AfterLogin = (props) => {
  const [menuItem,setMenuItem]=useState(1);
  
  const fnMenuClick=(opt)=>{
    setMenuItem(opt)
  }
  return (
    <div>
      <ul className='menu'>
        <li onClick={()=>fnMenuClick(1)}>Search</li>
        <li onClick={()=>fnMenuClick(2)}>Profile</li>
        <li id='logout' onClick={()=>props.fnLogout()}>Logout</li>
      </ul>
      {menuItem == 1 && <PostelSearch />}
      {menuItem == 2 && <Profile />}
    </div>
  )
}
