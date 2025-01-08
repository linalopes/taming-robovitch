let classifier;
let video;
let label = "";
let lastCommand = ""; // Stores the last command sent
let confidence = 0;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/Viz2emg4J/";
let serial;
let portName = '/dev/tty.usbmodem101';
let lastSentTime = 0; // Timestamp for send control
let sendDelay = 500; // Minimum delay between sends in milliseconds

function preload() {
  ml5.setBackend('webgl');
  classifier = ml5.imageClassifier(imageModelURL + "model.json", {
    flipped: true,
  }, modelLoaded);
}


// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('video-container');

  // Video capture
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Serial configuration
  serial = new p5.SerialPort();
  serial.open(portName); 
  serial.on("open", () => console.log("Serial Port Opened"));
  serial.on("error", (err) => console.error("Serial Error: ", err));
  serial.on("data", (data) => {
    console.log("Data Received: ", data);
  });

  // Start classification
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  // Converts RGB format to hexadecimal in p5.js
  const cssColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--bs-turquoise')
   fill(cssColor); 
  textSize(32);
  text("Label: " + label, 20, 50);
  text("Confidence: " + nf(confidence * 100, 2, 2) + "%", 20, 90);
}

function gotResult(results) {
  if (results && results.length > 0) {
    label = results[0].label;
    confidence = results[0].confidence;

    let command = "";

    if (confidence > 0.85) {
      if (label === "neutral") command = "0";
      else if (label === "noPose") command = "1";
      else if (label === "curious") command = "2";

    }

    // Prevents too frequent and duplicate sending
    let currentTime = millis();
    if (command !== lastCommand && command !== "" && currentTime - lastSentTime > sendDelay) {
      serial.write(str(command + '\n')); // Adds the newline delimiter
      console.log(`Sent Command: ${command}`);
      lastCommand = command;
      lastSentTime = currentTime;
    }
  }
  classifyVideo();
}
