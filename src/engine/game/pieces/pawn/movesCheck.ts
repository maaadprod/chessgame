import { Flank, GameDataForMove, MoveResult } from "./types";
import { BoardLimits } from "../../../constants";
import { boardIndex } from "../../../utils";
import { isInitialSquare, nextDoubleAdvanceSquareForPawn } from "./pawn";
const captureFlank = (flank: Flank) => ({
  piece,
  board,
  left,
  nextAdvanceSquareForCurrentPawn,
  oldPosition
}: GameDataForMove): MoveResult => {
  if (
    (flank === Flank.Left && left <= BoardLimits.Left) ||
    (flank === Flank.Right && left >= BoardLimits.Right)
  ) {
    return null;
  }
  const flankSquareAddIndex = flank === Flank.Left ? -1 : 1;
  const diagonalFlankSquare =
    board[
      boardIndex(left + flankSquareAddIndex, nextAdvanceSquareForCurrentPawn)
    ];
  if (
    diagonalFlankSquare &&
    diagonalFlankSquare.piece &&
    diagonalFlankSquare.piece.color !== piece.color
  ) {
    return {
      piece,
      left: left + flankSquareAddIndex,
      top: nextAdvanceSquareForCurrentPawn,
      capture: true,
      oldPosition
    };
  } else {
    return null;
  }
};

const moveOneStep = ({
  nextSquare,
  piece,
  left,
  nextAdvanceSquareForCurrentPawn,
  oldPosition
}: GameDataForMove): MoveResult =>
  !nextSquare || !nextSquare.piece
    ? { piece, left, top: nextAdvanceSquareForCurrentPawn, oldPosition }
    : null;

const moveTwoStep = ({
  nextSquare,
  square,
  piece,
  board,
  left,
  oldPosition
}: GameDataForMove): MoveResult => {
  const firstSquare = board[boardIndex(nextSquare.left, nextSquare.top)];
  if (!isInitialSquare(square) || firstSquare.piece) {
    return null;
  }
  const nextDoubleAdvanceSquareForCurrentPawn = nextDoubleAdvanceSquareForPawn(
    square
  );
  const nextDoubleSquare =
    board[boardIndex(left, nextDoubleAdvanceSquareForCurrentPawn)];
  return !nextDoubleSquare || !nextDoubleSquare.piece
    ? { piece, left, top: nextDoubleAdvanceSquareForCurrentPawn, oldPosition }
    : null;
};

const captureFlankRight = captureFlank(Flank.Right);
const captureFlankLeft = captureFlank(Flank.Left);

export const availableMovesToCheck = [
  moveOneStep,
  moveTwoStep,
  captureFlankLeft,
  captureFlankRight
];
