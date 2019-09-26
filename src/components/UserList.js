import React from "react";

const UserList = ({ currentUsers }) => (
  <div className="current-users">
    <h2>current users</h2>
    {Object.keys(currentUsers).map(key => {
      return <p key={key}>{`${currentUsers[key].name}: ${currentUsers[key].address}`}</p>;
    })}
  </div>
);

export default UserList;
