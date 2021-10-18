import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [lastPing, setLastPing] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    socket.on('ping', (time) => {
      setLastPing(time);
    })
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('ping');
    };
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>Socket connected: { "" + connected }</p>
        <p>Last ping: { lastPing }</p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
