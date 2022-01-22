# Pong JS

## Setup

### Single Player
1. Clone the Repository
2. Go to Cloned Repository folder and install dependencies with `npm i`
3. Make a copy of the .env copy file and add in DB information.
4. Go into frontend and start up frontend with `npm start`.
5. Go to localhost:3000 Grab a friend and play offline mode

Single player mode allows users to play to 5 points, and timer set to 3 minutes. Player One uses WASD keys and Player Two uses 8456 keys to control their paddles. Pong Game was created with HTML canvas and simple ball collision physics were implemented allowing users to aim their shots.

After game is done, users are allowed to play again or exit game. After each game is ended, the match data is sent to Express.js back end (managed with Mongo DB) to store data. Recent match data below the game is updated in real time after each match is completed (pulls that last 10 most recent matches). 

### Browser Based Multiplayer (WIP)
Online multiplayer browser mode is still a WIP. Will use websockets and more to set up browser based multiplayer system. 


### Screenshots
!["GameMode"](https://github.com/Aman-Hundal/PongJS/blob/main/docs/gameMode.png?raw=true)
!["PlayEntry"](https://github.com/Aman-Hundal/PongJS/blob/main/docs/PlayerName.png?raw=true)
!["Start"](https://github.com/Aman-Hundal/PongJS/blob/main/docs/Start.png?raw=true)
!["Play"](https://github.com/Aman-Hundal/PongJS/blob/main/docs/Play.png?raw=true)
!["Winner"](https://github.com/Aman-Hundal/PongJS/blob/main/docs/gameOver.png?raw=true)
