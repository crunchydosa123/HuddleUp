/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      username
      email
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      username
      email
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      username
      email
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onCreateRoom(filter: $filter, owner: $owner) {
      id
      name
      participants
      messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onUpdateRoom(filter: $filter, owner: $owner) {
      id
      name
      participants
      messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onDeleteRoom(filter: $filter, owner: $owner) {
      id
      name
      participants
      messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
      id
      content
      sender
      roomID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
      id
      content
      sender
      roomID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
      id
      content
      sender
      roomID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
