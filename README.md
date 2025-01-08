# taming-robovitch

An interactive computer vision/machine learning project that allows you to control a robot using gestures captured through your webcam. The project uses machine learning to recognize gestures and translate them into robot commands.

## Features

- Real-time gesture (image recognition) using ML5.js
- Webcam integration using P5.js
- Serial communication with robot hardware
- Custom-trained machine learning model
- Responsive web interface

## Technologies Used

- ML5.js for machine learning and gesture recognition
- P5.js for webcam capture and visualization
- P5.SerialPort for hardware communication
- Bootstrap 5 for responsive design
- Teachable Machine for model training

## Setup

1. Connect your robot to the specified serial port (default: '/dev/tty.usbmodem101')
2. Run a local server to open [index.html](index.html) in a web browser (e.g. using `http-server` command)
3. Allow webcam access when prompted
4. Start making gestures to control your robot!

## Model Information

The project uses a custom machine learning model trained with Google's Teachable Machine. The model is hosted at: `https://teachablemachine.withgoogle.com/models/Viz2emg4J/`

## Hardware Requirements

- Webcam
- Compatible robot connected via USB serial port
- Modern web browser with WebGL support

## Created By

Lina Lopes - [Website](https://www.linalopes.info/) | [Instagram](https://www.instagram.com/lilo.think)

## License

This project is open source and available under the Creative Commons Attribution-ShareAlike 4.0 International License.