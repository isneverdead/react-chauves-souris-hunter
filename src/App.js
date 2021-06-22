import './App.css'
import Idle from './components/Idle'
import Counter from './components/Counter'
import Finding from './components/Finding'
import Result from './components/Result'
import { useState, useEffect } from 'react'




function App() {

  const [gameState, setGameState] = useState('')

  const changeGameState = (state) => {
    setGameState(state)
  }
  
  useEffect(() => {
    setGameState('countDown')
  }, [])
 
  useEffect(() => {
    console.log(gameState)
  }, [gameState])
  return  (
    <div className="App relative flex h-screen bg-gray-200">
      {
        gameState === 'idle' ? <Idle handleGameState={changeGameState} /> : null
      }
      {
        gameState === 'countDown' ? <Counter handleGameState={value => setGameState(value)} /> : null
      }
      {
        gameState === 'finding' ? <Finding handleGameState={value => setGameState(value)} /> : null
      }
      {
        gameState === 'end' ? <Result handleGameState={changeGameState} /> : null
      }
      
     
    </div>
  );
}

export default App;
