# queue-tip
Simple web app that allows users to create and join rooms, and participate in an online queueing system.

You can check it out here: https://queue-tip.herokuapp.com/

## Purpose
Primarily built for TAs who are tired of managing chaotic whiteboard queues and rubbing off marker ink with their hands. May also come in handy in the midst of a global pandemic 🤡

## How to use
- Create a room and send a copy of the room link to your participants. This is the only way to invite people.
  - The room creator must also specify an admin password that participants can use to attain admin status (e.g. for scenarios where you want to have multiple admins in the same room)
- Room participants can join and leave the queue by clicking on the very large button that says "JOIN QUEUE".
- Users who create rooms or use the admin password are considered **admins**. They are able to remove participants from the queue by clicking on their names in the queue list.

## Tech Stack
- **Client**: React
- **Server**: Node.js

I used [socket.io](https://socket.io/) to facilitate bi-directional client-server communication. This made it possible to create isolated rooms with real-time server updates to all participating clients.

## Feedback
Feel free to submit an issue if there's anything making you mad/sad/happy/etc.