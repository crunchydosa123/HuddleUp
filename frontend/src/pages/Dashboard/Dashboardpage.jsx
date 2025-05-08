import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import MessageBubble from './MessageBubble';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

const Dashboardpage = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState(null);

  const {user} = useUser();
  if (!user || !user.Username) return <div className="text-white p-4">Loading...</div>;

  // Fetch user groups once
  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get(`https://elh3gi59kb.execute-api.ap-south-1.amazonaws.com/get_user_groups?UserID=${user.Username}`);
        const data = response.data;
        if (data.groups && data.groups.length > 0) {
          setUserGroups(data.groups);
          setSelectedGroup(data.groups[0].GroupName);
          setSelectedGroupId(data.groups[0].GroupID);
        }
      } catch (error) {
        console.error("Error fetching user groups:", error);
      }
    };

    fetchUserGroups();
  }, []);

  // Update group ID when selected group name changes
  useEffect(() => {
    const group = userGroups.find(group => group.GroupName === selectedGroup);
    if (group) {
      setSelectedGroupId(group.GroupID);
    }
  }, [selectedGroup, userGroups]);

  // Fetch messages and set up WebSocket when group changes
  useEffect(() => {
    if (!selectedGroupId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://elh3gi59kb.execute-api.ap-south-1.amazonaws.com/getMessages?groupId=${selectedGroupId}`
        );
        const data = response.data;
        console.log('Fetched messages:', data);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const socket = new WebSocket("wss://50i0qzrdk0.execute-api.ap-south-1.amazonaws.com/prod/");

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ action: "joinRoom", roomId: selectedGroupId }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // <- Properly parse JSON
        console.log("WebSocket message received:", data);
        // Assuming the incoming message has userId, message, and timestamp
        setMessages(prev => [
          ...prev,
          {
            senderId: data.message.userId,
            message: data.message.message,
            timestamp: data.message.timestamp
          }
        ]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        console.log("Received message:", event.data);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    setWs(socket);
    return () => socket.close();
  }, [selectedGroupId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;

    const payload = {
      action: "sendMessage",
      roomId: selectedGroupId,
      message: newMessage,
      UserID: user.Username,
    };
    console.log("Sending message:", payload);
    console.log("Messages:", messages);
    ws.send(JSON.stringify(payload));

    /*setMessages(prev => [
      ...prev,
      {
        senderId: user.Username,
        message: newMessage,
      },
    ]);*/

    setNewMessage("");
  };

  const addParticipant = async () => {
    if (!newParticipant.trim() || !selectedGroupId) return;
  
    try {
      await axios.post("https://elh3gi59kb.execute-api.ap-south-1.amazonaws.com/save_user_group", {
        UserID: newParticipant,
        GroupID: selectedGroupId
      });
  
      setParticipants(prev => [...prev, newParticipant]);
      setNewParticipant("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding participant:", error);
      alert("Failed to add participant. Please check the UserID and try again.");
    }
  };

  return (
    <div className="flex h-screen bg-[#202226] p-2">
      <Sidebar
        setSelectedGroupId={setSelectedGroupId}
        group={selectedGroup}
        setGroup={setSelectedGroup}
        userGroups={userGroups}
      />

      <div className="w-3/4 h-full px-2 flex flex-col">
        <div className="h-full border-gray-600 rounded-md flex flex-col">

          {/* Group Title */}
          <div className="flex justify-between items-center border-b border-gray-600">
            <div className="flex flex-col px-4 py-2 text-white">
              <div className="text-xl">{selectedGroup}</div>
              <div className="text-xs">
                {participants.length ? participants.join(", ") : "No participants yet"}
              </div>
            </div>
            <div className="p-4 flex items-center">
              {user.Role !== "Student" && (
                
              <button
                onClick={() => setIsModalOpen(true)}
                className="ml-2 p-2 bg-green-600 text-white text-xs rounded-md"
              >
                Add Participants
              </button>)}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-auto text-white space-y-3">
            <div className="messages flex flex-col space-y-3">
              {messages.map((msg, index) => (
                <MessageBubble
                key={index}
                sender={msg.senderId === user.Username ? "You" : msg.senderId || "Unknown"}
                text={msg.message}
                isOwnMessage={msg.senderId === user.Username}
              />
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-600 flex items-center">
            <input
              type="text"
              className="w-full h-10 rounded-md p-2 bg-[#292b31] text-white"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="ml-2 p-2 bg-blue-600 text-white rounded-md"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-4 rounded-md w-1/3">
            <h2 className="text-xl mb-4">Add Participant</h2>
            <input
              type="text"
              className="w-full h-10 rounded-md p-2 border mb-4"
              placeholder="Enter participant's name"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
            />
            <button
              onClick={addParticipant}
              className="p-2 bg-blue-600 text-white rounded-md w-full"
            >
              Add
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 bg-gray-400 text-white rounded-md w-full mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboardpage;
