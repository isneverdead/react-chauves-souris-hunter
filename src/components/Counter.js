import { useState, useEffect } from 'react'
import SetInterval from 'set-interval'

const Counter = ({ handleGameState }) => {
  const backgroundClasses = 'flex w-full justify-center items-center h-screen'
  const [backgroundColor, setbackgroundColor] = useState('')
  const [counter, setCounter] = useState(3)
  // const countDown = () => {
  //   setInterval(function () {
  //     setCounter(counter - 1)
  //     if (counter > 1) {
  //       countDown()
  //     }
  //     console.log(counter)
  //     if (counter == 1) {
  //       clearInterval()
  //       // handleGameState('finding')
  //     }
  //   }, 1000)
  // }
  let countDownDate = 0
  const [numb, setNumb] = useState(0)
  const changeNumb = () => {
    countDownDate++
    if (numb < 3) {
      setNumb(countDownDate)
      console.log(numb)
    } else {
      SetInterval.clear('test')
    }
  }

  // const countDown = setInterval(function () {
  //   countDownDate++
  //   // console.log(countDownDate)
  //   // changeNumb(countDownDate)
  //   // console.log(Math.random())
  //   if (countDownDate > 5) {
  //     clearInterval(countDown)
  //   }
  // }, 1000)
  useEffect(() => {
    // countDown()
    // countDown()
    // handleGameState('finding')
  }, [])
  const changeBackground = (counter) => {
    if (counter === 3) {
      setbackgroundColor('bg-red-300')
      // setCounter(counter)
    } else if (counter === 2) {
      setbackgroundColor('bg-yellow-300')
      // setCounter(counter)
    } else if (counter === 1) {
      setbackgroundColor('bg-green-300')
      // setCounter(counter)
    }
  }
  useEffect(() => {
    changeBackground(counter)
    if (counter > 0) {
      // console.log('executed')
      // countDown()
      SetInterval.start(changeNumb(), 1000, 'test')
    }
  }, [counter])
  //   const msg = new SpeechSynthesisUtterance()
  //   msg.text = 'Good Morning'
  //   window.speechSynthesis.speak(msg)
  // setbackgroundColor('bg-blue-200')
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
