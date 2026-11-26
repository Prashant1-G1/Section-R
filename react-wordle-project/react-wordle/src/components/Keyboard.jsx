const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export default function Keyboard({ onKeyPress, keyStatuses }) {
  function renderKey(key) {
    const status = keyStatuses[key] || "";
    return (
      <button
        type="button"
        key={key}
        className={`key ${status}`}
        onClick={() => onKeyPress(key)}
        aria-label={key === "ENTER" ? "Enter" : key === "BACKSPACE" ? "Backspace" : key}
      >
        {key === "BACKSPACE" ? "⌫" : key}
      </button>
    );
  }

  return (
    <section className="keyboard" aria-label="On-screen keyboard">
      <div className="keyboard-row">
        {KEY_ROWS[0].split("").map(renderKey)}
      </div>
      <div className="keyboard-row">
        {KEY_ROWS[1].split("").map(renderKey)}
      </div>
      <div className="keyboard-row">
        {renderKey("ENTER")}
        {KEY_ROWS[2].split("").map(renderKey)}
        {renderKey("BACKSPACE")}
      </div>
    </section>
  );
}
