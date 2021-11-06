import { Board, Square } from "../constants";
import { iterateBoard, squareValue } from "../utils";

export const pieceEvaluation = (board: Board): number => {
  let result = 0;
  iterateBoard(board, ({ piece }: Square) => {
    if (piece) {
      result = result + squareValue(piece);
    }
  });
  return result;
};
