import { Cell } from './Cell.jsx'

export function Column({ rows, column, onClick }) {
  let cells = [];
  let restantCells = [...column];

  for (let i = 0; i < rows; i++) {
    if (restantCells.length == 0) {
        cells.unshift(<Cell key={`${i}`} />);
    }
    else if (restantCells.length > 0 && restantCells[0] == 'red') {
        cells.unshift(<Cell key={`${i}`} color='red' />);
        restantCells.shift();
    }
    else if (restantCells.length > 0 && restantCells[0] == 'yellow') {
        cells.unshift(<Cell key={`${i}`} color='yellow' />);
        restantCells.shift();
    }
    else {
        console.log(`Incorrect condition in Column component: length: ${restantCells.length}, rows-1-i: ${rows-1-i}, value: ${restantCells[rows-1-i]}`);
    }
  }

  return (
    <div className='column' onClick={ onClick }>
      { cells }
    </div>
  )
}