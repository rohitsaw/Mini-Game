import Board from "./board";

function TicTacToeGame() {
  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          marginBottom: "20px",
          height: "30px",
          width: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3ae8a8",
        }}
      >
        TIC-TAC-TOE
      </div>
      <Board />
    </div>
  );
}

export default TicTacToeGame;
