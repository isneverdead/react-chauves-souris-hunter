import './App.css'
import Idle from './components/Idle'
import Counter from './components/Counter'
import Finding from './components/Finding'
import Result from './components/Result'
import { useState, useRef, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";



function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    setLoading(true)
    const net = await cocossd.load();
    setLoading(false)
    // console.log(net)
    // console.log('coco loaded')
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const obj = await net.detect(video);
      // eslint-disable-next-line
      if(obj.length != 0) {
        console.log(obj[0].class)
        // setBenda(obj[0].class)
        // detectBenda(obj[0].class)
      } else {
        // setBenda('ga jelas bendanya')

      }

      
      // Draw mesh
      // const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
    }
  };
  useEffect(() => {
    runCoco()
  }, [])
  const videoConstraints = {
    facingMode: { exact: "environment" }
  };

  // const countNumber = 2
  
  return loading ? <div className="">
    <h1>Loading</h1>
  </div> : (
    <div className="App relative flex h-screen bg-gray-200">
      {/* <Idle /> */}
      {/* <Counter count={countNumber}/> */}
      {/* <Finding /> */}
      {/* <Result /> */}
      <Webcam
        ref={webcamRef}
        muted={true} 
        videoConstraints={videoConstraints}
        className="absolute h-full w-full z-10 bg-red-300"
      />
      <canvas
        ref={canvasRef}
        className="h-full w-full"

      />
    </div>
  );
}

export default App;
