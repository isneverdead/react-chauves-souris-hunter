import * as cocossd from '@tensorflow-models/coco-ssd'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import { useSpeechSynthesis } from 'react-speech-kit'

import { useState, useRef, useEffect, useCallback } from 'react'

const Finding = ({ handleGameState, target, handleMission }) => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const isMountedVal = useRef(1)
  const [videoConstraints, setVideoConstraints] = useState({})
  const [benda, setBenda] = useState('')
  const [targetBenda, setTargetBenda] = useState('default')
  const [currentBenda, setCurrentBenda] = useState('')
  const { speak } = useSpeechSynthesis()
  const [message, setMessage] = useState('Loading....')
  const [counter, setCounter] = useState(30)

  
  const targetList = [
      'book',
      'cat',
      'banana',
      'backpack',
      'umbrella',
      'tie',
      'bottle',
      'cup',
      'fork',
      'knife',
      'spoon',
      'bowl',
      'chair',
      'couch',
      'bed',
      'tv',
      'laptop',
      'remote',
      'cell phone',
      'clock',
      'scissors',
      'toothbrush'
  ]
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
      `? please.`
    ]
    const randomIndex = Math.floor(Math.random() * 8)
    console.log(randomIndex)
    switch(randomIndex) {
      case 0: 
        return  list1[1] + target + list2[1] + item
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
          // console.log(temp);
        }
        return  list1[4] + temp + '.'
      default:
        let temp2 = ''
        let str2 = target;
        for (let i = 0; i < str2.length; i++) {
            temp2 = temp2 + ' '+ str2[i] + ', ';
          // console.log(temp2);
        }
        return  list1[4] + temp2 + '.'

    }
  }

  const runCoco = async () => {
    // 3. TODO - Load network
    // e.g. const net = await cocossd.load();
    setLoading(true)
    const net = await cocossd.load()
    setLoading(false)
    // console.log(net)
    // console.log('coco loaded')
    //  Loop and detect hands
    setInterval(() => {
      detect(net)
    }, 3000)
  }
  const detectBenda = async (item) => {
    const msg = new SpeechSynthesisUtterance()
    // msg.text = `this is not a scissors, this a ${item}. FIND scissors!`
    // setCurrentBenda(item)
    console.log(currentBenda)
    if (item == 'What is this?') {
      msg.text = `What is this?.`
    }
    else if(target != currentBenda && item.length != 0 && item != target) {
      console.log(`I'M looking for ${target} not a ${item}`)
      // msg.text = `I'M looking for ${target} not a ${item}`
      
      msg.text = speakWrongTarget(target, item)
    }
     else if (item == target && item.length != 0) {
      console.log(`finally, you found that ${item}.`)
      msg.text = `finally, you found that ${item}.`
    }
    else {
      console.log('get ready')
      msg.text = `get ready!`

    }
    console.log(msg.text)
    setMessage(msg.text)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(msg)
    // speak({ text: 'person' })
    // console.log('yang dicari ' + target + ' yang ketemu '+item)
    if (item == target) {
      handleMission(true)
      handleGameState('end')
    }
  }
  const setTarget = () => {
    const randomIndex = Math.floor(Math.random() * 11)
    const target = targetList[randomIndex]
    setTargetBenda('target')
    console.log(randomIndex)
    // console.log(targetBenda)
  }
  useEffect(() => {
    const countDown = setInterval(function () {
      // console.log(counter)
      setCounter(counter - 1)
      if (counter == 1) {
        handleGameState('end')
      }
    }, 1000)
    return () => {
      clearInterval(countDown)
    }
  }, [counter])
  // useEffect(() => {
  //   setTargetBenda('diubah')
  //   // console.log('exec')
  // }, [])
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Set canvas height and width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const obj = await net.detect(video)
      // eslint-disable-next-line
    //   const target = obj[0].class
    // console.log(targetBenda)

      if (obj.length != 0) {
        setBenda(obj[0].class)
        // console.log(obj[0].class)
        // console.log(benda)
        if (benda != obj[0].class) {

          // detectBenda(obj[0].class)
        }
      } else {
        // setBenda(obj)
        if (benda != obj) {
          //   detectBenda(obj[0].class)
          // detectBenda(' ga jelas bendanya')
        }
        setBenda('What is this?')
      }

      // Draw mesh
      // const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)
    }
  }
  useEffect(() => {
    // setTargetBenda('llll')
    // console.log(targetBenda)
    changeCamera(true)
    changeCamera(true)
    runCoco()
  }, [])
  useEffect(() => {
    // console.log(targetBenda)
    // setCurrentBenda(benda)
    detectBenda(benda)
  }, [benda])
  let facingCamera = true
  const changeCamera = (isFacing) => {
    // console.log(facingCamera)
    if (isFacing) {
      facingCamera = true
      setVideoConstraints({
        facingMode: 'user',
      })
    } else {
      facingCamera = false
      setVideoConstraints({
        facingMode: { exact: 'environment' },
      })
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="relative flex flex-col text-center justify-center items-center h-full w-full bg-black">
        <div className="w-full flex flex-row justify-between px-10 py-3 bg-red-300 ">
          <h1 className="font-sans font-bold text-4xl text-white">Find... {counter}</h1>
          <button
            onClick={() => changeCamera(!facingCamera)}
            className="px-3 py-2 z-50 bg-blue-200 rounded-lg font-semibold"
          >
            Change
          </button>
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <h1 className="font-sans font-bold text-2xl text-white">
              Loading . . .
            </h1>
          </div>
        ) : null}
        <Webcam
          ref={webcamRef}
          muted={true}
          videoConstraints={videoConstraints}
          className="absolute h-full w-full z-10"
        />
        <canvas ref={canvasRef} className="h-full w-full" />
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
