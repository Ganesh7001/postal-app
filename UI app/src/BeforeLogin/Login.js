import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
export const Login = (props) => {
  const [data,setData]=useState({uid:'',pwd:''})
  const fnChange=(eve)=>{
     const {id,value}= eve.target;
     setData({
       ...data,
       [id]:value
     })
  }
  const fnLogin=()=>{
      axios.post('http://localhost:2020/users/login',data)
      .then((res)=>{
          if(res.data.length > 0){
             props.getLoginInfo(true)
             sessionStorage.isLogged=true;
             sessionStorage.userInfo=JSON.stringify(res.data[0])
          }else{
            alert('Please check entered uid or password');
            sessionStorage.clear()
            props.getLoginInfo(false)
          }
      })
      .catch((res)=>{
        alert('Something went wrong')
        props.getLoginInfo(false)
      })
  }
  return (
    <div className='container-fluid'>
      <h1 className='text-center mb-3 mt-3'>Login</h1>
      <div className='row mb-3'>
          <div className='col-sm-5 text-end'>
            <b className='lbl-txt'>User Id:</b>
          </div>
          <div className='col-sm-3'>
             <TextField id="uid" onChange={fnChange} label="User Id" variant="standard" />
          </div>
      </div>
      <div className='row mb-3'>
          <div className='col-sm-5 text-end'>
            <b className='lbl-txt'>Password:</b>
          </div>
          <div className='col-sm-3'>
             <TextField id="pwd"  onChange={fnChange} type="password" label="Password" variant="standard" />
          </div>
      </div>
      <div className='row mb-3'>
          <div className='offset-sm-5 col-sm-7'>
              <button onClick={fnLogin} className='btn btn-primary'>Login</button>
              <b onClick={()=>props.toggle(false)} className='ms-3 goto text-danger'>go To reigster </b>
          </div>
      </div>
    </div>
  )
}
