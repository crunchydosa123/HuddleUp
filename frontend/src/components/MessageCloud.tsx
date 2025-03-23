import React from 'react'

type Props = {
    sender: Boolean
}

const MessageCloud = (props: Props) => {
  return (
    <div className='p-1 flex justify-left my-1'>
        <div className='w-8 h-8 rounded-full bg-white mt-1'></div>
        <div className='pl-2 flex flex-col justify-center'>
            <div className='text-sm bg-blue-400 text-black font-bold p-2 rounded-r rounded-bl'>Message Preview</div>
        </div>
    </div>
  )
}

export default MessageCloud