import { Board, Coordinates, Piece, PieceSquare } from "../../../constants";
import { boardIndex } from "../../../utils";

export const horseMovements: Coordinates[] = [
  { top: -1, left: -2 },
  { top: 1, left: -2 },
  { top: 2, left: -1 },
  { top: 2, left: 1 },
  { top: 1, left: 2 },
  { top: -1, left: 2 },
  { top: -2, left: 1 },
  { top: -2, left: -1 }
];

export const isCoordinateValid = (
  { top, left }: Coordinates,
  board: Board,
  piece: Piece
) => {
  if (top < 0 || left < 0 || top > 7 || left > 7) {
    return false;
  }
  const squareInfo = board[boardIndex(left, top)];
  if (squareInfo.piece?.color === piece.color) {
    return false;
  }
  return true;
};

export const knightMoves = (board: Board, square: PieceSquare) => {
  const { top: boardTop, left: boardLeft, piece } = square;
  return horseMovements
    .map(({ top, left }) => {
      const coordinatesResult = { top: boardTop + top, left: boardLeft + left };

      const moveObject = {
        piece,
        top: coordinatesResult.top,
        left: coordinatesResult.left,
        oldPosition: square
      };
      return isCoordinateValid(coordinatesResult, board, piece)
        ? moveObject
        : null;
    })
    .filter((v) => v !== null);
};
