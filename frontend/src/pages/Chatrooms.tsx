import React, { useEffect, useState } from "react";
import { fetchRooms, createRoom } from "../api";

type Room = {
    id: string;
    name: string;
  };
  
  type Props = {
    initialRooms?: Room[]; // Optional: Allows passing preloaded rooms
    onRoomCreated?: (room: Room) => void; // Optional: Callback when a room is created
  };

const Chatrooms = ({ initialRooms = [], onRoomCreated }: Props) => {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    async function loadRooms() {
      const data = await fetchRooms();
      setRooms(data);
    }
    loadRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (roomName.trim() === "") return;
    const newRoom = await createRoom(roomName);
    if (newRoom) {
      setRooms([...rooms, newRoom]); // Update UI
      setRoomName("");
      onRoomCreated?.(newRoom); // Call callback if provided
    }
  };

  return (
    <div>
      <h2>Chat Rooms</h2>
      <input
        type="text"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
  };

export default Chatrooms