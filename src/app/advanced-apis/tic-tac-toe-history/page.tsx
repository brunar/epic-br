'use client';
import { useEffect, useState } from 'react';
import {
  calculateNextValue,
  calculateStatus,
  calculateWinner,
  isValidGameState,
  type GameState,
  type Squares,
} from '@/shared/tic-tac-toe-utils';

function Board({
  squares,
  onClick,
}: {
  squares: Squares;
  onClick: (index: number) => void;
}) {
  function renderSquare(i: number) {
    const value = squares[i];
    const label = value ? `square ${i}, ${value}` : `square ${i} empty`;

    return (
      <button className="square" onClick={() => onClick(i)} aria-label={label}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const defaultState: GameState = {
  history: [Array(9).fill(null)],
  currentStep: 0,
};

const localStorageKey = 'tic-tac-toe';

export default function TicTacToe() {
  const [state, setState] = useState<GameState>(() => {
    let localStorageValue;
    try {
      localStorageValue = JSON.parse(
        window.localStorage.getItem(localStorageKey) ?? 'null'
      );
    } catch {
      // something is wrong in localStorage, so don't use it
    }
    return isValidGameState(localStorageValue)
      ? localStorageValue
      : defaultState;
  });

  const currentSquares = state.history[state.currentStep];

  const winner = calculateWinner(currentSquares);
  const nextValue = calculateNextValue(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  function selectSquare(index: number) {
    if (winner || currentSquares[index]) return; // if has a winner or already a value in that square return null

    setState((previousState) => {
      const { currentStep, history } = previousState;
      const newHistory = history.slice(0, currentStep + 1);
      const squares = history[currentStep].with(index, nextValue);

      return {
        currentStep: newHistory.length,
        history: [...newHistory, squares],
      };
    });
  }

  function restart() {
    setState(defaultState);
  }

  const moves = state.history.map((_stepSquares, step) => {
    const desc = step ? `Go to move #${step}` : 'Go to game start';
    const isCurrentStep = step === state.currentStep;

    return (
      <li key={step} className="my-2">
        <button
          disabled={isCurrentStep}
          onClick={() =>
            setState((previousState) => ({
              ...previousState,
              currentStep: step,
            }))
          }
        >
          {desc} {isCurrentStep ? '(current)' : ''}
        </button>
      </li>
    );
  });

  return (
    <>
      <h2>Tic Tac Toe - useReducer Version</h2>
      <i className="text-gray-400 text-sm">
        (On console tab application to see local storage)
      </i>
      <div className="game">
        <div className="game-board">
          <Board onClick={selectSquare} squares={currentSquares} />
          <button className="restart" onClick={restart}>
            restart
          </button>
        </div>
        <div className="game-info">
          <div aria-live="polite">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
