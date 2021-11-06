import { Board, PieceSquare, PieceType } from "../../constants";
import { bishopMoves } from "./bishop";
import { moves as pawnMoves } from "./pawn/pawn";
import { MoveResult } from "./types";
import { knightMoves } from "./knight";

export const availableMoves = (
  board: Board,
  square: PieceSquare
): MoveResult[] => {
  switch (square.piece.piece) {
    case PieceType.Pawn:
      return pawnMoves(board, square);
    case PieceType.Bishop:
      return bishopMoves(board, square);
    case PieceType.Knight:
      return knightMoves(board, square);
    default:
      return [];
  }
};
