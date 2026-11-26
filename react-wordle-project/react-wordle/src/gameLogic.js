export function evaluateGuess(guess, solution) {
  const result = Array(5).fill("absent");
  const remaining = solution.split("");

  for (let i = 0; i < 5; i += 1) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
      remaining[i] = null;
    }
  }

  for (let i = 0; i < 5; i += 1) {
    if (result[i] === "correct") continue;

    const matchingIndex = remaining.indexOf(guess[i]);
    if (matchingIndex !== -1) {
      result[i] = "present";
      remaining[matchingIndex] = null;
    }
  }

  return result;
}

export function buildKeyboardStatus(guesses, solution) {
  const priority = { absent: 1, present: 2, correct: 3 };
  const statuses = {};

  guesses.forEach((guess) => {
    const results = evaluateGuess(guess, solution);
    guess.split("").forEach((letter, index) => {
      const nextStatus = results[index];
      const currentStatus = statuses[letter];

      if (!currentStatus || priority[nextStatus] > priority[currentStatus]) {
        statuses[letter] = nextStatus;
      }
    });
  });

  return statuses;
}
