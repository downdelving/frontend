import React from "react";
import "./Tile.css";

function Tile({ x, y, i, j, tileSize, className, color }) {
  const style = {
    width: "100%",
    height: "100%",
    left: i * tileSize,
    top: j * tileSize,
    backgroundColor: color,
  };
  return (<div data-testid={`Tile_${x}_${y}_${i}_${j}`} className={className} style={style} />);
}

export default Tile;
