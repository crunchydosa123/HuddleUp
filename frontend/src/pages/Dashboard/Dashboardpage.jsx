import React from 'react';
import HuddleCard from './HuddleCard';
import UserCard from './UserCard';
import ChatMain from './ChatMain';

const Dashboardpage = () => {
  return (
    <div className="h-screen bg-gray-100">
      <div className="h-full grid grid-cols-7">

      {/*Sidebar */}
        <div className="h-full flex flex-col justify-between col-span-2 border bg-yellow-300 p-1">
        
        <div>
            <div className='text-2xl font-bold p-2'>Huddles</div> 
            <HuddleCard />
            <HuddleCard />
            <HuddleCard />
            <HuddleCard />
        </div>

        <UserCard />
        </div>

        {/*chat main */}
        <ChatMain />


      </div>
    </div>
  );
};

export default Dashboardpage;
