import React, { useRef, useEffect, useState } from 'react';
import './Game.css';
import { World } from 'components/World';

// Generate a set of chunks for the game world.
// 
// numChunksX: The number of chunks in the X direction
// numChunksY: The number of chunks in the Y direction
// tileCount: The number of tiles in each chunk (along each axis)
function generateChunks(numChunksX, numChunksY, tileCount) {
  const chunks = {};

  for (let x = 0; x < numChunksX; x++) {
    for (let y = 0; y < numChunksY; y++) {
      const tiles = [];

      const className = "Tile";
      let color;
      for (let i = 0; i < tileCount; i++) {
        for (let j = 0; j < tileCount; j++) {
          if (i === 0 || j === 0 || i === tileCount - 1 || j === tileCount - 1) {
            // draw a border of rocks around the chunk
            color = "#4d4d4d";
          } else {
            const tileType = Math.floor(Math.random() * 5);
            if (tileType === 0) {
              color = "#1b5e20"; // dark green for grass
            } else if (tileType === 1) {
              color = "#2c7bb6"; // blue for water
            } else if (tileType === 2) {
              color = "#d8d8d8"; // light gray for stone
            } else if (tileType === 3) {
              color = "#bfa345"; // sand color
            } else {
              color = "#3c3c3c"; // dark gray for dirt
            }
          }

          tiles.push({ 
            className,
            x,
            y,
            i,
            j,
            color,
          });
        }
      }

      const chunkKey = `${x},${y}`;
      chunks[chunkKey] = tiles;
    }
  }

  return chunks;
}

// The Game component is the main game component.
// It contains the game world.
function Game() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const chunkSize = 16;
  const tileSize = 16;
  const playerX = 2;
  const playerY = 3;
  const chunks = generateChunks(32, 32, chunkSize);
  const playerStartPosition = {
    x: playerX,
    y: playerY,
    i: 0,
    j: 0,
  };
  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      setOffsetX(offsetX - 1);
      setOffsetY(offsetY - 1);
    } else if (event.key === "ArrowDown") {
      setOffsetX(offsetX + 1);
      setOffsetY(offsetY + 1);
    } else if (event.key === "ArrowLeft") {
      setOffsetX(offsetX - 1);
      setOffsetY(offsetY + 1);
    } else if (event.key === "ArrowRight") {
      setOffsetX(offsetX + 1);
      setOffsetY(offsetY - 1);
    }
  }
  return (
    <div data-testid="game" onKeyDown={handleKeyDown} className="Game" tabIndex="0">
      <World 
        chunkSize={chunkSize} 
        tileSize={tileSize} 
        chunks={chunks} 
        playerStartPosition={playerStartPosition}
        offsetX={offsetX}
        offsetY={offsetY}
      />
    </div>
  );
}

export default Game;
