import React, { useRef, useEffect, useState } from 'react';
import './World.css';
import { Chunk } from 'components/Chunk';

function World({chunkSize, tileSize, chunks, playerStartPosition, offsetX, offsetY }) {
  const worldRef = useRef(null);
  useEffect(() => {
    const el = worldRef.current;
    el.style.setProperty('--offset-x', offsetX);
    el.style.setProperty('--offset-y', offsetY);
    console.log("offsetX updated:", offsetX);
    console.log("offsetY updated:", offsetY);
  }, [offsetX, offsetY]);

  return (
    <div data-testid="world" className="World" ref={worldRef}>
      OMG
    </div>
  );

}

export default World;
