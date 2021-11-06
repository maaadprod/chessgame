import { Board, Color } from "../constants";
import { initv2 } from "../utils";
import { availableMoves } from "../game/pieces";
import { AsyncSubject } from "rxjs";

interface createGameArgs {
  initialTurn?: Color;
  initialBoard?: Board;
}
interface GameData {
  turn: Color;
  board: Board;
}

export interface GameInstance extends GameData {
  move: (origin: string, destiny: string) => null;
  possibleMoves: (squareSelected: string) => string[];
}

const move = (gameData: GameData, updateGame: any) => (
  origin: string,
  destiny: string
) => {
  gameData.board = {
    ...gameData.board,
    [destiny]: {
      ...gameData.board[destiny],
      piece: gameData.board[origin].piece
    },
    [origin]: { ...gameData.board[origin], piece: undefined }
  };
  gameData.turn = gameData.turn === Color.White ? Color.Black : Color.White;

  updateGame();

  return null;
};

export const createGame = ({ initialTurn, initialBoard }: createGameArgs) => {
  const gameData = {
    turn: initialTurn ? initialTurn : Color.White,
    board: initialBoard ? initialBoard : initv2()
  };

  const subject = new AsyncSubject();
  const updateGame = () => {
    subject.next(gameData);
    subject.complete();
  };

  const moveFn = move(gameData, updateGame);
  const possibleMoves = (squareSelected: string) => {
    const allPossibleMoves = availableMoves(
      gameData.board,
      gameData.board[squareSelected]
    );
    return allPossibleMoves.map(({ left, top }) => `${top}_${left}`);
  };
  return {
    move: moveFn,
    possibleMoves,
    subscribe: (onGameUpdate: Function): any => {
      subject.subscribe({ next: onGameUpdate });
      updateGame();
    }
  };
};
