"use client";

import { useState, useEffect } from "react";

export default function XoGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(Math.random() < 0.5);
  const [userSymbol, setUserSymbol] = useState(Math.random() < 0.5 ? "X" : "O");
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    if (!isUserTurn && gameStatus === "playing") {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isUserTurn, gameStatus]);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setGameStatus(winner === userSymbol ? "won" : "lost");
      resetAfterDelay();
    } else if (board.every((square) => square !== null)) {
      setGameStatus("draw");
      resetAfterDelay();
    }
  }, [board, userSymbol]);

  function handleClick(index: number) {
    if (board[index] || !isUserTurn || gameStatus !== "playing") return;
    const newBoard = [...board];
    newBoard[index] = userSymbol;
    setBoard(newBoard);
    setIsUserTurn(false);
  }

  function makeAIMove() {
    const availableSquares = board
      .map((square, index) => (square === null ? index : null))
      .filter((index): index is number => index !== null);

    if (availableSquares.length === 0) return;

    let bestMove = -1;
    let bestScore = -Infinity;

    for (const move of availableSquares) {
      const newBoard = [...board];
      newBoard[move] = userSymbol === "X" ? "O" : "X";
      const score = minimax(newBoard, 0, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    // Introduce a 45% chance of making a suboptimal move
    if (Math.random() < 0.45) {
      bestMove = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    }

    const newBoard = [...board];
    newBoard[bestMove] = userSymbol === "X" ? "O" : "X";
    setBoard(newBoard);
    setIsUserTurn(true);
  }

  function minimax(board: (string | null)[], depth: number, isMaximizing: boolean): number {
    const winner = calculateWinner(board);
    if (winner === (userSymbol === "X" ? "O" : "X")) return 10 - depth;
    if (winner === userSymbol) return depth - 10;
    if (board.every((square) => square !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = userSymbol === "X" ? "O" : "X";
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = userSymbol;
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function resetAfterDelay() {
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setIsUserTurn(Math.random() < 0.5);
      setUserSymbol(Math.random() < 0.5 ? "X" : "O");
      setGameStatus("playing");
    }, 2000);
  }

  function calculateWinner(board: (string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 text-2xl font-bold hover:bg-gray-100"
            disabled={!isUserTurn || gameStatus !== "playing"}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="mt-4 text-center">
        {gameStatus === "playing" && (
          <p className="text-gray-700">
            {isUserTurn ? "Your turn" : "AI is thinking..."}
          </p>
        )}
        {gameStatus === "won" && (
          <p className="text-green-500 font-semibold">You have won! 🎉</p>
        )}
        {gameStatus === "lost" && (
          <p className="text-red-500 font-semibold">You have lost! 😢</p>
        )}
        {gameStatus === "draw" && (
          <p className="text-blue-500 font-semibold">It's a draw! 🤝</p>
        )}
      </div>
    </div>
  );
}

