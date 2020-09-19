import React from 'react';

const Users = ({ user, users }) => {
  return (
    <div className="border border-dark">
      <h4>Users: {users.length}</h4>
      <ul>
        {users.map(u =>
          <li key={u.id}>
            {user.name === u.name ? <b>{u.name}</b> : u.name}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Users;