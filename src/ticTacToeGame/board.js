import { useEffect, useState } from "react";
import Square from "./square";

function Board() {
  const [clickable, setClickable] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const [boardState, setBoardState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [isPlayer1, setPlayer1] = useState(true);
  const [isPlayer2, setPlayer2] = useState(false);

  const getCurrentSign = () => {
    if (isPlayer1) return "X";
    return "0";
  };

  const handleClick = (id) => {
    if (clickable[id]) {
      // set unclickable current square for future
      setClickable(() => {
        return clickable.map((item, index) => (index === id ? false : item));
      });

      // setting sign in board
      setBoardState(() => {
        return boardState.map((item, index) =>
          id === index ? getCurrentSign() : item
        );
      });

      // changing next player
      if (isPlayer1) {
        setPlayer1(false);
        setPlayer2(true);
      } else if (isPlayer2) {
        setPlayer1(true);
        setPlayer2(false);
      }
    }
  };

  const reset = () => {
    setClickable([true, true, true, true, true, true, true, true, true]);
    setBoardState(["", "", "", "", "", "", "", "", ""]);
    setPlayer1(true);
    setPlayer2(false);
  };

  useEffect(() => {
    const msg = calculateWinner(boardState);
    if (msg !== "") {
      alert(`TIC-TAC-TOE :- ${msg}`);
      reset();
    }
  }, [boardState]);

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid grey",
        display: "inline-block",
        backgroundColor: "#3ab1e8",
      }}
    >
      <div>
        <div style={{ display: "flex" }}>
          <Square id={0} value={boardState[0]} onClick={() => handleClick(0)} />
          <Square id={1} value={boardState[1]} onClick={() => handleClick(1)} />
          <Square id={2} value={boardState[2]} onClick={() => handleClick(2)} />
        </div>
        <div style={{ display: "flex" }}>
          <Square id={3} value={boardState[3]} onClick={() => handleClick(3)} />
          <Square id={4} value={boardState[4]} onClick={() => handleClick(4)} />
          <Square id={5} value={boardState[5]} onClick={() => handleClick(5)} />
        </div>
        <div style={{ display: "flex" }}>
          <Square id={6} value={boardState[6]} onClick={() => handleClick(6)} />
          <Square id={7} value={boardState[7]} onClick={() => handleClick(7)} />
          <Square id={8} value={boardState[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
      <button
        style={{
          marginTop: "10px",
          width: "155px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid grey",
          backgroundColor: "#e83a3a",
        }}
        onClick={reset}
      >
        RESET
      </button>
    </div>
  );
}

function calculateWinner(boardState) {
  let res = "";
  const m1 = winByRow(boardState);
  if (m1.length > 0) res = m1;
  if (!m1) {
    const m2 = winByCol(boardState);
    if (m2.length > 0) res = m2;
    if (!m2) {
      const m3 = winByDiagnal(boardState);
      if (m3.length > 0) res = m3;
    }
  }
  return res;
}

const winByRow = (boardState) => {
  let msg = "";
  if (
    boardState[0] === boardState[1] &&
    boardState[1] === boardState[2] &&
    boardState[0] !== ""
  ) {
    msg = boardState[0] === "X" ? "Player 1 Win" : "Player 2 Win";
  }
  if (
    boardState[3] === boardState[4] &&
    boardState[4] === boardState[5] &&
    boardState[3] !== ""
  ) {
    msg = boardState[3] === "X" ? "Player 1 Win" : "Player 2 Win";
  }
  if (
    boardState[6] === boardState[7] &&
    boardState[7] === boardState[8] &&
    boardState[6] !== ""
  ) {
    msg = boardState[6] === "X" ? "Player 1 Win" : "Player 2 Win";
  }
  return msg;
};

const winByCol = (boardState) => {
  let msg = "";
  if (
    boardState[0] === boardState[3] &&
    boardState[3] === boardState[6] &&
    boardState[0] !== ""
  ) {
    msg = boardState[0] === "X" ? "Player 1 Win" : "Player 2 Win";
  }
  if (
    boardState[1] === boardState[4] &&
    boardState[4] === boardState[7] &&
    boardState[1] !== ""
  ) {
    msg = boardState[1] === "X" ? "Player 1 Win" : "Player 2 Win";
  }
  if (
    boardState[2] === boardState[5] &&
    boardState[5] === boardState[8] &&
    boardState[2] !== ""
  ) {
    msg = boardState[2] === "X" ? "Player 1 Win" : "Player 2 Win";
  }

  return msg;
};

const winByDiagnal = (boardState) => {
  let msg = "";
  if (
    boardState[0] === boardState[4] &&
    boardState[4] === boardState[8] &&
    boardState[0] !== ""
  ) {
    msg = boardState[0] === "X" ? "Player 1 Win" : "Player 2 Win";
  }
  if (
    boardState[2] === boardState[4] &&
    boardState[4] === boardState[6] &&
    boardState[2] !== ""
  ) {
    msg = boardState[2] === "X" ? "Player 1 Win" : "Player 2 Win";
  }
  return msg;
};

export default Board;
