import { Board, PieceSquare, Piece, BoardSquare } from "../../../constants";
export enum Flank {
  Left,
  Right
}

export interface GameDataForMove {
  square: PieceSquare;
  nextSquare: BoardSquare;
  piece: Piece;
  board: Board;
  left: number;
  nextAdvanceSquareForCurrentPawn: number;
  oldPosition: PieceSquare;
}
