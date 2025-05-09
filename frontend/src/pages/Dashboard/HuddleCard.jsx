// HuddleCard.jsx
import React from 'react';

const HuddleCard = ({ groupId, setGroupId, groupName, isActive, setGroup }) => {
  return (
    <button
      onClick={() => {
        setGroup(groupName);
        setGroupId(groupId);
      }}
      className={`my-1 cursor-pointer rounded-md p-2 mx-2 flex flex-col justify-center ${
        isActive ? 'bg-blue-600 text-white' : 'bg-[#292b31] text-white'
      }`}
    >
      <div className='w-full flex justify-start'>
        <div className='text-sm font-bold'>{groupName}</div>
      </div>
    </button>
  );
};

export default HuddleCard;
