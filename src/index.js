import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import openSocket from 'socket.io-client';

const socketConnection = (openSocket('http://192.168.10.6:8000'));
console.log(socketConnection);
ReactDOM.render(<App socketConnection={socketConnection} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
