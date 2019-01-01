import React from 'react'
import FlipCard from './FlipCard'

function App() {
  return (
    <FlipCard axis='Y' onFlipped={side => console.log(side)} />
  );
}

export default App;
