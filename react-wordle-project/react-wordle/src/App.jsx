import { useCallback, useEffect, useMemo, useState } from "react";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import GameModal from "./components/GameModal";
import { SOLUTIONS, VALID_GUESSES } from "./words";
import { buildKeyboardStatus, evaluateGuess } from "./gameLogic";

function getRandomSolution() {
  return SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];
}

export default function App() {
  const [solutionWord, setSolutionWord] = useState(getRandomSolution);
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");
  const [message, setMessage] = useState("");

  const results = useMemo(
    () => pastGuesses.map((guess) => evaluateGuess(guess, solutionWord)),
    [pastGuesses, solutionWord]
  );

  const keyStatuses = useMemo(
    () => buildKeyboardStatus(pastGuesses, solutionWord),
    [pastGuesses, solutionWord]
  );

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "BACKSPACE" || key === "Backspace") {
      setCurrentGuess((previous) => previous.slice(0, -1));
      setMessage("");
      return;
    }

    if (key === "ENTER" || key === "Enter") {
      if (currentGuess.length !== 5) {
        setMessage("Your guess must contain 5 letters.");
        return;
      }

      if (!VALID_GUESSES.has(currentGuess)) {
        setMessage("That word is not in the word list.");
        return;
      }

      const updatedGuesses = [...pastGuesses, currentGuess];
      setPastGuesses(updatedGuesses);
      setCurrentGuess("");
      setMessage("");

      if (currentGuess === solutionWord) {
        setGameStatus("WON");
      } else if (updatedGuesses.length === 6) {
        setGameStatus("LOST");
      }
      return;
    }

    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((previous) => (previous + key.toUpperCase()).slice(0, 5));
      setMessage("");
    }
  }, [currentGuess, gameStatus, pastGuesses, solutionWord]);

 
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey || event.altKey || event.metaKey) return;
      if (event.key === "Backspace" || event.key === "Enter" || /^[a-zA-Z]$/.test(event.key)) {
        event.preventDefault();
        handleKeyPress(event.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  function restartGame() {
    let nextSolution = getRandomSolution();
    if (SOLUTIONS.length > 1) {
      while (nextSolution === solutionWord) nextSolution = getRandomSolution();
    }
    setSolutionWord(nextSolution);
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setMessage("");
  }

  return (
    <main className="app">
      <header className="header">
        <h1>WORDLE</h1>
        <p>Guess the five-letter word in six tries.</p>
      </header>

      <div className="game-content">
        <div className="status-area" aria-live="polite">
          {message || " "}
        </div>

        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          results={results}
        />

        <Keyboard onKeyPress={handleKeyPress} keyStatuses={keyStatuses} />

        <p className="helper-text">
          Use your keyboard or click the letters below. Press Enter to submit.
        </p>
      </div>

      <GameModal
        status={gameStatus}
        solution={solutionWord}
        onRestart={restartGame}
      />
    </main>
  );
}
