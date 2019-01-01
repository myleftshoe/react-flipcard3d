import React from 'react'
import './App.css'
import FlipCard from './FlipCard'

function App() {
  return (
    <div className="App">
      <FlipCard />
      <p />
      <FlipCard axis="X" />
    </div>
  );
}

export default App;
