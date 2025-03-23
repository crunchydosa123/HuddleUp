import React from 'react'

type Props = {}

const ChatMessageBox = (props: Props) => {
  return (
    <div className='flex justify-between w-full'>
    <input type='text' className='w-full m-3 bg-gray-900 p-2 rounded-md' placeholder='Send a message'></input>
    <button className='my-3 mx-1 py-1 px-2 h-10 rounded-md bg-red-400'>Send</button>
    </div>
  )
}

export default ChatMessageBox