import React from 'react';

const MessageBubble = ({ sender, text, isOwnMessage }) => {
  return (
    <div
      className={`p-3 rounded-md max-w-xs ${
        isOwnMessage ? 'bg-blue-600 text-white ml-auto' : 'bg-[#2f3136] text-white'
      }`}
    >
      <div className="text-sm font-semibold">
        {isOwnMessage ? 'You' : sender}
      </div>
      <div className="text-sm">{text}</div>
    </div>
  );
};

export default MessageBubble;
