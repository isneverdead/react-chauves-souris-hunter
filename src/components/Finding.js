import * as cocossd from '@tensorflow-models/coco-ssd'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import { useSpeechSynthesis } from 'react-speech-kit'

import { useState, useRef, useEffect, useCallback } from 'react'

const Finding = ({ handleGameState, target }) => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const isMountedVal = useRef(1)
  const [videoConstraints, setVideoConstraints] = useState({})
  const [benda, setBenda] = useState('')
  const [targetBenda, setTargetBenda] = useState('default')
  const [currentBenda, setCurrentBenda] = useState('')
  const { speak } = useSpeechSynthesis()
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
    if(target != currentBenda && item.length != 0) {
      console.log(`yang dicari ${target} yang ketemu ${item}`)
      msg.text = `yang dicari ${target} yang ketemu ${item}`
    }
     else if (item.length != 0) {
      console.log(`mantab ketemu juga ${item}`)
      msg.text = `mantab ketemu juga ${item}`
    }
    else {
      console.log('get ready')
      msg.text = `get ready!`

    }
    console.log(msg.text)
    window.speechSynthesis.speak(msg)
    // speak({ text: 'person' })
    // console.log('yang dicari ' + target + ' yang ketemu '+item)
    if (item == target) {
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
    setTargetBenda('diubah')
    // console.log('exec')
  }, [])
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
        setBenda('ga jelas bendanya')
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
          <h1 className="font-sans font-bold text-4xl text-white">Find...</h1>
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
          // videoConstraints={videoConstraints}
          className="absolute h-full w-full z-10"
        />
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="absolute z-50 bottom-4 left-2 px-5 py-2 bg-white rounded-md">
          <h2 className="font-sans font-bold text-2xl text-gray-800">
            ini {benda}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Finding
