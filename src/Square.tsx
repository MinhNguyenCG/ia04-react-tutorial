interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare: boolean;
}

function Square({ value, onSquareClick, isWinningSquare }: SquareProps) {
  return (
    <button
      className={`
        float-left font-extrabold
        h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24
        -mr-px -mt-px p-0 text-center cursor-pointer 
        text-3xl sm:text-4xl md:text-5xl
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
        touch-manipulation
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
      aria-label={value ? `Square with ${value}` : "Empty square"}
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
