import React from 'react'

const HuddleCard = () => {
  return (
    <button className='my-1 w-full bg-orange-300 rounded-md p-2 flex flex-col justify-center'>
            <div className='w-full flex justify-between'>
                <div className='text-xl font-bold'>Group 1</div>
                <div>7:23 PM</div>
            </div>
            <div className='text-sm text-left'>You: awedd</div>
        </button>
  )
}

export default HuddleCard