import MineSweeper from "./mineSweeperGame/mineSweeper";
import TicTacToeGame from "./ticTacToeGame/ticTacToe";
function App() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <TicTacToeGame />
      <MineSweeper />
    </div>
  );
}

export default App;
