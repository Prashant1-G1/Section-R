export default function GameModal({ status, solution, onRestart }) {
  if (status === "IN_PROGRESS") return null;

  const won = status === "WON";

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="result-title">
        <h2 id="result-title">{won ? "You got it!" : "Game over"}</h2>
        <p>{won ? "Excellent work. You found the word." : "Better luck next time!"}</p>
        <p>The word was <strong>{solution}</strong>.</p>
        <button className="restart-button" onClick={onRestart}>Play again</button>
      </section>
    </div>
  );
}
