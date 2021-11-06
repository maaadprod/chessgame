import { render } from "react-dom";

import App from "./App";
import { Color, PieceType } from "./engine/constants";
import { initBoard } from "./engine/utils";
import { moves } from "./engine/game/pieces/pawn";

/*
const myBoard = initBoard();
console.log(myBoard);

const myGamePiece = { piece: Piece.Pawn, color: Color.White };
const myGamePiece2 = { piece: Piece.Pawn, color: Color.Black };
myBoard["3_1"] = myGamePiece;
myBoard["4_2"] = myGamePiece2;
const allPossibleMoves = moves(myBoard, {
  top: 1,
  left: 3,
  piece: myGamePiece
});

console.log(allPossibleMoves);
*/
const rootElement = document.getElementById("root");
render(<App />, rootElement);
