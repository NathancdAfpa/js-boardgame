function createTable(size, cellSize) {
    let table = document.createElement('table');
    for (let i = 0; i < size; ++i) {
      const row = table.insertRow();
      for (let j = 0; j < size; ++j) {
        let cell = row.insertCell();
        cell.id = `(${i}, ${j})`;
        cell.classList.add('cell');
        cell.style.height = `${cellSize}px`;
        cell.style.width = `${cellSize}px`;
        cell.style.border = "1px solid rgb(120, 120, 120)";
  
        if (i === 0 && j === 0) {
          cell.style.borderTopLeftRadius = "5px";
        } else if (i === 0 && j === size - 1) {
          cell.style.borderTopRightRadius = "5px";
        } else if (i === size - 1 && j === 0) {
          cell.style.borderBottomLeftRadius = "5px";
        } else if (i === size - 1 && j === size - 1) {
          cell.style.borderBottomRightRadius = "5px";
        }
      }
    }
  
    table.style.backgroundColor = "white";
    table.style.borderSpacing = "0px";
    table.style.borderRadius = "5px";
    return table;
  }
  
  window.addEventListener('DOMContentLoaded', function () {
    var cells = document.querySelectorAll('.cell');
    var gameLost = false;
    var gameWon = false; // Variable pour suivre l'état de la victoire du jeu
  
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    function handleCellMouseover() {
      if (!gameLost && !gameWon) {
        var randomColor = getRandomColor();
        if (this.style.backgroundColor !== "") {
          gameLost = true;
          displayGameOverMessage();
        } else {
          this.style.backgroundColor = randomColor;
          checkGameWon(); // Vérifier si le joueur a gagné après avoir coloré la case
        }
      }
    }
  
    function displayGameOverMessage() {
        var messageElement = document.createElement('p');
        messageElement.textContent = "Vous avez perdu !";
        messageElement.classList.add('game-over');
      
        var restartButton = document.createElement('button');
        restartButton.textContent = "Rejouer";
        restartButton.addEventListener('click', restartGame);
      
        var containerElement = document.createElement('div');
        containerElement.classList.add('message-container');
        containerElement.appendChild(messageElement);
        containerElement.appendChild(restartButton);
      
        var contentElement = document.querySelector("#subcontent");
        contentElement.appendChild(containerElement);
      }
      
      function displayGameWonMessage() {
        var messageElement = document.createElement('p');
        messageElement.textContent = "Vous avez gagné !";
        messageElement.classList.add('game-won');
      
        var restartButton = document.createElement('button');
        restartButton.textContent = "Rejouer";
        restartButton.addEventListener('click', restartGame);
      
        var containerElement = document.createElement('div');
        containerElement.classList.add('message-container');
        containerElement.appendChild(messageElement);
        containerElement.appendChild(restartButton);
      
        var contentElement = document.querySelector("#subcontent");
        contentElement.appendChild(containerElement);
      }
      
      
  
    function restartGame() {
      gameLost = false;
      gameWon = false;
      var messageElement = document.querySelector("#subcontent p");
      var restartButton = document.querySelector("#subcontent button");
      messageElement.remove();
      restartButton.remove();
      cells.forEach(function (cell) {
        cell.style.backgroundColor = "";
      });
    }
  
    function checkGameWon() {
      var allCellsColored = true;
      cells.forEach(function (cell) {
        if (cell.style.backgroundColor === "") {
          allCellsColored = false;
          return;
        }
      });
  
      if (allCellsColored) {
        gameWon = true;
        displayGameWonMessage();
      }
    }
  
    cells.forEach(function (cell) {
      cell.addEventListener('mouseover', handleCellMouseover);
    });
  });
  
  let contentElement = document.querySelector("#subcontent");
  contentElement.appendChild(createTable(9, 50));
  