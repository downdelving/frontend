import React, { useRef, useEffect, useState } from 'react';
import './Game.css';
import { World } from 'components/World';

// Generate a set of chunks for the game world.
// 
// numChunksX: The number of chunks in the X direction
// numChunksY: The number of chunks in the Y direction
// tileCount: The number of tiles in each chunk (along each axis)
// startingColors: An array of starting colors for the chunks
function generateChunks(numChunksX, numChunksY, tileCount, startingColors) {
  const chunks = {};

  for (let x = 0; x < numChunksX; x++) {
    for (let y = 0; y < numChunksY; y++) {
      const tiles = [];

      // Calculate the starting color for this chunk based on the X and Y coordinates
      const startingColorIndex = (x + y) % startingColors.length;
      const startingColor = startingColors[startingColorIndex];
      const r = parseInt(startingColor.substr(1, 2), 16);
      const g = parseInt(startingColor.substr(3, 2), 16);
      const b = parseInt(startingColor.substr(5, 2), 16);
      const colorStep = 255 / (tileCount - 1);
      const className = "Tile";

      for (let i = 0; i < tileCount; i++) {
        for (let j = 0; j < tileCount; j++) {
          // Calculate the color for this tile based on the i and j coordinates
          const color = `rgb(${Math.round(r - colorStep * i)}, ${Math.round(g - colorStep * (i + j) / 2)}, ${Math.round(b - colorStep * j)})`;
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
  const playerX = 36;
  const playerY = 92;
  const chunks = generateChunks(32, 32, chunkSize, [
    "#ff0000", "#00ff00", "#0000ff",
    "#ffff00", "#00ffff", "#ff00ff",
    "#ff8000", "#0080ff", "#8000ff",
  ]);
  const playerStartPosition = {
    x: playerX,
    y: playerY,
    i: 0,
    j: 0,
  };
  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      console.log("ArrowUp", offsetX, offsetY);
      setOffsetX(offsetX - 1);
      setOffsetY(offsetY - 1);
    } else if (event.key === "ArrowDown") {
      console.log("ArrowDown", offsetX, offsetY);
      setOffsetX(offsetX + 1);
      setOffsetY(offsetY + 1);
    } else if (event.key === "ArrowLeft") {
      console.log("ArrowLeft", offsetX, offsetY);
      setOffsetX(offsetX - 1);
      setOffsetY(offsetY + 1);
    } else if (event.key === "ArrowRight") {
      console.log("ArrowRight", offsetX, offsetY);
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
