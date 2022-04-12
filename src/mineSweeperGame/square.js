function Square({ id, val, isVisible, handleClick, handleRightClick, isFlag }) {
  const bomb = "0x1F4A3";

  const renderValue = () => {
    if (val === -1) return String.fromCodePoint(bomb);
    return val;
  };

  const renderFlag = () => {
    const flag = "🚩";
    return flag;
  };

  const rightClick = (e, id) => {
    e.preventDefault();
    handleRightClick(id);
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
      onContextMenu={(e) => rightClick(e, id)}
    >
      {isFlag ? renderFlag() : isVisible ? renderValue() : ""}
    </div>
  );
}

export default Square;
