import React from 'react'
import ChatMessageBox from './ChatMessageBox'
import MessageCloud from './MessageCloudSelf'

type Props = {}

const ConvoMain = (props: Props) => {
  return (
    <div className='flex flex-col h-full'>
        
        <div className='border-b border-gray-600 p-1'>
            <div className='p-1 flex justify-left my-1'>
                <div className='w-10 h-10 rounded-full bg-white mt-1'></div>
                <div className='pl-2 flex flex-col text-white'>
                    <div className='text-l'>Person 1</div>
                    <div className='text-l'>Message Preview</div>
                </div>
            </div>
        </div>


        <div className='flex flex-col justify-end h-full text-white'>
            <div className='px-3'>
            <MessageCloud  sender={true}/>
            <MessageCloud  sender={false}/>
            <MessageCloud  sender={false}/>
            <MessageCloud  sender={true}/>
            </div>
            <ChatMessageBox />

        </div>
    </div>
  )
}

export default ConvoMain