import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {authActions}from "../store/auth"
import {useDispatch, useSelector}from 'react-redux'


const Login = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch =useDispatch()
  const [data, setdata] = useState({username:"", password:""})
  const history = useNavigate()
  
    if(isLoggedIn === true){
      history("/")
    }
  

  const change =(e)=>{
    const {name, value}= e.target;
    setdata({...data,[name]:value});
  }
  const submit = async() =>{
    try {
      if(data.username ==="" || data.email ==="" || data.password===""){
        alert("all fields are requied !")
      }
      else{
        const response = await axios.post("http://localhost:8080/api/v1/log-in", data)
        // console.log(response)
        setdata({username:"", password:""})
        // console.log(response)
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        dispatch(authActions.login());
         history("/")

      }
      
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className='bg-gray-200 h-screen flex justify-center items-center'>
        <div className='p-4 w-2/6 rounded bg-gray-700'>
        <div className='text-white text-2xl font-bold items-center flex justify-center my-2'>LogIn</div>
        <input type="username" 
        placeholder='username'
        className='w-full p-2 rounded my-2'
        name='username'
        value={data.username}
        onChange={change}
        />
        <input type="password" 
        placeholder='password'
        className='w-full p-2 rounded my-2'
        name='password'
        value={data.password}
        onChange={change}
        />
    
        <div className='flex flex-col justify-between items-center my-3 gap-2'>
        <button className='bg-blue-500 text-xl rounded p-1 font-bold text-white w-2/6'onClick={submit}>LogIn</button>
        
        <p>Don't Have an Account</p>
        <Link to ={"/signup"} className='text-blue-400 '>SignUp here</Link>


        </div>
        
        </div>


    </div>
  )
}

export default Login