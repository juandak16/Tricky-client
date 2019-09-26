import React from 'react';

const Casilla = (props) => {

    const {
        casilla,
        posi,
        posj,
        handleClick
    } = props;

    
    

    return (
        <div  className='casilla' onClick={() => {handleClick(posi, posj)}}>
            {casilla !== null ? casilla.jugador === 'X' ? <div className='x'/> : <div className='o'/> : null
            }
        </div>
    );
}
 
export default Casilla;