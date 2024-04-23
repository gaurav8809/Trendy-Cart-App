// 1. Install dependencies
// 2. Import dependencies
// 3. Setup webcam and canvas
// 4. Define references to those
// 5. Load handpose
// 6. Detect function
// 7. Draw using drawMask

import React, {useEffect, useRef, useState} from "react";
// import logo from './logo.svg';
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import "./App.css";
import * as THREE from 'three';
import TSHIRT from './../../assets/img/tshirt.png';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';

function VirtualTryOn() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [model, setModel] = useState(null);
    const [tShirtMesh, setTShirtMesh] = useState(null);

    useEffect(() => {
        const loadResources = async () => {
            try {
                // Camera Access
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }

                // TensorFlow Model
                await tf.setBackend('webgl');
                // const loadedModel = await faceLandmarksDetection.load(
                //     faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
                //     { shouldLoadIrisModel: true,
                //         maxFaces: 1,
                //         // returnTensors: false,
                //         // predictIrises: false
                //     }
                // );
                // setModel(loadedModel);

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

                // Make Detections
                // * One of (see documentation below):
                // *   - net.segmentPerson
                // *   - net.segmentPersonParts
                // *   - net.segmentMultiPerson
                // *   - net.segmentMultiPersonParts
                // const person = await net.segmentPerson(video);
                const net = await bodyPix.load();
                console.log("BodyPix model loaded.");
                setModel(net);

                // Three.js Setup
                const width = canvasRef.current.clientWidth;
                const height = canvasRef.current.clientHeight;
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
                camera.position.z = 5;
                const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
                renderer.setSize(width, height);
                renderer.setAnimationLoop(() => renderer.render(scene, camera));

                // TShirt Mesh
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(TSHIRT, (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    const geometry = new THREE.PlaneGeometry(2, 1);
                    debugger
                    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
                    const tShirt = new THREE.Mesh(geometry, material);
                    scene.add(tShirt);
                    setTShirtMesh(tShirt);
                });
            } catch (error) {
                console.error("Initialization error:", error);
            }
        };

        loadResources();

    }, []);

    useEffect(() => {
        // Run detection and positioning every 120ms
        const intervalId = setInterval(() => {
            detect();
        }, 120);

        return () => clearInterval(intervalId);
    }, [model, tShirtMesh !== null]);

    const detect = async () => {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {

            if (!model || !tShirtMesh){
                console.log('TSHIRT NOT SETUP');
                return;
            }

            // // const faceEstimates = await model.segmentPersonParts({input: video});
            if (model) {
                const video = webcamRef.current.video;
                const person = await model.segmentPersonParts(video);
                console.log(person);

                // const coloredPartImage = bodyPix.toMask(person);
                const coloredPartImage = bodyPix.toColoredPartMask(person);
                const opacity = 0.7;
                const flipHorizontal = false;
                const maskBlurAmount = 0;
                const canvas = canvasRef.current;

                // bodyPix.drawMask(
                //     canvas,
                //     video,
                //     coloredPartImage,
                //     opacity,
                //     maskBlurAmount,
                //     flipHorizontal
                // );

                // Face mesh keypoints
                const keypoints = person.allPoses[0].keypoints;
                const leftEye = keypoints[1];
                const rightEye = keypoints[2];
                const eyeCenter = keypoints[0];

                const leftShoulder = keypoints[5];
                const rightShoulder = keypoints[6];
                const leftElbow = keypoints[7];
                const rightElbow = keypoints[8];
                const leftWrist = keypoints[9];
                const rightWrist = keypoints[10];
                const leftHip = keypoints[11];
                const rightHip = keypoints[12];

                // Eye distance for glasses scaling
                // const eyeDistance = Math.sqrt(leftShoulder.position.x - rightShoulder.position.x, leftHip.position.y - leftShoulder.position.y);
                // const scaleMultiplier = 200 / 140;

                const shoulderDistance = Math.sqrt(Math.pow(rightShoulder.position.x - leftShoulder.position.x, 2) + Math.pow(rightHip.position.y - rightShoulder.position.y, 2));
                const scaleMultiplier = shoulderDistance / 140;

                // Glasses scaling and offset values
                const scaleX = 0.01;
                const scaleY = -0.01;
                const offsetX = 0.00;
                const offsetY = -0.01;

                // Glasses positioning
                // tShirtMesh.position.x = (eyeCenter.position.x - video.videoWidth / 2) * scaleX + offsetX;
                // tShirtMesh.position.y = (eyeCenter.position.y - video.videoHeight / 2) * scaleY + offsetY;
                // tShirtMesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
                // tShirtMesh.position.z = 1;

                tShirtMesh.position.x = (rightShoulder.position.x - video.videoWidth / 2.7) * scaleX + offsetX;
                tShirtMesh.position.y = (rightShoulder.position.y - video.videoHeight / 2.9) * scaleY + offsetY;
                tShirtMesh.scale.set(scaleMultiplier, scaleMultiplier * 2, scaleMultiplier);
                tShirtMesh.position.z = 1;

                // // Rotate glasses to align with eyes - rotation depth
                // const eyeLine = new THREE.Vector2(rightEye.position.x - leftEye.position.x, rightEye.position.y - leftEye.position.y);
                // const rotationZ = Math.atan2(eyeLine.y, eyeLine.x);
                // tShirtMesh.rotation.z = rotationZ;

                // Optional: Rotate garment to align with shoulders
                // const shoulderLine = new THREE.Vector2(rightShoulder.position.x - leftShoulder.position.x, rightShoulder.position.y - leftShoulder.position.y);
                // const rotationZ = Math.atan2(shoulderLine.y, shoulderLine.x);
                // tShirtMesh.rotation.z = rotationZ;
            }
        }
    };


    return (
        <div className="App">
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 750,
                        height: 600,
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
                        zindex: 9,
                        width: 750,
                        height: 563,
                    }}
                />
            </header>
        </div>
    );
}

export default VirtualTryOn;
