"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from 'framer-motion'
import xImage from "/x.png";
import oImage from "/o.png";

export default function xoGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(Math.random() < 0.5);
  const [userSymbol, setUserSymbol] = useState(Math.random() < 0.5 ? `X` : "O");
  const [gameStatus, setGameStatus] = useState("playing");
  const [gameCount, setGameCount] = useState(0);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const { data: session } = useSession();
const [userStats, setUserStats] = useState({ chancesLeft: 0, xoWins: 0, points: 0 });


useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await fetch("/api/getuser", { method: "GET" });
        if (!res.ok) {
          throw new Error("Failed to fetch user stats");
        }
        const data = await res.json();
        setUserStats(data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    if (session?.user) fetchUserStats();
  }, [session]);


  useEffect(() => {
    if (!isUserTurn && gameStatus === "playing" && gameCount < 3) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isUserTurn, gameStatus, gameCount]);


  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
    //   const [winner] = result;
    //   if (winner === userSymbol) {
    //     setGameStatus("won");
    //     updateGameStats("win");
    //   } else {
    //     setGameStatus("lost");
    //     updateGameStats("lose");
    const [winner, line] = result;
    if (winner && winner === userSymbol) { // Ensure winner is not null
      setGameStatus("won");
      updateGameStats("win");
    } else if (winner) {
      setGameStatus("lost");
      updateGameStats("lose");
    }
    } else if (board.every((square) => square !== null)) {
      setGameStatus("draw");
      updateGameStats("draw");
    }
  }, [board]);

  const updateGameStats = async (result: string) => {
    await fetch("/api/useractions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result })
    });

    // Refresh stats
    const res = await fetch("/api/getuser");
    const data = await res.json();
    setUserStats(data);

    resetAfterDelay();
  };


//   useEffect(() => {
//     const result = calculateWinner(board);
//     if (result) {
//       const [winner, line] = result;
//       setWinningLine(line);
//       if (winner === userSymbol) {
//         setGameStatus("won");
//         setGameCount(prevCount => prevCount + 1);
//       } else {
//         setGameStatus("lost");
//         setGameCount(prevCount => prevCount + 1);
//       }
//       resetAfterDelay();
//     } else if (board.every((square) => square !== null)) {
//       setGameStatus("draw");
//       resetAfterDelay();
//     }
//   }, [board, userSymbol]);

//   function handleClick(index: number) {
//     if (board[index] || !isUserTurn || gameStatus !== "playing" || gameCount >= 3) return;
//     const newBoard = [...board];
//     newBoard[index] = userSymbol;
//     setBoard(newBoard);
//     setIsUserTurn(false);
//   }

function handleClick(index: number) {
    if (!userStats.chancesLeft) {
      alert("No chances left to play!");
      return;
    }
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

    // Introduce a 50% chance of making a suboptimal move
    if (Math.random() < 0.5) {
      bestMove = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    }

    const newBoard = [...board];
    newBoard[bestMove] = userSymbol === "X" ? "O" : "X";
    setBoard(newBoard);
    setIsUserTurn(true);
  }

  function minimax(board: (string | null)[], depth: number, isMaximizing: boolean): number {
    const result = calculateWinner(board);
    if (result) {
      const [winner] = result;
      return winner === (userSymbol === "X" ? "O" : "X") ? 10 - depth : depth - 10;
    }
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
      if (gameCount < 3) {
        setBoard(Array(9).fill(null));
        setIsUserTurn(Math.random() < 0.5);
        setUserSymbol(Math.random() < 0.5 ? "X" : "O");
        setGameStatus("playing");
        setWinningLine(null);
      }
    }, 2000);
  }

  function calculateWinner(board: (string | null)[]): [string, number[]] | null {
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
        return [board[a]!, line];
      }
    }
    return null;
  }

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h2>
//       <div className="grid grid-cols-3 gap-2">
//         {board.map((value, index) => (
//           <button
//             key={index}
//             onClick={() => handleClick(index)}
//             className={`w-16 h-16 flex items-center justify-center text-2xl font-bold hover:bg-gray-100
//               ${value === userSymbol ? 'text-blue-500' : 'text-red-500'}
//               ${winningLine?.includes(index)
//                 ? 'border-4 border-yellow-400'
//                 : 'border-2 border-gray-300'
//               }`}
//             disabled={!isUserTurn || gameStatus !== "playing" || gameCount >= 3}
//           >
//             {value}
//           </button>
//         ))}
//       </div>
//       <div className="mt-4 text-center">
//         {gameStatus === "playing" && gameCount < 3 && (
//           <p className="text-gray-700">
//             {isUserTurn ? "Your turn" : "AI is thinking..."}
//           </p>
//         )}
//         {gameStatus === "won" && (
//           <p className="text-green-500 font-semibold">You have won! 🎉</p>
//         )}
//         {gameStatus === "lost" && (
//           <p className="text-red-500 font-semibold">You have lost! 😢</p>
//         )}
//         {gameStatus === "draw" && (
//           <p className="text-blue-500 font-semibold">It's a draw! 🤝</p>
//         )}
//         {gameCount >= 3 && (
//           <p className="text-purple-500 font-semibold mt-2">Game over! You've played 3 times.</p>
//         )}
//         <p className="text-gray-600 mt-2">Games played: {gameCount}/10</p>
//         <div className="mt-4">
//   <p>Chances Left: {userStats.chancesLeft}</p>
//   <p>Points: {userStats.points}</p>
//   <p>Wins: {userStats.xoWins}</p>
// </div>

//       </div>
//     </div>
//   );
return (
    <div className="flex flex-col items-center p-0">
      <div className="grid grid-cols-3 gap-2 mb-4 h-fit w-fit bg-[#050d25e2] p-4 rounded-[15px]">
        {board.map((value, index) => (
         <motion.button
          key={index}
          onClick={() => handleClick(index)}
          className={`size-20 border border-slate-800 flex items-center justify-center text-2xl font-bold rounded-lg
            ${value === userSymbol ? 'bg-[#3956c8] text-white' : value ? 'bg-red-500 text-white' : 'bg-transparent'}
            ${winningLine?.includes(index) ? 'ring-4 ring-green-400' : ''}
            ${!value ? 'hover:bg-[#3956c8]/50' : ''}`}
          disabled={!isUserTurn || gameStatus !== "playing" || gameCount >= 3}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
            {value === "X" && (
              <img src="/x.png" alt="X" className="size-10 object-contain" />
            )}
            {value === "O" && (
              <img src="/o.png" alt="O" className="size-10 object-contain" />
            )}
        </motion.button>
        ))}
      </div>
      <div className="text-center">
        {gameStatus === "playing" && gameCount < 3 && (
          <p className="text-lg font-semibold mb-2">
            {isUserTurn ? "Your turn" : "AI is thinking..."}
          </p>
        )}
        {gameStatus === "won" && (
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[18px] font-bold text-green-500 mb-2"
          >
            You have won! 🎉
            <br/> +100 Points
          </motion.p>
        )}
        {gameStatus === "lost" && (
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[18px] font-bold text-red-500 mb-2"
          >
            You have lost! 🤣
          </motion.p>
        )}
        {gameStatus === "draw" && (
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[18px] font-bold text-blue-500 mb-2"
          >
            It's a draw (You're Lucky)! 😉
          </motion.p>
        )}
        {gameCount === 10 && (
          <p className="text-lg font-semibold text-purple-500 mb-2">Game over! You've played 10 times.</p>
        )}
        <p className="text-gray-600 mb-4">Games played: {gameCount}/10</p>
        <div className="space-y-2">
          {/* <p>You have {userStats.chancesLeft} chances left</p>
          <p>Points: {userStats.points}</p>
          <p>Wins: {userStats.xoWins}</p>
          <p> */}

          {/* </p> */}
        </div>
      </div>
    </div>
  )
}
