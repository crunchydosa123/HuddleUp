import React from 'react'

const UserCard = () => {
  return (
    <div className='flex justify-start gap-2 bg-gray-300 rounded-md m-1 p-2 items-center'>
        <div className='h-10 w-10 rounded-full flex justify-center items-center bg-white'>JD</div>
            <div className='flex flex-col'>
            <div>John Doe</div>
            <div className='text-xs'>jd@gmail.com</div>
        </div>
    </div>

  )
}

export default UserCard