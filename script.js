// What features do I need?
// - Keep track of game: 9 units, that the players can use, a variable that tracks the users actions
        //X - the gameboard can be a IIFE 
        //X - do it in the gameboard object
        //x - gameboard needs a method to set the marks (where to implement which user/mark gets set, in game board object or the game controller?)
        // - Feature: check if the selected tile is free to play, implement in gameboard object or rather in the gamecontroller> i think rather in the geame controller 
// - 

const gameBoard = (function(){
    // let Status = new Array(9).fill('');
    let Status = Array.from({ length: 3 }, () => Array(3).fill(''));

    const resetBoard = () => {Status = Array.from({ length: 3 }, () => Array(3).fill(''))}
    const setMark = (mark, tileI, tileJ) => {
        // // Check if selected tile is free
        // if (tileNr!=''){
        //     console.warn('Pick another tile, this one is already taken!');
            
        // }
        // else{
            Status[tileI][tileJ]=mark
        // }
    };
    return {Status, setMark, resetBoard}

})();

const gameController = (function(){
    let activePlayer

    const playGame = () => {
      
      gameBoard.resetBoard()

      while(gameController.checkStatus(gameBoard)==false && gameController.countRound(gameBoard)<10){
        
      // User selects action> get input from user which tile is selcted
      // input need from GUI: selected tiles
        let tileI = prompt("What is tile row number?")
        let tileJ = prompt("What is tile column number?")
        gameBoard.setMark(gameController.setActivePlayer(),tileI,tileJ)

        if (gameController.checkStatus(gameBoard)=='X'){
          return ('The winner is X')
        } 
        else if (gameController.checkStatus(gameBoard)=='X'){
          return ('The winner is O')
        }
        console.log(gameBoard.Status)
        
      }
      return  "It's a draw!"
    }

    const rollFirstPlayer = (user1, user2) => {
        let firstPlayer
        randomNum = Math.random() < 0.5 ? 0 : 1;
        if (randomNum == 0){
            user1.playersOrder = 'X'
            user2.playersOrder = 'O'
            firstPlayer = user1.playerName

        }
        else{
            user1.playersOrder = 'O'
            user2.playersOrder = 'X' 
            firstPlayer = user2.playerName
        }
        return `The first player is ${firstPlayer}`

    }

    const setActivePlayer = () => {
        // let activePlayer
        

        if (gameController.countRound(gameBoard)==0){
          activePlayer = 'X'  
        }
        else if (activePlayer =='X'){
            activePlayer = 'O'
        }
        else if (activePlayer =='O'){
            activePlayer = 'X'
        }
        return activePlayer
    }
        
    const countRound = (gameBoard) => {
        let count = 0;
        for (let row of gameBoard.Status) {
          for (let cell of row) {
            if (cell !== '') {
              count++;
            }
          }
        }
            return count;
      }
    const checkStatus = (gameBoard) =>  {
          
        for (let i = 0; i < 3; i++) {
            if (gameBoard.Status[i][0] !== '' && gameBoard.Status[i][0] === gameBoard.Status[i][1] && gameBoard.Status[i][1] === gameBoard.Status[i][2]) {
              return gameBoard.Status[i][0];
            }
          }
        
          // Check columns
        for (let j = 0; j < 3; j++) {
            if (gameBoard.Status[0][j] !== '' && gameBoard.Status[0][j] === gameBoard.Status[1][j] && gameBoard.Status[1][j] === gameBoard.Status[2][j]) {
              return gameBoard.Status[0][j];
            }
          }
        
          // Check diagonals
        if (
            gameBoard.Status[0][0] !== '' &&
            gameBoard.Status[0][0] === gameBoard.Status[1][1] &&
            gameBoard.Status[1][1] === gameBoard.Status[2][2]
          ) {
            return gameBoard.Status[0][0];
          }
        
        if (
            gameBoard.Status[0][2] !== '' &&
            gameBoard.Status[0][2] === gameBoard.Status[1][1] &&
            gameBoard.Status[1][1] === gameBoard.Status[2][0]
          ) {
            return gameBoard.Status[0][2];
          }
        
          // No winner
          return false
        }
    return {checkStatus, countRound, rollFirstPlayer, setActivePlayer, playGame}

})();

// function createGameboard (name) {
//     let gameBoard = new Array(9).fill('');

//     const setMark = (mark, tileNr) => {
//         // Check if selected tile is free
//         if (tileNr!=''){
//             console.warn('Pick another tile, this one is already taken!');
            
//         }
//         else{
//             gameBoard[tileNr]=mark
//         }
//     };

// }

function createPlayer(name){
    const playerName = name;
    let playersOrder
    return {playerName, playersOrder}

}