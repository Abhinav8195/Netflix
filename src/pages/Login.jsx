import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { user, logIn } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(email, password);
      navigate('/')
    } catch (error) {
      console.log(error)
      setError(error.message)
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <div className='w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-full object-cover ' src="https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/537e2c5e-c750-4d4c-9f7a-e66fe93eb977/IN-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_b00eeb83-a7e8-4b5b-8ff7-86ed92c51caf_large.jpg" alt="/" />
        <div className=' bg-black/60 fixed top-0 left-0 h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className='text-3xl font-bold'>Sign In</h1>
              {/* {error ? <p className='p-3 bg-red-400 my-2'>{error}</p> : null} */}
              <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='Email' autoComplete='email' />
                <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' autoComplete='current-password' />
                <button className='bg-red-600 py-3 my-5 rounded font-bold'>Sign In</button>
                <div className='flex justify-between items-center text-sm text-gray-600'>
                  <p><input className='mr-2' type="checkbox" />Remember me</p>
                  <p>Need Help?</p>
                </div>
                <div className='justify-center text-center mt-3 font-semibold'>
                  <p className='text-gray-400'>Forget Password ? <Link to='/reset' className='text-white'>Reset Now</Link></p>
                </div>
                <p className='py-8 '><span className='text-gray-600'>New to Netflix ? </span> <Link to={'/signup'}> Sign Up</Link> </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
