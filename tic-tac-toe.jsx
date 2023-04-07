const Square = ({id, newState}) => {
  const [status, setStatus] = React.useState("");
  const OorX = ["O","X"];

  return (
    <button
      onClick={e => {
        let col = "blue";
        let player = newState(id);

        setStatus(player);

        if (player == 0) col = "red";

        e.target.style.background = col;
      }}
    >
      <h1>{OorX[status]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));

  let status = `Next Player ${player}`;
  let winner = checkWinner(state);
  if (winner != null) status = `Player ${winner} wins`;
  
  function checkWinner(state){
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] == state[b] && state[a] == state[c] && state[a]) return state[a];
    }

    return null;
  }

  const newState = id => {
    let thePlayer = player;
    state[id] = thePlayer;

    setState(state);
    setPlayer((thePlayer + 1) % 2);

    return thePlayer;
  }

  function renderSquare(i) {
    return <Square id={i} newState={newState}></Square>;
  }
  
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
