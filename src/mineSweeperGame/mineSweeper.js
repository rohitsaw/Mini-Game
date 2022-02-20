import Board from "./board";

function MineSweeper() {
  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          marginBottom: "20px",
          height: "30px",
          width: "210px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3ae8a8",
        }}
      >
        MINE-SWEEPER-GAME
      </div>
      <Board />
    </div>
  );
}

export default MineSweeper;
