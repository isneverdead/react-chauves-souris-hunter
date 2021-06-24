import { useState, useEffect } from 'react'
import SetInterval from 'set-interval'

const Counter = ({ handleGameState }) => {
  const backgroundClasses = 'flex w-full justify-center items-center h-screen'
  const [backgroundColor, setbackgroundColor] = useState('')
  const [counter, setCounter] = useState(3)

  useEffect(() => {
    changeBackground(counter)
    const countDown = setInterval(function () {
      // console.log(counter)
      setCounter(counter - 1)
      if (counter == 1) {
        handleGameState('finding')
      }
    }, 1000)
    return () => {
      clearInterval(countDown)
    }
  }, [counter])
  const changeBackground = (counter) => {
    if (counter === 3) {
      setbackgroundColor('bg-red-300')
    } else if (counter === 2) {
      setbackgroundColor('bg-yellow-300')
    } else if (counter === 1) {
      setbackgroundColor('bg-green-300')
    }
  }
 
  useEffect(() => {
   
  }, [counter])

  return (
    <>
      {/* <Idle /> */}
      <div className={backgroundClasses + ' ' + backgroundColor}>
        <h1
          className="font-bold text-white"
          style={{
            // fontFamily: 'Passion One',
            fontSize: '288px',
          }}
        >
          {counter}
        </h1>
      </div>
    </>
  )
}

export default Counter
