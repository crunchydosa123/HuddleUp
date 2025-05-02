import React from 'react';
import { useUser } from '../../contexts/UserContext'; // adjust path
import { useNavigate } from 'react-router-dom';


const UserCard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate(); // useNavigate hook from react-router-dom
  
  const handleLogout = ()=> {
    logout();
    navigate("/");
  }

  if (!user) return <div>No user found</div>;

  const initials = user.Username
    ? user.Username.slice(0, 2).toUpperCase()
    : 'AB';

  return (
    <div className='flex justify-between bg-yellow-200 rounded-md m-1 p-2 items-center'>
      <div className='flex items-center gap-2'>
        <div className='h-10 w-10 rounded-full flex justify-center items-center bg-white'>
          {initials}
        </div>
        <div className='flex flex-col'>
          <div>{user.Username}</div>
          <div className='text-xs'>{user.Email}</div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className='ml-4 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg'
      >
        Logout
      </button>
    </div>
  );
};

export default UserCard;
