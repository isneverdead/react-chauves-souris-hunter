import logo from '../logo_app.svg'
import { useState, useEffect } from 'react'

const Idle = ({ handleGameState, isLoading }) => {
  const [counter, setCounter] = useState(1)
  const [dot, setDot] = useState('')

  useEffect(() => {
    const countDown = setInterval(function () {
      console.log(counter)
      setCounter(counter + 1)

      if(counter == 1) {
        setDot('.')
      } else if (counter == 2) {
        setDot('. .')
      } else if (counter == 3) {
        setDot('. . .')
      } else if (counter == 4) {
        setDot('. . . .')
        setCounter(1)
      }

     
    }, 500)
    return () => {
      clearInterval(countDown)
    }
  }, [counter])
  return (
    <>
      <div className="flex flex-col justify-between h-full w-full">
        <div className=""></div>
        <div className="w-full px-4 lg:px-8 flex flex-col items-center">
          <img className="w-24 h-24 lg:w-16 lg:h-16" src={logo} alt="logo" />
          <h3 className="font-sans text-lg font-semibold">Chauves-souris hunter</h3>
          <p>
           A.K.A the hunter bat gives voice commands, look for objects around according to his voice command. <br/> A neural network will try to guess what it’s seeing. <br/>
Make sure your sound is on.
          </p>
          {
            isLoading ? 
              <button
                disabled={isLoading}
                className="px-5 py-2 cursor-not-allowed rounded-xl shadow-lg mt-10 font-semibold font-sans text-white text-2xl bg-red-300"
              >
                Loading{dot}
              </button> :
              <button
                onClick={() => handleGameState('countDown')}
                className="px-5 py-2 rounded-xl shadow-lg mt-10 font-semibold font-sans text-white text-2xl bg-red-300"
              >
                Let's Play
              </button>
          }
          
        </div>
        <div className="mb-5">
        <select id="language">
          <option value="volvo">English</option>
        </select>
        </div>
      </div>
    </>
  )
}

export default Idle
