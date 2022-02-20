function Square({ id, val, isVisible, handleClick }) {
  const bomb = "0x1F4A3";

  const renderValue = () => {
    if (val === -1) return String.fromCodePoint(bomb);
    return val;
  };
  return (
    <div
      style={{
        height: "24px",
        width: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
      }}
      onClick={() => handleClick(id)}
    >
      {isVisible ? renderValue() : ""}
    </div>
  );
}

export default Square;
