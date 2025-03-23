import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Homepage = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col w-full h-screen h-full'>
      <div className='w-1/2 h-screen'>
      <div className='navbar p-3 bg-white items-center text-black flex justify-between'>
        <div className='font-bold'>HuddleUp</div>
        <div className='flex justify-center gap-4 text-gray-500'>
          <button onClick={()=> navigate('/login')}>Login</button>
          <button onClick={()=> navigate('/signup')}>Signup</button>
        </div>
      </div>


      <div className='hero p-5 mt-10 flex flex-col justify-center'>
        <div className='text-5xl'>Get together with the people you know</div>
        <div className='mt-5'>Use HuddleUp to discover and connect with friends and family!</div>
        <div className='w-full flex justify-start  gap-2 mt-2'>
          <button className='bg-black w-1/4 text-center text-white p-2 rounded-sm'>Get Started</button>
          <button className='bg-white w-1/4 border border-black text-black p-2 rounded-sm'>See features</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Homepage