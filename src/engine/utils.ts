import { Board, BoardSquare, Color, Piece, PieceType } from "./constants";

export const colorValue = (color: Color) => (color === Color.Black ? -1 : 1);

export const squareValue = (piece: Piece) =>
  !piece ? 0 : piece.piece * colorValue(piece.color);

export const iterateBoard = (board: Board, fn: (square: any) => any) => {
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      fn({ left: i, top: j, piece: board[`${i}_${j}`] });
    }
  }
};

export const boardIndex = (left: number, top: number): string =>
  `${top}_${left}`;

export const blankSquare = (left: number, top: number): BoardSquare => ({
  left,
  top
});

export const initBoard = () => {
  const board: Record<string, any> = {};
  for (let top = 0; top <= 7; top++) {
    for (let left = 0; left <= 7; left++) {
      const color1 = left % 2 !== 0 ? Color.Black : Color.White;
      const color2 = left % 2 !== 0 ? Color.White : Color.Black;
      board[boardIndex(left, top)] = {
        color: top % 2 === 0 ? color1 : color2,
        top,
        left
      };
    }
  }
  return board;
};

export const initSecondRowPawnsBoard = () => {
  const whitePawn = { piece: PieceType.Pawn, color: Color.White };
  const blackPawn = { piece: PieceType.Pawn, color: Color.Black };

  const myBoard = initBoard();
  for (let left = 0; left <= 7; left++) {
    myBoard[boardIndex(left, 1)] = {
      ...myBoard[boardIndex(left, 1)],
      piece: whitePawn
    };
    myBoard[boardIndex(left, 6)] = {
      ...myBoard[boardIndex(left, 6)],
      piece: blackPawn
    };
  }
  return myBoard;
};
export const initv2 = () => {
  const board = initSecondRowPawnsBoard();
  const whiteBishop = { piece: PieceType.Bishop, color: Color.White };
  const blackBishop = { piece: PieceType.Bishop, color: Color.Black };
  const whiteKnight = { piece: PieceType.Knight, color: Color.White };
  const blackKnight = { piece: PieceType.Knight, color: Color.Black };

  const positions = [
    [2, 0, whiteBishop],
    [5, 0, whiteBishop],
    [1, 0, whiteKnight],
    [6, 0, whiteKnight],
    [2, 7, blackBishop],
    [5, 7, blackBishop],
    [1, 7, blackKnight],
    [6, 7, blackKnight]
  ];

  positions.forEach((v: any) => {
    board[boardIndex(v[0], v[1])] = {
      ...board[boardIndex(v[0], v[1])],
      piece: v[2]
    };
  });

  return board;
};
