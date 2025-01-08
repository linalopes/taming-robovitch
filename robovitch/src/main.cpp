#include <Arduino.h>
#include <Servo.h>

Servo servoBase;  // Servo 1
Servo servoWhite; // Servo 2
Servo servoBlack; // Servo 3

const int startPosition = 90; // Initial position of the servos
char inputBuffer[10];         // Buffer to read data from the serial
char command;                 // Command for the servos

void setup() {
  Serial.begin(9600); // Initializes the serial port

  // Configures the servos
  servoBase.attach(9);
  servoBase.write(startPosition);
  servoWhite.attach(10);
  servoWhite.write(startPosition);
  servoBlack.attach(11);
  servoBlack.write(180 - startPosition);

  Serial.println("Arduino Ready");
}

// Function for the neutral pose
void neutralPose() {
  Serial.println("Neutral Pose");
  servoBase.write(startPosition);
  servoWhite.write(startPosition);
  servoBlack.write(180 - startPosition);
  delay(300);
}

// Function for the pose "No"
void noPose() {
  Serial.println("No Pose");
  servoBase.write(60);
  delay(300);
  servoBase.write(120);
  delay(300);
}

// Function for the pose "Shy"
void shyPose() {
  Serial.println("Shy Pose");
  for (int angle = 0; angle <= 120; angle += 2) {
    servoWhite.write(angle);
    servoBlack.write(180 - angle);
    delay(20);
  }
  for (int angle = 120; angle >= 0; angle -= 2) {
    servoWhite.write(angle);
    servoBlack.write(180 - angle);
    delay(20);
  }
}

// Function for the pose "Curious"
void curiousPose() {
  Serial.println("Curious Pose");
  servoWhite.write(150);
  delay(300);
  servoWhite.write(50);
  delay(300);
}

void loop() {
  // Robust data reading from Serial
  if (Serial.available() > 0) {
    int bytesRead = Serial.readBytesUntil('\n', inputBuffer, sizeof(inputBuffer) - 1);
    inputBuffer[bytesRead] = '\0'; // Adds string terminator
    command = inputBuffer[0];      // Gets the first received character

    // Debug: shows the received command
    Serial.print("Received Command: ");
    Serial.println(command);

    // Executes the corresponding function
    switch (command) {
      case '0':
        neutralPose();
        break;
      case '1':
        noPose();
        break;
      case '2':
        curiousPose();
        break;
      case '3':
        shyPose();
        break;
      default:
        Serial.println("Invalid Command");
        break;
    }
  }
}

