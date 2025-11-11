import { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./utils";

interface HistoryEntry {
  squares: (string | null)[];
  location: { row: number; col: number } | null;
}

function Game() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(
    nextSquares: (string | null)[],
    location: { row: number; col: number }
  ) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handleReset() {
    setHistory([{ squares: Array(9).fill(null), location: null }]);
    setCurrentMove(0);
  }

  // Create moves array
  const moves = history.map((step, move) => {
    let description: string;
    let shortDescription: string;
    if (move > 0 && step.location) {
      const { row, col } = step.location;
      description = `Go to move #${move} (row: ${row}, col: ${col})`;
      shortDescription = `Move #${move} (${row},${col})`;
    } else {
      description = "Go to game start";
      shortDescription = "Game start";
    }

    // Check if this is the current move
    const isCurrentMove = move === currentMove;

    return (
      <li key={move} className="shrink-0">
        {isCurrentMove ? (
          <div className="py-2 px-2.5 sm:py-2.5 sm:px-3 bg-primary-500 text-white rounded-md text-xs sm:text-sm font-medium shadow-sm border border-primary-600 flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shrink-0"></div>
            <span className="truncate">
              {move > 0 ? `You are at move #${move}` : "You are at game start"}
            </span>
          </div>
        ) : (
          <button
            className="w-full py-1.5 px-2 sm:py-2 sm:px-3 bg-gray-50 border border-gray-200 rounded-md cursor-pointer text-xs sm:text-sm transition-all duration-200 ease-in-out text-left hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 active:scale-[0.98] text-gray-700 font-normal shadow-sm"
            onClick={() => jumpTo(move)}
            title={description}
          >
            <span className="hidden sm:inline">{description}</span>
            <span className="sm:hidden">{shortDescription}</span>
          </button>
        )}
      </li>
    );
  });

  // Sort moves based on toggle - reverse array order when descending
  const displayedMoves = isAscending ? moves : [...moves].reverse();

  const { winningLine } = calculateWinner(currentSquares);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[900px] min-h-[500px] max-h-[95vh] sm:max-h-[90vh] sm:h-[650px] flex flex-col overflow-hidden border border-gray-100 mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-primary-600 shrink-0">
        <h1 className="text-xl sm:text-2xl text-white font-bold tracking-tight">
          Tic-Tac-Toe
        </h1>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md active:scale-95 backdrop-blur-sm"
          title="Reset Game"
          aria-label="Reset Game"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden min-[375px]:inline">New Game</span>
          <span className="min-[375px]:hidden">New</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 p-2 sm:p-3 md:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-6 overflow-hidden">
        {/* Game Board Section */}
        <div className="flex-shrink-0 w-full lg:w-[380px] xl:w-[400px] flex flex-col min-h-0">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winningLine={winningLine}
          />
        </div>

        {/* Move History Section */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-gray-50 rounded-xl border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3 shrink-0">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Move History
            </h2>
            <button
              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 active:scale-95 shadow-sm flex items-center gap-1 sm:gap-1.5"
              onClick={() => setIsAscending(!isAscending)}
            >
              {isAscending ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <span className="hidden sm:inline">Ascending</span>
                  <span className="sm:hidden">Asc</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="hidden sm:inline">Descending</span>
                  <span className="sm:hidden">Desc</span>
                </>
              )}
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col bg-white rounded-lg border border-gray-200">
            <ol
              className="flex-1 overflow-y-auto p-2 sm:p-3 m-0 space-y-1.5 sm:space-y-2 scroll-smooth flex flex-col"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#cbd5e1 #f1f5f9",
              }}
            >
              {displayedMoves}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
