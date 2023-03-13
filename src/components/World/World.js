import React, { useRef, useEffect, useState } from 'react';
import './World.css';
import { Chunk } from 'components/Chunk';

function World({chunkSize, tileSize, chunks, playerStartPosition, offsetX, offsetY }) {
  const [playerPosition, setPlayerPosition] = useState(playerStartPosition);
  const worldRef = useRef(null);

  // Calculate the position of the visible chunks based on the player's position
  const visibleChunks = calculateVisibleChunks(playerPosition, chunkSize, tileSize);

  useEffect(() => {
    const el = worldRef.current;
    el.style.setProperty('--offset-x', offsetX);
    el.style.setProperty('--offset-y', offsetY);
  }, [offsetX, offsetY]);

  return (
    <div data-testid="world" className="World" ref={worldRef}>
      OMG
      {Object.keys(chunks).map(chunkKey => {
        const chunk = chunks[chunkKey];
        const [chunkX, chunkY] = chunkKey.split(",").map(Number);
        const transformX = (chunkX - playerPosition.x) * (chunkSize * tileSize);
        const transformY = (chunkY - playerPosition.y) * (chunkSize * tileSize);
        const transform = `translate(${transformX}px, ${transformY}px)`;

        // Only render the chunk if it is within the visible range
        if (visibleChunks.includes(chunkKey)) {
          console.log(`Retaining chunk ${chunkKey}`);
          return (
            <div key={chunkKey} className="Chunk" style={{ transform }}>
              <Chunk 
                x={chunkX}
                y={chunkY}
                tiles={chunk} 
                chunkSize={chunkSize} 
                tileSize={tileSize} 
              />
            </div>
          );
        } else {
          // Unload the chunk if it is outside of the visible range
          unloadChunk(chunkKey);
          return null;
        }
      })}
    </div>
  );

}

// Calculate the visible chunks based on the player's position
function calculateVisibleChunks(playerPosition, chunkSize, tileSize) {
  const visibleChunks = [];
  const widthChunks = Math.ceil(window.innerWidth / (chunkSize * tileSize));
  const heightChunks = Math.ceil(window.innerHeight / (chunkSize * tileSize));
  console.log('widthChunks', widthChunks);
  console.log('heightChunks', heightChunks);

  // Calculate the range of chunk coordinates that are visible
  const startChunkX = playerPosition.x - Math.ceil(widthChunks / 2) - 1;
  const endChunkX = playerPosition.x + Math.ceil(widthChunks / 2) + 1;
  const startChunkY = playerPosition.y - Math.ceil(heightChunks / 2) - 1;
  const endChunkY = playerPosition.y + Math.ceil(heightChunks / 2) + 1;

  console.log('startChunkX', startChunkX);
  console.log('endChunkX', endChunkX);
  console.log('startChunkY', startChunkY);
  console.log('endChunkY', endChunkY);

  // Add each chunk within the visible range to the visibleChunks array
  for (let x = startChunkX; x <= endChunkX; x++) {
    for (let y = startChunkY; y <= endChunkY; y++) {
      visibleChunks.push(`${x},${y}`);
    }
  }

  return visibleChunks;
}

// Unload a chunk from memory.
// This is a placeholder function that does nothing.
function unloadChunk(chunkKey) {
  console.log(`Unloading chunk ${chunkKey}`);
}

export default World;
