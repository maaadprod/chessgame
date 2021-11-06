import {
  Board,
  Color,
  PieceSquare,
  Move,
  BoardLimits
} from "../../../constants";
import { boardIndex } from "../../../utils";
import { compose } from "ramda";
import { availableMovesToCheck } from "./movesCheck";
import { GameDataForMove } from "./types";
import { MoveResult } from "../types";

export const isInitialSquare = ({ piece: { color }, top }: PieceSquare) =>
  (color === Color.White && top === 1) || (color === Color.Black && top === 6);

export const nextAdvanceSquareForPawn = ({
  top,
  piece
}: PieceSquare): number => {
  if (
    (piece.color === Color.White && top >= BoardLimits.Top) ||
    (piece.color === Color.Black && top <= BoardLimits.Bottom)
  ) {
    throw Error("Current value out of the limit of the board");
  }
  return piece.color === Color.Black ? top - 1 : top + 1;
};

export const nextDoubleAdvanceSquareForPawn = (square: PieceSquare): number =>
  square.piece.color === Color.Black ? 4 : 3;

export const currentGameDataForMove = (
  board: Board,
  square: PieceSquare
): GameDataForMove => {
  const oldPosition = square;
  const { left, piece } = square;

  // Natural moves
  const nextAdvanceSquareForCurrentPawn = nextAdvanceSquareForPawn(square);
  const nextSquare = board[boardIndex(left, nextAdvanceSquareForCurrentPawn)];

  return {
    square,
    nextSquare,
    piece,
    board,
    left,
    nextAdvanceSquareForCurrentPawn,
    oldPosition
  };
};

export const availableMoves = (data: GameDataForMove): MoveResult[] =>
  availableMovesToCheck.map((v) => v(data));

const validMoves = (availableMovesList: MoveResult[]): Move[] =>
  availableMovesList.filter((v): v is Move => v !== null);

export const moves = compose(
  validMoves,
  availableMoves,
  currentGameDataForMove
);
