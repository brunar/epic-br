'use client';
import { useEffect, useReducer } from 'react';
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

type GameAction =
  | { type: 'SELECT_SQUARE'; index: number }
  | { type: 'SELECT_STEP'; step: number }
  | { type: 'RESTART' };

function gameStateReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case 'SELECT_SQUARE': {
      const { index } = action;
      const currentSquares = state.history[state.currentStep];
      const winner = calculateWinner(currentSquares);

      if (winner || currentSquares[index]) return state; // if has a winner or already a value in that square return same state, so this means It won't re-render because the state didn't change

      const { currentStep, history } = state;
      const newHistory = history.slice(0, currentStep + 1);
      const nextValue = calculateNextValue(currentSquares);
      const squares = history[currentStep].with(index, nextValue);

      return {
        currentStep: newHistory.length,
        history: [...newHistory, squares],
      };
      break;
    }

    case 'SELECT_STEP': {
      const { step } = action;
      return {
        ...state,
        currentStep: step,
      };
      break;
    }

    case 'RESTART': {
      return defaultState;
      break;
    }
  }
}

function getInitialGameState() {
  let localStorageValue;
  try {
    localStorageValue = JSON.parse(
      window.localStorage.getItem(localStorageKey) ?? 'null'
    );
  } catch {
    // something is wrong in localStorage, so don't use it
  }
  return isValidGameState(localStorageValue) ? localStorageValue : defaultState;
}

export default function TicTacToe() {
  const [state, dispatch] = useReducer(
    gameStateReducer,
    null,
    getInitialGameState
  );

  const currentSquares = state.history[state.currentStep];

  const winner = calculateWinner(currentSquares);
  const nextValue = calculateNextValue(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  function selectSquare(index: number) {
    dispatch({ type: 'SELECT_SQUARE', index });
  }
  function restart() {
    dispatch({ type: 'RESTART' });
  }

  const moves = state.history.map((_stepSquares, step) => {
    const desc = step ? `Go to move #${step}` : 'Go to game start';
    const isCurrentStep = step === state.currentStep;

    return (
      <li key={step} className="my-2">
        <button
          disabled={isCurrentStep}
          onClick={() => dispatch({ type: 'SELECT_STEP', step })}
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
