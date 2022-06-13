import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios'

export const Profile = (props) => {
  const [data,setData]=useState({uid:'',pwd:'',email:''})

  const fnChange=(eve)=>{
    const {id,value}=eve.target;
    setData({
      ...data,
      [id]:value
    })
  }

  useEffect(()=>{
    let user= sessionStorage.userInfo;
    if(user){
      user=JSON.parse(user);
      setData(user);
    }
  },[])
  const fnUpdate=async ()=>{
    const res=await axios.put('http://localhost:2020/users/update',data)
    const result=res.data;
    if(result.acknowledged && result.modifiedCount ==1){
      alert('profile udpated');
      sessionStorage.userInfo=JSON.stringify(data)
    }else{
      alert('Profile Not updated, try again')
    }
  }
  const fnDelete=()=>{
    let bool=window.confirm('R U Sure...')
    if(bool){
    axios.delete(`http://localhost:2020/users/delete?uid=${data.uid}`)
    .then((res)=>{
      var result=res.data
      if(result.acknowledged && result.deletedCount==1){
        alert('Your account terminated')
        document.getElementById('logout').click();
      }else{
        alert('error occured,try again')
      }
    })
    .catch(()=>{
        alert('Something went wrong');
    })
  }
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center mb-3 mt-3'>My Profile</h1>
      <div className='row mb-3'>
          <div className='col-sm-5 text-end'>
            <b className='lbl-txt'>User Id:</b>
          </div>
          <div className='col-sm-3'>
             <TextField disabled onChange={fnChange} value={data.uid} id="uid" label="User Id" variant="standard" />
          </div>
      </div>
      <div className='row mb-3'>
          <div className='col-sm-5 text-end'>
            <b className='lbl-txt'>Password:</b>
          </div>
          <div className='col-sm-3'>
             <TextField onChange={fnChange} value={data.pwd} id="pwd"  label="Password" variant="standard" />
          </div>
      </div>
      <div className='row mb-3'>
          <div className='col-sm-5 text-end'>
            <b className='lbl-txt'>Email:</b>
          </div>
          <div className='col-sm-3'>
             <TextField onChange={fnChange} value={data.email} id="email"  label="Email" variant="standard" />
          </div>
      </div>
      <div className='row mb-3'>
          <div className='offset-sm-5 col-sm-7'>
              <button onClick={fnUpdate} className='btn btn-primary'>Update</button>
              <button onClick={fnDelete} className='ms-2 btn btn-primary'>Delete</button>
          </div>
      </div>
    </div>
  )
}
