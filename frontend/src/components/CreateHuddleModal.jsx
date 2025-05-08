import React, { useState } from 'react';

const CreateHuddleModal = ({ onClose, onCreate }) => {
  const [huddleName, setHuddleName] = useState('');

  const handleCreate = () => {
    onCreate(huddleName);
    setHuddleName('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Create New Huddle</h2>
        <input
          type="text"
          value={huddleName}
          onChange={(e) => setHuddleName(e.target.value)}
          placeholder="Huddle Name"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">Close</button>
          <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded-md">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateHuddleModal;
