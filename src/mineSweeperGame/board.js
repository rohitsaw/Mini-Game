import { useEffect, useState } from "react";
import Square from "./square";

function Board() {
  const [board, setBoard] = useState([]);
  const [noOfBombs, setNoOfBombs] = useState(10);

  useEffect(() => {
    setBoard(getBoard(noOfBombs));
  }, [noOfBombs]);

  useEffect(() => {
    let cnt = 0;
    for (let row of board) {
      for (let each of row) {
        if (each.val === -1 && each.isVisible) {
          alert("MineSweeper :- game over");
          setBoard(getBoard(noOfBombs));
        } else if (each.val !== -1 && each.isVisible) {
          cnt += 1;
        }
      }
    }
    if (cnt === 64 - noOfBombs) {
      alert("MineSweeper :- Congratulation!! You Won");
      setBoard(getBoard(noOfBombs));
    }
  }, [board, noOfBombs]);

  const handleRightClick = (id) => {
    const row = Math.floor(id / 8);
    const col = id % 8;
    if (board[row][col].isVisible) return;
    setBoard((prevBoard) => {
      let newBoard = new Array(8);
      for (let i = 0; i < 8; i++) {
        newBoard[i] = [];
        for (let j = 0; j < 8; j++) {
          newBoard[i].push({
            ...prevBoard[i][j],
            isFlag:
              i === row && j === col
                ? !prevBoard[i][j].isFlag
                : prevBoard[i][j].isFlag,
          });
        }
      }
      return newBoard;
    });
  };

  const handleClick = (id) => {
    const row = Math.floor(id / 8);
    const col = id % 8;

    if (board[row][col].isFlag) return;

    const dx = [0, 0, -1, 1, -1, -1, 1, 1];
    const dy = [1, -1, 0, 0, -1, 1, -1, 1];

    let arr = [];
    let tmp = [];
    arr.push({ x: row, y: col });
    tmp.push({ x: row, y: col });

    while (arr.length > 0) {
      const { x, y } = arr.shift();
      if (board[x][y].val === 0) {
        for (let i = 0; i < 8; i++) {
          const xi = x + dx[i];
          const yi = y + dy[i];
          if (xi >= 0 && yi >= 0 && xi < 8 && yi < 8) {
            if (
              !tmp.some((ele) => ele.x === xi && ele.y === yi) &&
              board[xi][yi].val !== -1
            ) {
              arr.push({ x: xi, y: yi });
              tmp.push({ x: xi, y: yi });
            }
          }
        }
      }
    }
    setBoard((prevBoard) => {
      let newBoard = new Array(8);
      for (let i = 0; i < 8; i++) {
        newBoard[i] = [];
        for (let j = 0; j < 8; j++) {
          if (tmp.some((element) => element.x === i && element.y === j)) {
            newBoard[i].push({
              ...prevBoard[i][j],
              isVisible: true,
              isFlag: false,
            });
          } else {
            newBoard[i].push({ ...prevBoard[i][j] });
          }
        }
      }
      return newBoard;
    });
  };

  return (
    <div
      style={{
        border: "1px solid grey",
        backgroundColor: "#3ab1e8",
      }}
    >
      <table>
        <tbody>
          {board.map((item, _) => (
            <tr style={{ display: "flex" }}>
              {item.map((each) => (
                <Square
                  key={each.id}
                  id={each.id}
                  val={each.val}
                  isVisible={each.isVisible}
                  isFlag={each.isFlag}
                  handleClick={(id) => handleClick(id)}
                  handleRightClick={handleRightClick}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "10px",
          paddingLeft: "5px",
          paddingRight: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid grey",
          backgroundColor: "#e83a3a",
        }}
      >
        <button
          onClick={() => setNoOfBombs((prev) => (prev > 0 ? prev - 1 : 0))}
        >
          -
        </button>
        TOTAL BOMBS: {noOfBombs}
        <button
          onClick={() => setNoOfBombs((prev) => (prev < 20 ? prev + 1 : 20))}
        >
          +
        </button>
      </div>
    </div>
  );
}

const getValue = (x, y, boardCopy) => {
  let cnt = 0;
  const dx = [0, 0, -1, 1, -1, -1, 1, 1];
  const dy = [1, -1, 0, 0, -1, 1, -1, 1];
  for (let i = 0; i < 8; i++) {
    const xi = x + dx[i];
    const yi = y + dy[i];
    if (xi >= 0 && yi >= 0 && xi < 8 && yi < 8) {
      if (boardCopy[xi][yi].val === -1) cnt += 1;
    }
  }
  return cnt;
};

// function to get initialBoard in 1-D array with bomb position
const getLinearBoard = (noOfBombs) => {
  const arr = new Array(64);
  for (let i = 0; i < arr.length; i++) {
    if (i < noOfBombs) arr[i] = -1;
    else arr[i] = 0;
  }
  let tmp = [];

  while (tmp.length < 64) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    tmp.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return tmp;
};

// function to get initial Board with bomb and value
const getBoard = (noOfBombs) => {
  const linerBoard = getLinearBoard(noOfBombs);
  const newBoard = new Array(8);
  for (let i = 0; i < 8; i++) {
    newBoard[i] = [];
    for (let j = 0; j < 8; j++) {
      newBoard[i].push({
        id: i * 8 + j,
        val: linerBoard[i * 8 + j],
        isVisible: false,
        isFlag: false,
      });
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (newBoard[i][j].val !== -1)
        newBoard[i][j].val = getValue(i, j, newBoard);
    }
  }

  return newBoard;
};

export default Board;
