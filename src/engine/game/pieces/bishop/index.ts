import { Board, PieceSquare } from "../../../constants";
import { boardIndex } from "../../../utils";
import { MoveResult } from "../types";

export enum BishopDiagonal {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight
}
export const boardLimits = {
  [BishopDiagonal.TopLeft]: { top: 7, left: 0 },
  [BishopDiagonal.TopRight]: { top: 7, left: 7 },
  [BishopDiagonal.BottomLeft]: { top: 0, left: 0 },
  [BishopDiagonal.BottomRight]: { top: 0, left: 7 }
};
export const diagonalSteps = {
  [BishopDiagonal.TopLeft]: { top: 1, left: -1 },
  [BishopDiagonal.TopRight]: { top: 1, left: 1 },
  [BishopDiagonal.BottomLeft]: { top: -1, left: -1 },
  [BishopDiagonal.BottomRight]: { top: -1, left: 1 }
};

const indexOutOfLimits = (
  top: number,
  left: number,
  limit: any,
  diagonal: BishopDiagonal
) => {
  const isTopLimit =
    diagonal === BishopDiagonal.TopLeft || diagonal === BishopDiagonal.TopRight;
  const isLeftLimit =
    diagonal === BishopDiagonal.TopLeft ||
    diagonal === BishopDiagonal.BottomLeft;
  if (
    (top < limit.top && !isTopLimit) ||
    (top > limit.top && isTopLimit) ||
    (left < limit.left && isLeftLimit) ||
    (left > limit.left && !isLeftLimit)
  ) {
    return true;
  }
  return false;
};

export const diagonalAvailableMovements = (diagonal: BishopDiagonal) => (
  board: Board,
  square: PieceSquare
): MoveResult[] => {
  const limit = boardLimits[diagonal];
  const step = diagonalSteps[diagonal];
  const { left, top, piece } = square;
  let currentLeft = left;
  let currentTop = top;
  let searching = true;
  const moves: MoveResult[] = [];
  while (searching) {
    currentLeft = currentLeft + step.left;
    currentTop = currentTop + step.top;
    if (indexOutOfLimits(currentTop, currentLeft, limit, diagonal)) {
      searching = false;
    } else {
      const squareInfo = board[boardIndex(currentLeft, currentTop)];
      const moveObject = {
        piece,
        top: currentTop,
        left: currentLeft,
        oldPosition: square
      };
      if (!squareInfo.piece) {
        moves.push({
          ...moveObject,
          capture: false
        });
      } else if (squareInfo.piece?.color === piece.color) {
        searching = false;
      } else {
        moves.push({
          ...moveObject,
          capture: true
        });
        searching = false;
      }
    }
  }

  return moves;
};
export const bishopMoves = (board: Board, square: PieceSquare): MoveResult[] =>
  [
    diagonalAvailableMovements(BishopDiagonal.BottomLeft),
    diagonalAvailableMovements(BishopDiagonal.BottomRight),
    diagonalAvailableMovements(BishopDiagonal.TopLeft),
    diagonalAvailableMovements(BishopDiagonal.TopRight)
  ].flatMap((f) => f(board, square));
