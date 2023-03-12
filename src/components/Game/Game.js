import React, { useRef, useEffect } from 'react';
import './Game.css';

function Game() {
  const worldRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tileSize = 40;
      const { top, left } = worldRef.current.getBoundingClientRect();
      const { clientWidth, clientHeight } = document.documentElement;
    
      let x = left;
      let y = top;
    
      if (event.key === 'ArrowUp') {
        y += tileSize / 2;
        x -= tileSize / 2;
      } else if (event.key === 'ArrowDown') {
        y -= tileSize / 2;
        x += tileSize / 2;
      } else if (event.key === 'ArrowLeft') {
        y -= tileSize / 2;
        x -= tileSize / 2;
      } else if (event.key === 'ArrowRight') {
        y += tileSize / 2;
        x += tileSize / 2;
      }
    
      worldRef.current.style.transform = `translate(${x}px, ${y}px)`;
    
      // Keep the game world within the bounds of the viewport
      const { top: newTop, left: newLeft } = worldRef.current.getBoundingClientRect();
      if (newTop < 0 || newTop + clientHeight > window.innerHeight || newLeft < 0 || newLeft + clientWidth > window.innerWidth) {
        worldRef.current.style.transform = `translate(${left}px, ${top}px)`;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const rows = Array.from({ length: 100 }, (_, rowIndex) => {
    const tiles = Array.from({ length: 100 }, (_, colIndex) => {
      const type = getTileType(rowIndex, colIndex);
      return <div key={`${rowIndex}-${colIndex}`} className={`Tile Tile-${type}`} />;
    });
    return <div key={rowIndex} className="Row">{tiles}</div>;
  });

  function getTileType(row, col) {
    if (row === 50 && col === 50) {
      return 'player';
    }
    if (row % 2 === 0 && col % 2 === 0) {
      return 'grass';
    } else if (row % 3 === 0 && col % 3 === 0) {
      return 'water';
    } else {
      return 'stone';
    }
  }

  return (
    <div className="Game">
      <div className="WorldWrapper">
        <div className="World" ref={worldRef}>
          {rows}
        </div>
      </div>
    </div>
  );
}

export default Game;
