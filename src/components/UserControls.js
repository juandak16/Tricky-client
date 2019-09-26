import React from "react";

const UserControls = ({ socketConnection, selfSocketId }) => {
  const inputElement = React.useRef(null);
  const [userName, setUserName] = React.useState("USER");
  console.log(socketConnection.connected);

  const handleNameChange = () => {
    const { value: inputNameValue } = inputElement.current;
    if (inputNameValue !== "") {
      socketConnection.emit("name_update", inputNameValue);
      setUserName(inputNameValue);
    }
  };
  return (
    <div className="user-controls">
      <h2>{userName}</h2>
      <span>{selfSocketId}</span>
      <input className="input-data" type="text" placeholder="Change you user name" ref={inputElement} />
      <button className="button-data" onClick={handleNameChange}>CHANGE NAME</button>
    </div>
  );
};

export default UserControls;
