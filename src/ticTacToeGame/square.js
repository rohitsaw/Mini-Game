function Square({ id, value, onClick }) {
  return (
    <div
      style={{
        height: "50px",
        width: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderLeft: id % 3 === 0 ? "none" : "1px solid black",
        borderTop: id <= 2 ? "none" : "1px solid black",
        borderBottom: id >= 6 ? "none" : "1px solid black",
        borderRight: id % 3 === 2 ? "none" : "1px solid black",
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

export default Square;
