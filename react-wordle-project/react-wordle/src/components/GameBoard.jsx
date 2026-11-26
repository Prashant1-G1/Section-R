import Row from "./Row";

export default function GameBoard({ pastGuesses, currentGuess, results }) {
  return (
    <section className="game-board" aria-label="Wordle game board">
      {Array.from({ length: 6 }, (_, rowIndex) => {
        const isSubmitted = rowIndex < pastGuesses.length;
        const isCurrent = rowIndex === pastGuesses.length;

        return (
          <Row
            key={rowIndex}
            guess={
              isSubmitted
                ? pastGuesses[rowIndex]
                : isCurrent
                  ? currentGuess
                  : ""
            }
            result={isSubmitted ? results[rowIndex] : []}
            isCurrent={isCurrent}
          />
        );
      })}
    </section>
  );
}
