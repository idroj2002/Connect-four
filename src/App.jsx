import { useState } from 'react'
import './App.css'
import { Column } from './Column.jsx'
import { Cell } from './Cell.jsx'

export function App() {

  const COLUMNS = 7;
  const ROWS = 6;

  const [position, setPosition] = useState(Array.from({ length: COLUMNS }, () => []));
  const [nextMovement, setNextMovement] = useState('red');
  const [winner, setWinner] = useState();

  const handleClick = (column) => {
    let newPosition = [...position];
    newPosition[column].push(nextMovement);
    setPosition(newPosition);
    if (nextMovement == 'red') {
      setNextMovement('yellow');
    } else {
      setNextMovement('red');
    }

    checkWinCondition(column, newPosition[column].length - 1);
  }

  const winHandle = (colorOfWinner) => {
    setWinner(colorOfWinner);
    console.log(winner);
  }

  const checkWinCondition = (column, row) => {
    let colorToCheck = position[column][row];
    
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
    } else if (column < COLUMNS - 3 && checkTwoAtRight(column, row, colorToCheck) && position[column + 3][row]) {
      winHandle(colorToCheck);
      return;
    }

    // Check vertical
    let cellsTogether = 0;
    position[column].forEach(cell => {
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
    columns.push(<Column rows={ROWS} column={position[i]} key={i} onClick={() => handleClick(i)} />);
  }

  let titleText;
  if (winner) {
    titleText = `<span class=${winner}-text><b>${winner}&nbsp;</b></span> win!`
  } else {
    titleText = `Turn of <span class=${nextMovement}-text><b>&nbsp;${nextMovement}&nbsp;</b></span> player`;
  }

  return (
    <>
      <h1 className="title" dangerouslySetInnerHTML={{ __html: titleText }}></h1>

      <div className='board'>
        { columns }
      </div>
    </>
  )
}
