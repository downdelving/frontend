import React from "react";
import { Tile } from "components/Tile";

function Chunk({ x, y, tileCount, tileSize, tiles }) {
  const style = {
    position: "absolute",
    left: x * tileSize * tileCount,
    top: y * tileSize * tileCount,
    width: tileSize,
    height: tileSize,
  };
  return (
    <div data-testid={`chunk_${x}_${y}`} key={`${x},${y}`} className="Chunk" style={style}>
      {tiles.map((tile, index) => (
        <Tile key={`${x},${y},${tile.i},${tile.j}`} tileSize={tileSize} {...tile} />
      ))}
    </div>
  );
}

export default Chunk;
