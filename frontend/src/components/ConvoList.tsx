import React from 'react'
import ConvoCard from './ConvoCard'

type Props = {}

const ConvoList = (props: Props) => {
  return (
    <div className='p-3 text-white flex flex-col'>
        <div className='text-xl font-bold mb-3'>Messages</div>

        <ConvoCard />
        <ConvoCard />
        <ConvoCard />
    </div>
  )
}

export default ConvoList