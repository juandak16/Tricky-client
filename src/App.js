import React from "react";
import "./App.css";
import Game from "./components/Game";
import UserList from "./components/UserList";
import UserControls from "./components/UserControls";

const initialState = {
  currentUsers: [],
  game: {},
  selfSocketId: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USERS":
      return {
        ...state,
        currentUsers: action.payload
      };
    case "UPDATE_GAME":
      return {
        ...state,
        game: action.payload
      };
    case "UPDATE_SELF_SOCKET_ID":
      return {
        ...state,
        selfSocketId: action.payload
      };
    default:
      throw new Error("the action type is not defined in the reducer");
  }
};

const App = ({ socketConnection }) => {
  // create the store for the entire app
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // get state from store
  const {
    currentUsers,
    game,
    selfSocketId
  } = state;

  // handle incoming messages from server
  socketConnection.on("connect", () => {
    console.log(`connected: ${socketConnection.id}`);
    socketConnection.emit("new_client", socketConnection.id);
    // actulizando la variable state.selfSocketId
    dispatch({
      type: "UPDATE_SELF_SOCKET_ID",
      payload: socketConnection.id
    });

    // Update users on server broadcast
    socketConnection.on("user_update", users => {
      dispatch({
        type: "UPDATE_USERS",
        payload: users
      });
    });

    // Update games on sever broadcast
    socketConnection.on("game_update", game => {
      dispatch({
        type: "UPDATE_GAME",
        payload: game
      });
    });

    socketConnection.on("move_playerOne", data => {
      console.log('Player One dice: ', data.move);
    });

    socketConnection.on("move_playerTwo", data => {
      console.log('Player Two dice: ', data.move);
    });

    socketConnection.on("disconnect", socketid => {
      console.log(socketid,' , ',socketConnection.id);
      if(socketConnection.id === socketid){
        alert('desconectado, solo se permite una conexion por computadora');
        socketConnection.disconnect();
        console.log('desconectado', );
      }
    });

  });


  return (
    <div className="app-main-container">
      <div className='data-container'>
        <UserControls
          socketConnection={socketConnection}
          selfSocketId={selfSocketId}
        />
        <UserList currentUsers={currentUsers} />
      </div>
      <Game
        selfSocketId={selfSocketId}
        game={game}
        currentUsers={currentUsers}
        socketConnection={socketConnection}
      />
    </div>
  );
};

export default App;
