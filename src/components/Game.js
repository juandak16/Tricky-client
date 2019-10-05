import React from 'react';

import Casilla from './Casilla';

const Game = ({
  game,
  currentUsers,
  selfSocketId,
  socketConnection,
}) => {

  let tablero = game.tablero;
  const handleJoinGame = () => {
    socketConnection.emit('join_game', {userKey: selfSocketId});
    joinable = false;
  };

  const handleLeaveGame = () => {
    socketConnection.emit('leave_game', {game: game, userKey: selfSocketId});
  };

  const handleReiniciarGame = () => {
    socketConnection.emit('rest_game');
  };

  const hacerJugada = (posi, posj) => {
    if(game.turn === 1){
      if(game.playerOne === selfSocketId){
        socketConnection.emit('move_game', {posi, posj});
      }
    }else{
      if(game.playerTwo === selfSocketId){
        socketConnection.emit('move_game', {posi, posj});
      }
    }
    
  };


  let joinable = true;
  let restable = false;
  let leaveable = false;
  let tabable = false;
  

  if(game.playerOne === selfSocketId || game.playerTwo === selfSocketId){
    leaveable= true;
  }

  if(game.playerOne === selfSocketId || game.playerTwo === selfSocketId){
    joinable = false;

  }
  if(game.playerOne !== undefined && game.playerTwo !== undefined){
    joinable = false;
  }
  if (game.playerOne === selfSocketId || game.playerTwo === selfSocketId ) {
    restable = true;
  }
  if (game.playerOne !== undefined && game.playerTwo !== undefined && game.end === false) {
    tabable = true;
  }



  return (
    <div className="game" >
      <div className='tablero'>
        <div>
          { game.turn === 1? <div className='iconX'/> : <div className='iconHidden'/>}
          <div className='playerOne'>{
              game.playerOne === undefined ?
              '' :
              currentUsers[game.playerOne].address
            }</div>
        </div>
      <div className='tablero-container'>
        <div className={`ojos ${game.turn===1? 'izquierda':'derecha'}`}>
          <div className="ojo">
            <div className="pupila"/>
          </div>
          <div className="ojo">
            <div className="pupila"/>
          </div>
        </div>
        {!tabable &&
        <div className='block-game' />}
        {tablero &&
        tablero.map(
          function(linea, i) {
            return linea.map(function (casilla, j) {
              return <Casilla casilla={casilla} posi={i} posj={j} game={game} key={`${i}-${j}`} handleClick={hacerJugada}></Casilla>
            })
          }
        )} 
      </div>
        <div>
          <div>
            { game.turn === 2? <div className='iconO'/> : <div className='iconHidden'/>}
            <div className='playerTwo'>{
                game.playerTwo === undefined ?
                '' :
                currentUsers[game.playerTwo].address
              }</div>
          </div>
        </div>
      </div>



      <div className="game-actions">
        <div/>
        <div className='buttons'>
          <button className='button-action' onClick={handleJoinGame} disabled={!joinable}>JOIN</button>
          <button className='button-action' onClick={handleLeaveGame} disabled={!leaveable}>LEAVE</button>
          <button className='button-action' onClick={handleReiniciarGame} disabled={!restable}>RESTART</button>
        </div>
        <div/>
      </div>
    </div>
  );
};

export default Game;
