// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import {API} from "../../redux/apiServices/apiCall";

function ObjectDetection(props) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // Main function
    const runCoco = async () => {
        const net = await cocossd.load();
        console.log("Cocossd model loaded.");
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

            const imageData = webcamRef.current.getScreenshot();

            // Convert base64 data to binary format
            const binaryData = atob(imageData.split(',')[1]);

            // await detectUsingAzure(imageData);

            // Make Detections
            const obj = await net.detect(video, 1, 0.85);


            if(obj.length && obj[0].class !== 'person') {
                obj.length && console.log(obj[0].class + ' - ' + obj[0].score)
                props.addItemInList(obj[0]);

                const ctx = canvasRef.current.getContext("2d");
                drawRect(obj, ctx);
            }

            // addItemInList(obj);

            // Draw mesh

            // obj.length && obj[0].score > 0.70 &&
        }
    };

    useEffect(()=>{runCoco()},[]);

    // const detectUsingAzure = async (binaryData) => {
    //     const api = 'https://testcomputervisionworkspace.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2024-02-01&features=objects';
    //     const header = {
    //         'Content-Type': 'application/json',
    //         'Ocp-Apim-Subscription-Key': '3f436757d6c64b9ba332bc70654d419b'
    //     }
    //     debugger
    //     const res = await API(api, 'POST', binaryData.split(',')[1], header)
    //     debugger
    // }

    return (
        <div className="App">
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    muted={true}
                    // mirrored
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 840,
                        height: 680,
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
        </div>
    );
}

export default ObjectDetection;
