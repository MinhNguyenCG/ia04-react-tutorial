import Square from "./Square";
import { calculateWinner } from "./utils";

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (
    nextSquares: (string | null)[],
    location: { row: number; col: number }
  ) => void;
  winningLine: number[] | null;
}

function Board({ xIsNext, squares, onPlay, winningLine }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // Calculate row and col (1-indexed)
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;

    onPlay(nextSquares, { row, col });
  }

  const { winner } = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every((square) => square !== null)) {
    status = "Result: Draw";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  // Generate board with loops
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const i = row * 3 + col;
      const isWinningSquare = winningLine !== null && winningLine.includes(i);
      squaresInRow.push(
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isWinningSquare={isWinningSquare}
        />
      );
    }
    boardRows.push(
      <div
        key={row}
        className="after:clear-both after:content-[''] after:table"
      >
        {squaresInRow}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Status Bar */}
      <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm shrink-0">
        <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 text-center truncate px-1">
          {status}
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center min-h-0 overflow-auto py-1">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-gray-200 shrink-0">
          {boardRows}
        </div>
      </div>
    </div>
  );
}

export default Board;
