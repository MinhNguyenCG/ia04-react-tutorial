interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare: boolean;
}

function Square({ value, onSquareClick, isWinningSquare }: SquareProps) {
  return (
    <button
      className={`
        float-left text-5xl font-extrabold
        h-24 -mr-px -mt-px p-0 text-center w-24 cursor-pointer 
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
        ${
          isWinningSquare
            ? "bg-green-400 border-[3px] border-green-600 text-green-900 shadow-xl scale-105 z-10 ring-2 ring-green-500"
            : value
            ? "bg-white border-2 border-gray-300 cursor-not-allowed"
            : "bg-white border-2 border-gray-300 hover:bg-primary-50 hover:border-primary-400 hover:shadow-lg active:scale-95"
        }
      `}
      onClick={onSquareClick}
      disabled={!!value || isWinningSquare}
    >
      <span
        className={
          value === "X"
            ? "text-blue-600 drop-shadow-sm"
            : value === "O"
            ? "text-red-600 drop-shadow-sm"
            : ""
        }
      >
        {value}
      </span>
    </button>
  );
}

export default Square;
