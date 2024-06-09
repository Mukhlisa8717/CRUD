import React from "react";

function UserList({ data, handleDeleteUser, setEdit }) {
  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>
          <p>{user.fname}</p>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          <button onClick={() => setEdit(user)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;
