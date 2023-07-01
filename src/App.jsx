import { useState } from 'react'
import './App.css'
import { Column } from './Column.jsx'

export function App() {

  const COLUMNS = 7;
  const ROWS = 6;

  const [position, setPosition] = useState(Array.from({ length: COLUMNS }, () => []));
  const [nextMovement, setNextMovement] = useState('red');
  const [currentWinner, setCurrentWinner] = useState();
  const [winner, setWinner] = useState();
  const [history, setHistory] = useState([[...position]]);
  const [currentMovement, setCurrentMovement] = useState(0);

  const handleClick = (column) => {
    let newPosition = position.map(subarray => [...subarray]);
    if (newPosition[column].length < ROWS) {

      if (currentWinner) {
        return;
      }

      if (currentMovement + 1 < history.length) {
        setWinner();
      }

      let newHistory = [...history.slice(0, currentMovement + 1)];

      newPosition[column].push(nextMovement);
      setPosition(newPosition);

      if(!newHistory) {
        newHistory = [...history];
      }
      newHistory.push(newPosition);
      
      setHistory(newHistory);
  
      setCurrentMovement(currentMovement + 1);
      checkWinCondition(column, newPosition[column].length - 1, nextMovement);

      if (nextMovement == 'red') {
        setNextMovement('yellow');
      } else {
        setNextMovement('red');
      }
    }
  }

  const winHandle = (colorOfWinner) => {
    setCurrentWinner(colorOfWinner);
  }

  const checkWinCondition = (column, row, colorToCheck) => {
    // Check horizontal
    if (column > 2 && position[column - 3][row] == colorToCheck) {
      if (checkTwoAtLeft (column, row, colorToCheck)) {
        winHandle(colorToCheck);
        return;
      }
    } else if (column > 1 && column < COLUMNS - 1 && checkTwoAtLeft(column, row, colorToCheck) && position[column + 1][row] == colorToCheck) {
      winHandle(colorToCheck);
      return;
    } else if (column > 0 && column < COLUMNS - 2 && position[column - 1][row] == colorToCheck && checkTwoAtRight(column, row, colorToCheck)) {
      winHandle(colorToCheck);
      return;
    } else if (column < COLUMNS - 3 && checkTwoAtRight(column, row, colorToCheck) && position[column + 3][row] == colorToCheck) {
      winHandle(colorToCheck);
      return;
    }

    // Check vertical
    let cellsTogether = 0;
    let columnToEvaluate = position[column].slice();
    columnToEvaluate[row] = colorToCheck;
    columnToEvaluate.forEach(cell => {
      if (cell == colorToCheck) cellsTogether++; else cellsTogether = 0;
      if (cellsTogether == 4) {
        winHandle(colorToCheck);
        return;
      }
    })

    // Check down to up diagonal
    if (column > 2 && row > 2 && position[column - 3][row - 3] == colorToCheck) {
      if (checkTwoAtLeftDown(column, row, colorToCheck)) {
        winHandle(colorToCheck);
        return;
      }
    } else if (column > 1 && column < COLUMNS - 1 && row > 1 && row < ROWS - 1 && checkTwoAtLeftDown(column, row, colorToCheck) && position[column + 1][row + 1] == colorToCheck) {
      winHandle(colorToCheck);
      return;
    } else if (column > 0 && column < COLUMNS - 2 && row > 0 && row < ROWS - 2 && position[column - 1][row - 1] == colorToCheck && checkTwoAtRightUp(column, row, colorToCheck)) {
      winHandle(colorToCheck);
      return;
    } else if (column < COLUMNS - 3 && row < ROWS - 3 && checkTwoAtRightUp(column, row, colorToCheck) && position[column + 3][row + 3] == colorToCheck) {
      winHandle(colorToCheck);
      return;
    }

    // Check up to down diagonal
    if (column > 2 && row < ROWS - 3 && position[column - 3][row + 3] == colorToCheck) {
      if (checkTwoAtLeftUp(column, row, colorToCheck)) {
        winHandle(colorToCheck);
        return;
      }
    } else if (column > 1 && column < COLUMNS - 1 && row > 0 && row < ROWS - 2 && checkTwoAtLeftUp(column, row, colorToCheck) && position[column + 1][row - 1] == colorToCheck) {
      winHandle(colorToCheck);
      return;
    } else if (column > 0 && column < COLUMNS - 2 && row > 1 && row < ROWS - 1 && position[column - 1][row + 1] == colorToCheck && checkTwoAtRightDown(column, row, colorToCheck)) {
      winHandle(colorToCheck);
      return;
    } else if (column < COLUMNS - 3 && row > 2 && checkTwoAtRightDown(column, row, colorToCheck) && position[column + 3][row - 3] == colorToCheck) {
      winHandle(colorToCheck);
      return;
    }
  }

  const checkTwoAtLeft  = (column, row, colorToCheck) => {
    if (position[column - 2][row] == colorToCheck) {
      return position[column - 1][row] == colorToCheck;
    }
    return false;
  }

  const checkTwoAtRight  = (column, row, colorToCheck) => {
    if (position[column + 2][row] == colorToCheck) {
      return position[column + 1][row] == colorToCheck;
    }
    return false;
  }

  const checkTwoAtLeftDown  = (column, row, colorToCheck) => {
    if (position[column - 2][row - 2] == colorToCheck) {
      return position[column - 1][row - 1] == colorToCheck;
    }
    return false;
  }

  const checkTwoAtLeftUp  = (column, row, colorToCheck) => {
    if (position[column - 2][row + 2] == colorToCheck) {
      return position[column - 1][row + 1] == colorToCheck;
    }
    return false;
  }

  const checkTwoAtRightDown  = (column, row, colorToCheck) => {
    if (position[column + 2][row - 2] == colorToCheck) {
      return position[column + 1][row - 1] == colorToCheck;
    }
    return false;
  }

  const checkTwoAtRightUp  = (column, row, colorToCheck) => {
    if (position[column + 2][row + 2] == colorToCheck) {
      return position[column + 1][row + 1] == colorToCheck;
    }
    return false;
  }

  let columns = [];
  for (let i = 0; i < COLUMNS; i++) {
    columns.push(<Column rows={ROWS} column={position[i]} key={i} className='me-auto' onClick={() => handleClick(i)} />);
  }

  let titleText;
  if (currentWinner) {
    titleText = `<span class='${currentWinner}-text'><b>${currentWinner}&nbsp;</b></span> win!`
  } else {
    titleText = `Turn of <span class='${nextMovement}-text'><b>&nbsp;${nextMovement}&nbsp;</b></span> player`;
  }

  const movements = history.map((position, move) => {
    let description = move == 0 ? "Go to game start" : `Go to movement #${move}`;

    return(
      <li key={move}>
        <button className='historyButton btn' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  const jumpTo = (move) => {
    if (move < history.length - 1) {
      if (currentWinner != null) {
        setWinner(currentWinner);
      }
      setCurrentWinner();
    } else {
      setCurrentWinner(winner);
    }

    setCurrentMovement(move);
    if (move % 2 == 0) {
      setNextMovement('red');
    } else {
      setNextMovement('yellow');
    }
    setPosition(history[move]);
  }

  return (
    <div className='row d-flex'>
      <div className='completeBoard col-sm-12 col-md-8 col-lg-6 d-flex flex-column align-items-sm-center align-items-md-end align-items-lg-end'>
        <h1 className='title d-flex justify-content-center' style={{ '--columns': COLUMNS }} dangerouslySetInnerHTML={{ __html: titleText }}></h1>

        <div className='board d-flex justify-content-center' style={{ '--columns': COLUMNS }}>
          { columns }
        </div>
      </div>

      <div className='historyContainer col d-flex justify-content-sm-center justify-content-md-start justify-content-lg-start'>
        <div className='history ms-5'>
          <ol>
            { movements }
          </ol>
        </div>
      </div>
    </div>
  )
}
