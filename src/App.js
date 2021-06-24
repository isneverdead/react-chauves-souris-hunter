import './App.css'
import Idle from './components/Idle'
import Counter from './components/Counter'
import Finding from './components/Finding'
import Result from './components/Result'
import { useState, useEffect } from 'react'

function App() {
  const [gameState, setGameState] = useState('')
  const [missionComplete, setMissionComplete] = useState(false)
  const targetList = [
      'book',
      'cat',
      'banana',
      'backpack',
      'umbrella',
      'cell phone',
      'tie',
      'scissors',
      'bottle',
      'cup',
      'knife',
      'banana',
      'spoon',
      'bowl',
      'chair',
      'couch',
      'bed',
      'tv',
      'laptop',
      'cell phone',
      'clock',
      'scissors',
      'toothbrush'
  ]
  const [target, setTarget] = useState('')

  useEffect(() => {
    setGameState('idle')
  }, [])

  useEffect(() => {
    console.log(gameState)
    setTarget(targetList[Math.floor(Math.random() * 23)])

  }, [gameState])
  return (
    <div className="App relative flex h-screen bg-gray-200">
      {/* <button
        onClick={() => speak({ text: 'find person mampos' })}
        className="px-5 py-2 rounded-xl shadow-lg mt-10 font-semibold font-sans text-white text-2xl bg-red-300"
      >
        Let's Play
      </button> */}
      {gameState === 'idle' ? (
        <Idle handleGameState={(value) => setGameState(value)} />
      ) : null}
      {gameState === 'countDown' ? (
        <Counter handleGameState={(value) => setGameState(value)} />
      ) : null}
      {gameState === 'finding' ? (
        <Finding handleGameState={(value) => setGameState(value)} handleMission={(value) => setMissionComplete(value)} target={target} />
      ) : null}
      {gameState === 'end' ? (
        <Result handleGameState={(value) => setGameState(value)} isComplete={missionComplete} />
      ) : null}
    </div>
  )
}

export default App
