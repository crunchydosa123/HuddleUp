import React, { useState } from 'react';
import HuddleCard from '../pages/Dashboard/HuddleCard';
import UserCard from '../pages/Dashboard/UserCard';
import CreateHuddleModal from './CreateHuddleModal';
import { useUser } from '../contexts/UserContext'; // adjust path
 // assuming same folder
// import { useUserContext } from '../context/UserContext'; // Placeholder for later

const Sidebar = ({ group, setSelectedGroupId, setGroup, userGroups }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { userId } = useUserContext(); // Placeholder
  const userId = ''; // Temporary placeholder
  const { user } = useUser();

  const handleCreateHuddle = async (huddleName) => {
    const payload = {
      GroupName: huddleName,
      OwnerID: user.Username,
      Participants: [],
    };

    try {
      const res = await fetch('https://wa7h20ee7d.execute-api.ap-south-1.amazonaws.com/prod/create_group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Success — ideally refresh groups or show a toast
        console.log('Huddle created successfully');
        setIsModalOpen(false);
      } else {
        console.error('Failed to create huddle');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="h-full w-1/4 bg-[#24252b] border border-gray-600 rounded-md flex flex-col justify-between">
      <div className='flex flex-col justify-start'>
        <div className='border-b border-gray-600 text-white font-bold p-4 text-xl mb-1'>HuddleUp</div>

        <div className="flex flex-col justify-start">
          <div className="flex justify-between w-full">
            <div className='text-sm text-gray-400 p-2'>Huddles</div>
            {user.Role !== 'Student' && (
              <button
              onClick={() => setIsModalOpen(true)}
              className='text-sm bg-green-500 p-1 mx-2 rounded-md'
            >
              + Create Huddle
            </button>
            )}
            
          </div>

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

      {isModalOpen && (
        <CreateHuddleModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateHuddle}
        />
      )}
    </div>
  );
};

export default Sidebar;
