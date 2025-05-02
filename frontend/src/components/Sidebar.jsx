// Sidebar.jsx
import React from 'react';
import HuddleCard from '../pages/Dashboard/HuddleCard';
import UserCard from '../pages/Dashboard/UserCard';

const Sidebar = ({ group, setSelectedGroupId, setGroup, userGroups }) => {
  //const groupNames = ['Group 1', 'Group 2', 'Group 3'];

  return (
    <div className="h-full w-1/4 bg-[#24252b] border border-gray-600 rounded-md flex flex-col justify-between">
      <div className='flex flex-col justify-start'>
        <div className='border-b border-gray-600 text-white font-bold p-4 text-xl mb-1'>HuddleUp</div>

        <div className="flex flex-col justify-start">
          <div className='text-sm text-gray-400 p-2'>Huddles</div>
          {userGroups.map((g) => (
            <HuddleCard
              key={g.GroupID}
              groupId={g.GroupID}
              setGroupId={setSelectedGroupId}
              groupName={g.GroupName}
              isActive={group === g.GroupName}
              setGroup={setGroup}
            />
          ))}
        </div>
      </div>
      <UserCard />
    </div>
  );
};

export default Sidebar;
