// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
import * as cocossd from "@tensorflow-models/coco-ssd";
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [benda, setBenda] = useState('');
  const [gameState, setGameState] = useState('idle');
  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    const net = await cocossd.load();
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detectBenda = (object) => {
    if(object == 'scissors') {
      console.log('ketemuuuuu')
      setGameState('end');
    };
  }
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
      
      if(obj.length != 0) {
        console.log(obj[0].class)
        setBenda(obj[0].class)
        detectBenda(obj[0].class)
      } else {
        setBenda('ga jelas bendanya')

      }

      
      // Draw mesh
      // const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
    }
  };

  // useEffect(()=>{runCoco()},[]);
  const startGame = ()  => {
    setGameState('running');
    runCoco();
  };
  return (
    <div className="App">
      <div className="">
        {
          gameState == 'running' ? (
            <h1>Cari scissors</h1>
          ): null
        }
        {
          gameState == 'running' ? (
            <h1>ini bukan Scissors, ini {benda}</h1>

          ) : null
        }
         {
          gameState == 'end' ? (
            <h1>Berhasil</h1>
          ): null
        }
        {
          benda == 'scissors' ? <h1>Ketemu!!!!</h1> : null
        }
      </div>
      <div className="">
        {
          gameState == 'idle' ? (
            <button onClick={startGame} style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              backgroundColor: "green",
              color: "white"
            }}>Start Game</button>
          ) : null
        }
        {
          gameState == 'end' ? (
            <button onClick={startGame} style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              backgroundColor: "green",
              color: "white"
            }}>Main Lagi</button>
          ) : null
        }
       
      </div>
      {
        gameState == 'running' ? (
          <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
        )
        : null
      }
      
    </div>
  );
}

export default App;
