import React from 'react'
import './App.css'
import FlipCard from './FlipCard'

function App() {
  return (
    <div className="App">
      <FlipCard axis="x" duration={800} />
      <FlipCard axis="y" duration={800} />
    </div>
  );
}

export default App;
