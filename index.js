// Foram criadas arrays para declarar todos os movimentos possíveis do cavalo e o tabuleiro de 8x8 com o valor '0' em cada célula
const moveY = [-2, -1, 1, 2, 2, 1, -1, -2];
const moveX = [1, 2, 2, 1, -1, -2, -2, -1];

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

// Constantes para criar o tabuleiro no html, selecionando todas as '<tr>' e transformando em array e uma constante para selecionar o valor da célula do tabuleiro declarada no input do html.
const tables = document.querySelectorAll('tr');
const arrayTables = [...tables];
const boardOnScreen = arrayTables.map((item) => item.children);

const input = document.querySelector('#cell');

// Função para validar as casas possíveis para o cavalo andar: sendo menor que 8, maior ou igual a 0 e que seja diferente de 0
const validateMove = (bo, col, row) => {
  if (row < 8 && row >= 0 && col < 8 && col >= 0 && bo[col][row] === 0) {
    return true;
  }
};

// Função para movimentar o cavalo, com o máximo de movimento igual a 65. Loop para atribuir novos valores do eixo X e Y e se for validado, será igual ao valor do contador, e se o valor final for verdadeiro, o valor da célula mudará para o contador, se não, continuará sendo 0.
const solve = (bo, col, row, counter) => {
  for (let i = 0; i < 8; i++) {
    if (counter >= 65) {
      return true;
    } else {
      new_y = col + moveY[i];
      new_x = row + moveX[i];
    }
    if (validateMove(bo, new_y, new_x)) {
      bo[new_y][new_x] = counter;

      if (solve(bo, new_y, new_x, counter + 1)) {
        return true;
      } else {
        bo[new_y][new_x] = 0;
        return counter;
      }
    }
  }
};

// Função para selecionar o valor do input (onclick="getMovement()"), atribuir todos os movimentos possíveis a partir da célula selecionada e salvar no localStorage
const getMovement = () => {
  boardOnScreen.forEach((row) => {
    for (let i = 0; i < 8; i++) {
      if (row[i].id === input.value.toLowerCase()) {
        const indexRow = boardOnScreen.indexOf(row);

        const firstMoveScrn = (boardOnScreen[indexRow][i].innerHTML = '');
        const firstMoveBoard = (board[indexRow][i] = 1);
        solve(board, indexRow, i, 2);

        const data = { firstMoveScrn, firstMoveBoard, board };

        localStorage.setItem('data', JSON.stringify(data));
      }
    }
  });
};

// Selecionar objeto armazenado no localStorage
const getSolve = JSON.parse(localStorage.getItem('data'));

// Levar os valores dos movimentos salvos no localStorage para o HTML e console
if (localStorage.length > 0) {
  getSolve.board.forEach((row) => {
    for (let i = 0; i < 8; i++) {
      if (row[i] != 0) {
        const indexRow = getSolve.board.indexOf(row);
        console.log(boardOnScreen[indexRow][i].outerHTML.substring(8, 10));
        boardOnScreen[indexRow][i].innerHTML = row[i];
      }
    }
  });
}

localStorage.clear();
console.log('Digite uma casa no input da tela');
