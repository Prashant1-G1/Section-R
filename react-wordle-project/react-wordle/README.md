# React Wordle Clone

A six-attempt, five-letter Wordle-style game built with React, Vite and CSS.

## Requirements
- Node.js (LTS recommended)
- npm

## Run locally
1. Extract the ZIP file.
2. Open the extracted `react-wordle` folder in VS Code.
3. Open the VS Code terminal.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
Run `npm run build`. Vite creates the production site in `dist/`.

## Project structure
- `src/App.jsx`: central state, keyboard input, submission and game-over logic
- `src/gameLogic.js`: duplicate-aware tile evaluation and keyboard status priority
- `src/words.js`: solution words and accepted guess words
- `src/components/GameBoard.jsx`: six-row board
- `src/components/Row.jsx`: five tiles per row
- `src/components/Tile.jsx`: individual letter tile
- `src/components/Keyboard.jsx`: clickable virtual keyboard
- `src/components/GameModal.jsx`: win/loss modal
- `src/styles.css`: layout and tile/key colors

## Important note about the word list
This self-contained assignment version uses a built-in sample dictionary in `src/words.js`.
Add words to `VALID_GUESSES` and `SOLUTIONS` to expand it. The game logic supports repeated letters correctly.
