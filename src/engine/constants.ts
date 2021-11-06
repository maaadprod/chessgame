export enum PieceType {
  Pawn = 1,
  Knight = 2,
  Bishop = 3,
  Rook = 4,
  Queen = 5,
  King = 6
}
export enum PieceTypePuntuation {
  Pawn = 1,
  Knight = 3,
  Bishop = 3,
  Rook = 5,
  Queen = 9,
  King = 0
}
export enum Color {
  Black,
  White
}

export interface Piece {
  piece: PieceType;
  color: Color;
}
export interface Coordinates {
  left: number;
  top: number;
}

export interface BoardSquare extends Coordinates {
  piece?: Piece;
}

export interface PieceSquare extends BoardSquare {
  piece: Piece;
}

export type Board = Record<string, BoardSquare>;

export interface Move extends Coordinates {
  piece: Piece;
  capture?: boolean;
  oldPosition: PieceSquare;
}

export enum BoardLimits {
  Left = 0,
  Right = 7,
  Bottom = 0,
  Top = 7
}
