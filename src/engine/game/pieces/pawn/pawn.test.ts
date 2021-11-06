import { Color, Piece, PieceType } from "../../../constants";
import {
  isInitialSquare,
  nextAdvanceSquareForPawn,
  nextDoubleAdvanceSquareForPawn
} from "./pawn";

const whitePiece: Piece = {
  color: Color.White,
  piece: PieceType.Pawn
};
const blackPiece: Piece = {
  color: Color.Black,
  piece: PieceType.Pawn
};

describe("isInitialSquare({ piece: { color }, top })", () => {
  const whitePiece: Piece = {
    color: Color.White,
    piece: PieceType.Pawn
  };
  const blackPiece: Piece = {
    color: Color.Black,
    piece: PieceType.Pawn
  };
  test("With white piece and second line square returns true", () => {
    expect(
      isInitialSquare({ piece: whitePiece, top: 1, left: 0 })
    ).toBeTruthy();
  });
  test("With black piece and second line square returns false", () => {
    expect(
      isInitialSquare({ piece: blackPiece, top: 1, left: 0 })
    ).not.toBeTruthy();
  });
  test("With white piece and line seven square returns false", () => {
    expect(
      isInitialSquare({ piece: whitePiece, top: 6, left: 0 })
    ).not.toBeTruthy();
  });
  test("With black piece and line seven square returns false", () => {
    expect(
      isInitialSquare({ piece: blackPiece, top: 6, left: 0 })
    ).toBeTruthy();
  });
});
describe("nextAdvanceSquareForPawn({ top, piece })", () => {
  test("With white piece and line 0 square returns 1", () => {
    expect(
      nextAdvanceSquareForPawn({ left: 0, top: 0, piece: whitePiece })
    ).toEqual(1);
  });
  test("With white piece and line 8 throw exception", () => {
    expect(() =>
      nextAdvanceSquareForPawn({ left: 0, top: 7, piece: whitePiece })
    ).toThrow();
  });
  test("With black piece and line 7 square returns 6", () => {
    expect(
      nextAdvanceSquareForPawn({ left: 0, top: 7, piece: blackPiece })
    ).toEqual(6);
  });
  test("With black piece and line 0 throw exception", () => {
    expect(() =>
      nextAdvanceSquareForPawn({ left: 0, top: 0, piece: blackPiece })
    ).toThrow();
  });
});
describe("nextDoubleAdvanceSquareForPawn({ top, piece })", () => {
  test("With white piece returns 3", () => {
    expect(
      nextDoubleAdvanceSquareForPawn({ left: 0, top: 0, piece: whitePiece })
    ).toEqual(3);
  });
  test("With black piece returns 4", () => {
    expect(
      nextDoubleAdvanceSquareForPawn({ left: 0, top: 0, piece: blackPiece })
    ).toEqual(4);
  });
});
