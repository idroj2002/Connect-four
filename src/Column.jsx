import { useState } from 'react'
import { Cell } from './Cell.jsx'

export function Column({ rows, column, onClick }) {
  let cells = [];
  let restantCells = [...column];

  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  for (let i = 0; i < rows; i++) {
    if (restantCells.length == 0) {
        cells.unshift(<Cell key={`${i}`} isHover={hovered} />);
    }
    else if (restantCells.length > 0 && restantCells[0] == 'red') {
        cells.unshift(<Cell key={`${i}`} color='red' isHover={hovered} />);
        restantCells.shift();
    }
    else if (restantCells.length > 0 && restantCells[0] == 'yellow') {
        cells.unshift(<Cell key={`${i}`} color='yellow' isHover={hovered} />);
        restantCells.shift();
    }
    else {
        console.log(`Incorrect condition in Column component: length: ${restantCells.length}, rows-1-i: ${rows-1-i}, value: ${restantCells[rows-1-i]}`);
    }
  }

  return (
    <div className='column' onClick={ onClick } onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      { cells }
    </div>
  )
}