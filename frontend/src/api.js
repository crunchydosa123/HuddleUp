import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsExports from "../aws-exports";

// Fetch list of chat rooms
export const fetchRooms = async () => {
  try {
    const response = await API.graphql(graphqlOperation(listRoomsQuery));
    return response.data.listRooms.items;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

// Create a new chat room
export const createRoom = async (roomName) => {
  try {
    const response = await API.graphql(
      graphqlOperation(createRoomMutation, { name: roomName })
    );
    return response.data.createRoom;
  } catch (error) {
    console.error("Error creating room:", error);
    return null;
  }
};

// Subscribe to messages in real-time
export const subscribeToNewMessages = (callback) => {
  return API.graphql(graphqlOperation(subscribeToMessages)).subscribe({
    next: (messageData) => {
      callback(messageData.value.data.onCreateMessage);
    },
    error: (error) => console.error("Subscription error:", error),
  });
};
