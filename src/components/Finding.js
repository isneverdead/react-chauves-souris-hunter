import * as cocossd from '@tensorflow-models/coco-ssd'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import { useSpeechSynthesis } from 'react-speech-kit'

import { useState, useRef, useEffect, useCallback } from 'react'

const Finding = ({ handleGameState }) => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const isMountedVal = useRef(1)
  const [videoConstraints, setVideoConstraints] = useState({})
  const [benda, setBenda] = useState('')
  const { speak } = useSpeechSynthesis()

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
    }, 2000)
  }
  const detectBenda = (item) => {
    // speak({
    //   text: 'is this a ' + item,
    // })
    const msg = new SpeechSynthesisUtterance()
    msg.text = 'is this a ' + item
    window.speechSynthesis.speak(msg)
    // speak({ text: 'person' })
    if (item == 'scissors') {
      handleGameState('end')
    }
  }
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
      if (obj.length != 0) {
        console.log(obj[0].class)
        if (benda != obj[0].class) {
          detectBenda(obj[0].class)
        }
        setBenda(obj[0].class)
      } else {
        if (benda != obj[0].class) {
          //   detectBenda(obj[0].class)
          detectBenda(' ga jelas bendanya')
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
    changeCamera(true)
    runCoco()
  }, [])
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
