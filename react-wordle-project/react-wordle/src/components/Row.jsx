import Tile from "./Tile";

export default function Row({ guess = "", result = [], isCurrent = false }) {
  return (
    <div className="board-row">
      {Array.from({ length: 5 }, (_, index) => (
        <Tile
          key={index}
          letter={guess[index] || ""}
          status={result[index] || ""}
          active={isCurrent}
        />
      ))}
    </div>
  );
}
