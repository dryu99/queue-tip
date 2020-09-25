# queue-tip
Simple web app that allows users to create and join rooms, and participate in an online queueing system.

You can check it out here: https://queue-tip.herokuapp.com/

## Purpose
Primarily built for TAs who are tired of managing chaotic whiteboard queues and rubbing off marker ink with their hands. May also come in handy in the midst of a global pandemic 🤡

## How to use
- Create a room and send a copy of the room link to your participants. This is the only way to invite people. 
- Participants can join and leave the queue by clicking on the very large button that says "JOIN/LEAVE QUEUE".
- Users who create rooms are considered **admins**. They are capable of:
  - removing participants from the queue by clicking on their names in the queue list.
  - giving other participants admin status by clicking on their names in the users list.

## Tech Stack
- **Client**: React
- **Server**: Node.js

I used [socket.io](https://socket.io/) to facilitate bi-directional client-server communication. This made it possible to create isolated rooms with real-time server updates to all participating clients.

## Why is the UI so ugly
Because UI is my passion.

## Feedback
Feel free to submit an issue if there's anything making you mad/sad/happy.