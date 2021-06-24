import * as cocossd from '@tensorflow-models/coco-ssd'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import { useState, useRef, useEffect } from 'react'

const Finding = ({ handleGameState, target, handleMission, isMobile }) => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [videoConstraints, setVideoConstraints] = useState({})
  const [benda, setBenda] = useState('')
  const [targetBenda, setTargetBenda] = useState('default')
  const [currentBenda, setCurrentBenda] = useState('')
  const [message, setMessage] = useState('Loading....')
  const [counter, setCounter] = useState(30)
 
  const speakWrongTarget = (target, item) => {
    const list1 = [
      `i'm looking for `,
      `can you help me to find a `,
      `i'm not looking for `,
      `i don't wanna `,
      `I Need! `
    ]
    const list2 = [
      ` not a `,
      `? this is a `,
      `? now!`,
      `? please.`,
      `? not a `
    ]
    const randomIndex = Math.floor(Math.random() * 8)
    switch(randomIndex) {
      case 0: 
        return  list1[1] + target + list2[4] + item
      case 1: 
        return  list1[2] + item
      case 2:
        return  list1[0] + target + list2[0] + item
      case 3: 
        return  list1[2] + item
      case 4: 
        return  list1[1] + target + list2[2]
      case 5: 
        return  list1[1] + target + list2[3]
      case 6: 
        let temp = ''
        let str = target;
        for (let i = 0; i < str.length; i++) {
            temp = temp + ' '+ str[i] + ', ';
        }
        return  list1[4] + temp + '.'
      default:
        let temp2 = ''
        let str2 = target;
        for (let i = 0; i < str2.length; i++) {
            temp2 = temp2 + ' '+ str2[i] + ', ';
        }
        return  list1[4] + temp2 + '.'

    }
  }

  const runCoco = async () => {
    setLoading(true)
    const net = await cocossd.load()
    setLoading(false)
    setInterval(() => {
      detect(net)
    }, 3000)
  }

  const detectBenda = async (item) => {
    const synth = window.speechSynthesis;
    let voices = [];
    voices = synth.getVoices();
    const speakText = new SpeechSynthesisUtterance();
    speakText.voice = voices[2]
    
    if (item == 'What is this?') {
      speakText.text = `What is this?.`
    }
    else if(target != currentBenda && item.length != 0 && item != target) {
      speakText.text = speakWrongTarget(target, item)
    }
     else if (item == target && item.length != 0) {
      speakText.text = `finally, you found that ${item}.`
    }
    else {
      speakText.text = `get ready!`
    }
    setMessage(speakText.text)

    synth.cancel()
    synth.speak(speakText)
    // if target found 
    if (item == target) {
      handleMission(true)
      handleGameState('end')
    }
  }

  useEffect(() => {
    const countDown = setInterval(function () {
      if(benda.length != null) {
        setCounter(counter - 1)
      }
      if (counter == 1) {
        handleGameState('end')
      }
    }, 1000)
    return () => {
      clearInterval(countDown)
    }
  }, [counter])

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      const obj = await net.detect(video)

      if (obj.length != 0) {
        setBenda(obj[0].class)
      } else {
        setBenda('What is this?')
      }
    }
  }

  useEffect(() => {
    changeCamera(!isMobile)
    runCoco()
  }, [])

  useEffect(() => {
    detectBenda(benda)
  }, [benda])

  let facingCamera = true
  const changeCamera = (isFacing) => {
    if (isFacing) {
      facingCamera = true
      setVideoConstraints({})
      setVideoConstraints({
        facingMode: 'user',
      })
    } else {
      facingCamera = false
      setVideoConstraints({})
      setVideoConstraints({
        facingMode: { exact: 'environment' },
      })
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="relative flex flex-col text-center justify-center items-center h-full w-full bg-black">
        <div className="w-full fixed top-0 flex flex-row justify-between px-5 z-40 lg:px-10 py-3 bg-red-300">
          <h1 className="font-sans font-bold text-4xl text-white">⏱️ {counter}</h1>
          <button
            onClick={() => changeCamera(!facingCamera)}
            className="px-3 py-2 z-50 bg-blue-200 rounded-lg font-semibold"
          >
            Change 📷
          </button>
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <h1 className="font-sans font-bold text-2xl text-white">
              Loading . . .
            </h1>
          </div>
        ) : null}
        {
          benda.length == null ? <div className="h-screen fixed z-50 top-0 bottom-0 left-0 right-0 w-full flex justify-center items-center bg-red-600">
          <h2 className="font-semibold font-sans text-white text-2xl">Listen...</h2>
        </div> : null
        }
        
        <Webcam
          ref={webcamRef}
          muted={true}
          videoConstraints={videoConstraints}
          className="absolute h-full w-full z-10"
        />
        <canvas ref={canvasRef} className="w-full h-full px-2" />
        <div className="absolute z-50 bottom-4 left-2 px-5 py-2 bg-white rounded-md">
          <h2 className="font-sans font-bold text-2xl text-gray-800">
            {message}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Finding
