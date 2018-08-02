# Brainbox - working with real device

Logic gates are the basic building blocks of any digital system. It is an electronic circuit having one or 
more than one input and only one output. The relationship between the input and the output is based on a 
certain logic. Based on this, logic gates are named as AND gate, OR gate, NOT gate etc.

Now you can  edit and run your digital circuit simulation designs online on PCs, Macs, thin clients, tablets, smart 
phones, smart TVs and e-book readers without any installation. You can use **DigitalTrainingStudio** in the office, 
classroom or at home and connect even your RaspberryPi to drive real physical devices.

(*Extended Demo project for the [draw2d.js](http://www.draw2d.org) library which shows how to connect the browser with 
a node.js server on raspberry Pi or just your local computer.*)

![image](resources/animation.gif)



# How to install and use it
You have different options to use the brainbox.


## Desktop
You can install the application even in your local intranet for training purpose. Just install and run the backend 
server (to store and load the circuit files) on every computer which can run a simple node.js server. 

```
npm install -g brainbox
```


## Raspberry Pi
You have **full access to the `GPIO`** pins on you RaspberryPi with the browser based digital circuit simulator. If 
node.js already running on your raspi you need just to install the simulator 
like on your desktop

```
npm install -g brainbox
```

and start the server with `brainbox`. The server reports the URL how to connect to 
your RaspberryPi with the browser.

See the running example on YouTube: [https://www.youtube.com/watch?v=fUkAIjTaNXI](https://www.youtube.com/watch?v=fUkAIjTaNXI)

###The simulation circuit
![image](assets/readme_gpio_dts.png?raw=true)

### connect a real LED to your GPIO pin 3
You find a lot of documentation how to connect a simple LED to your raspi. A good source is always the web page of 
the original [raspberry pi organisation](https://www.raspberrypi.org/documentation/usage/gpio/)

Now you can start the simulation in your browser and the LED connecte to the GPIO(3) lights up
if you press the button in your simulator.




# Feel free to clone and and run it
I develop the project with `yarn` to build my webpack. 
YARN runs on Node.js, so if you don't have npm installed already, go ahead and install it.

### Install dependencies with npm

```
npm install
```

### Run the backend server
``` 
node ./app/backend/index.js
```

### Run the webpack builder in *dev* mode
open a second console and run

``` 
yarn dev
```

