import React, { useState} from "react";
import { useNavigate ,Link} from "react-router-dom";
import {FiEye,FiEyeOff} from 'react-icons/fi';
import SetupAxiosInstances from "../Instances/SetupAxiosInstances";

function Signup() {
  let [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    userName:'',
    email:'',
    password:'',
    phone:'',
  });
 
  let [passwordVisible,setPasswordVisible] = useState(false);
  const togglePassword =()=>{
    setPasswordVisible(!passwordVisible);
  }

  const handleChange = (e) => {
    let {name,value} = e.target;
    setFormData({ ...formData, [name]:value });
  };
  const navigate = useNavigate();
  const axiosInstances = SetupAxiosInstances(navigate);

  async function handleSubmit(e) {
    e.preventDefault();
   try {
    const res = await axiosInstances.post("/signup", formData);
    if(res.status == '201'){
      navigate('/login');
      alert("user successfully registered");
    }else if(res.data == 'empty field'){
      alert("please fill all required field correctly.");
    }else if(res.data == 'username exist'){
      alert("username not available");
    }else if(res.data == 'email exist'){
      alert("This email address is already registered.");
    }
  } catch (error) {
      console.error("Error in signup fetch data:", error);
  }
  }

  return (
    <div className='flex min-h-screen bg-cover items-center justify-around' style={{backgroundImage:'url(/Assets/landing.avif)'}}>
      <div className='flex flex-col items-center justify-center'>
        <p className='font-bold text-3xl mb-2'>Hello!</p>
       <p className='font-semibold text-2xl mb-2 text-white'>Do you have a account ?</p>
       <Link to={'/login'} className='mt-2'><button className='bg-blue-500 text-white rounded-md w-72 py-2 px-4 hover:bg-blue-700 font-medium'>Sign in</button></Link>
      </div>
<div className="flex justify-center bg-white p-4 rounded-lg relative w-96">
      <form onSubmit={handleSubmit}>
        <div className="mt-4 text-lg">
          <h2 className="text-xl mb-4 font-bold absolute right-12">FriendsBook</h2>
          <h2 className='text-md font-semibold'>Create an account</h2>
          <h2 className='text-sm font-medium mb-2 text-gray-500'>Sign up to Continue</h2>
          <div className="grid gap-4 grid-cols-10">
            <div className="col-span-3">
            <label htmlFor="first" className="font-medium">Firstname</label>
            </div>
            <div className="col-span-7">
            <input  type="text"  name="firstName"  placeholder="First Name"  onChange={handleChange} id='first'  className="rounded-md border-gray-400 border px-2 py-1 mb-2" required/>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-10">
            <div className="col-span-4">
            <label htmlFor="last" className="font-medium">Lastname</label>
            </div>
            <div className="col-span-6">
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} id='last' className="rounded-md border-gray-400 border py-2 px-1 mb-2"/>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-10">
            <div className="col-span-4">
            <label htmlFor="user" className="font-medium">Username</label>
            </div>
            <div className="col-span-6">
            <input type="text" name="userName" placeholder="User Name" onChange={handleChange} id='user' className="rounded-md border-gray-400 border py-2 px-1 mb-2" required/>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-10">
            <div className="col-span-4">
            <label htmlFor="email" className="font-medium">Email</label>
            </div>
            <div className="col-span-6">
            <input type="email" name="email" id='email' placeholder="Email" onChange={handleChange} className="rounded-md border-gray-400 border py-2 px-1 mb-2" required/>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-10">
            <div className="col-span-4">
            <label htmlFor="pass" className="font-medium">Password</label>
            </div>
            <div className="col-span-6">
            <div className='relative'>
          <input type={passwordVisible ? 'text':'password'} name="password" placeholder="Password" onChange={handleChange} id='pass' className="rounded-md border-gray-400 border mb-2 py-2 px-1" required/>
          <button type='button' className='absolute mb-2 right-0 rounded-md p-2 inset-y-0 bg-gray-500' onClick={togglePassword}>{passwordVisible ? <FiEye/> :<FiEyeOff/>}</button>
          </div>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-10">
            <div className="col-span-4">
            <label htmlFor="phone" className="font-medium">Mobile</label>
            </div>
            <div className="col-span-6">
            <input type="tel" name="phone" id='phone' placeholder="Phone Number" onChange={handleChange} className="rounded-md border-gray-400 border py-2 px-1 mb-2" required/>
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-700 mb-4 mt-4"> Register </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Signup;
