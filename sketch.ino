int pushButton = 2;

// the setup routine runs once when you press reset:
void setup()
{
    // initialize serial communication at 9600 bits per second:
    Serial.begin(9600);

    // make the pushbutton's pin an input:
    pinMode(pushButton, INPUT);
}

// the loop routine runs over and over again forever:
void loop()
{
    // read the input pin:
    int buttonState = digitalRead(pushButton);
    if (buttonState)
    {
        // print out the state of the button:
        Serial.println(buttonState); // 1 is on (pushed), 0 is off
    }
    delay(10);
    // delay in between reads for stability (1000 = 1 second).
}