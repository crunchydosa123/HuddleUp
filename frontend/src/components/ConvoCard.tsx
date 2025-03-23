import React from 'react'

type Props = {}

const ConvoCard = (props: Props) => {
  return (
    <div className='p-1 flex justify-left my-1'>
        <div className='w-8 h-8 rounded-full bg-white mt-1'></div>
        <div className='pl-2 flex flex-col'>
            <div className='text-sm'>Person 1</div>
            <div className='text-sm'>Message Preview</div>
        </div>
    </div>
  )
}

export default ConvoCard