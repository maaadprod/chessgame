import { useState, useMemo, useCallback, useEffect } from "react";
import { Color } from "../engine/constants";
import { createGame, GameInstance } from "../engine/game";

const indexesList = new Array(8)
  .fill(new Array(8).fill(null))
  .map((v, index1) =>
    v.map((v2: any, index2: number) => `${7 - index1}_${index2}`)
  );

const pieceImages: Record<string, string> = {
  "0_1":
    "https://images.vexels.com/media/users/3/143289/isolated/lists/759a1d9598eae60232ca7a56b19f5a7d-pawn-chess-figure.png",
  "1_1":
    "https://images.vexels.com/media/users/3/143290/isolated/lists/3dc0e132939ad9ebff880b64637ea820-pawn-chess-figure-white.png",
  "0_2":
    "https://images.vexels.com/media/users/3/254459/isolated/lists/10f1211d7b69a53aa633f3581158179c-knight-chess-piece-black-color-stroke.png",
  "1_2":
    "https://images.vexels.com/media/users/3/254453/isolated/lists/db9078abbf42a90e7718f5187065c5ef-white-knight-chess-piece-color-stroke.png",
  "0_3":
    "https://images.vexels.com/media/users/3/254461/isolated/lists/1ef45451fb891e00bc08672715634f48-bishop-chess-piece-black-color-stroke.png",
  "1_3":
    "https://images.vexels.com/media/users/3/254455/isolated/lists/e585698dfdbeeef6b14c5b9925126d09-white-bishop-chess-piece-color-stroke.png"
};
export const pieceIndex = ({ color, piece }: any): string => {
  return `${color}_${piece}`;
};

export const pieceImage = (args: any): any => {
  return pieceImages[pieceIndex(args)];
};

const cellClass = ({ color }) => `color_${color}`;

const Cell = (props) => {
  const { piece, onClick, selected, possibleMove } = props;
  return (
    <div
      className={`boardCell ${cellClass(props)} ${selected ? "selected" : ""} ${
        possibleMove ? "possibleMove" : ""
      } ${piece ? "hasPiece" : ""}`}
      onClick={piece || possibleMove ? onClick : null}
    >
      {piece && <img src={pieceImage(piece)} />}
    </div>
  );
};

const GameBoard = ({ initialBoard }: any) => {
  const [squareSelected, setSquareSelected] = useState<string>("");
  const [instance, setInstance] = useState<GameInstance>();
  const turn = instance ? instance.turn : null;
  const board = instance ? instance.board : null;
  const { possibleMoves, move } = useMemo(() => {
    const api = createGame({});
    api.subscribe((v: any) => {
      setInstance(v);
    });
    return api;
  }, []);
  const possibleMovesForSquare = useMemo<Array<String>>(() => {
    if (squareSelected === "" || !instance) {
      return [];
    }
    return possibleMoves(squareSelected);
  }, [squareSelected, instance, possibleMoves]);

  const cellClickHandler = useCallback(
    (indexValue, squareData, movement) => {
      if (movement && instance) {
        move(squareSelected, indexValue);
        setSquareSelected("");
      } else if (squareData.piece.color === turn) {
        setSquareSelected(indexValue);
      }
    },
    [turn, setSquareSelected, instance, squareSelected, move]
  );
  return (
    board && (
      <>
        <div className="gameBoard">
          {indexesList.map((row) =>
            row.map((indexValue: string) => {
              const moveCell = possibleMovesForSquare.includes(indexValue);
              return (
                <Cell
                  key={indexValue}
                  {...board[indexValue]}
                  onClick={() =>
                    cellClickHandler(indexValue, board[indexValue], moveCell)
                  }
                  selected={squareSelected === indexValue}
                  possibleMove={moveCell}
                />
              );
            })
          )}
        </div>
        <div className="panelInfo">
          {turn === Color.White ? "White" : "Black"} moves{" "}
        </div>
      </>
    )
  );
};

export default GameBoard;
