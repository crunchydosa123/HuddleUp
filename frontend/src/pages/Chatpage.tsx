import React from 'react'
import Sidebar from '../components/Sidebar'
import ConvoList from '../components/ConvoList'
import ConvoMain from '../components/ConvoMain'

type Props = {}

const Chatpage = (props: Props) => {
  return (
    <div className='flex flex-col w-full h-screen bg-black'>
        <div className='bg-[#111111] h-12  border-gray-500 rounded-md'>
            <div className='flex justify-between p-3'>
                <div className='text-white'>HuddleUp</div>
            </div>
        </div>

        <div className='grid grid-cols-12 gap-1 p-1 h-full'>
            <div className='col-span-2  bg-[#111111]'>
                <Sidebar />
            </div>
            <div className='col-span-3 bg-[#111111]'>
                <ConvoList />
            </div>

            <div className='col-span-7  bg-[#111111]'>
                <ConvoMain />
            </div>
            
        </div>

    </div>
  )
}

export default Chatpage