import React from 'react'

type Props = {
    sender: Boolean
}

const MessageCloud = (props: Props) => {
  const mainClass = `justify-${props.sender ? 'end' : 'start'}`;
  return (
    <div className={`p-1 flex ${mainClass} my-1`}>

        {
          props.sender ? 
          <>
            <div className='pr-2 flex flex-col justify-center'>
              <div className='text-sm bg-blue-400 text-black font-bold p-2 rounded-l rounded-bl'>Message Preview</div>
            </div> 
            <div className='w-8 h-8 rounded-full bg-white mt-1'></div>
          </>
          :
          <>
            <div className='w-8 h-8 rounded-full bg-white mt-1'></div>
            <div className='pl-2 flex flex-col justify-center'>
              <div className='text-sm bg-blue-400 text-black font-bold p-2 rounded-r rounded-bl'>Message Preview</div>
            </div> 
          </>
        }
        
    </div>
  )
}

export default MessageCloud