import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [redoList, setRedoList] = useState([]);
  const [history, setHistory] = useState([]);
  const [undoCount, setUndoCount] = useState(0);

  const maintainHistory = (key, prev, curr) => {
    console.log(key, prev, curr);
    const obj = {
      action: key,
      prev,
      curr,
    };
    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  };

  const handleClick = (key) => {
    const val = parseInt(key);
    maintainHistory(key, value, val + value);
    setValue((existingValue) => existingValue + val);
  };

  const handleUndo = () => {
    //Stack LIFO
    // [+100, +10, +1] so if we undo then this will remove that +100 entered in last attempt
    // So at same point we will prapare redo list for redo operation-------> redoList [+100]
    if (history.length) {
      if (undoCount + 1 > 5) {
        alert("You can not undo more than 5 times");
        return;
      }
      setUndoCount((c) => c + 1);

      const copyHist = [...history];
      const firstItem = copyHist.shift();
      setHistory(copyHist);

      setValue(firstItem.prev);

      const copyRedoList = [...redoList];
      copyRedoList.push(firstItem);
      setRedoList(copyRedoList);
    }
  };

  const handleRedo = () => {
    if (redoList.length) {
      const copyRedoList = [...redoList];
      const poppedValue = copyRedoList.pop();
      setRedoList(copyRedoList);
      const { action, prev, curr } = poppedValue;
      setValue(curr);
      maintainHistory(action, prev, curr);
    }
  };

  return (
    <div className="App">
      <h1>Undoable Counter</h1>
      <div className="action-btn">
        <button className="undo" onClick={handleUndo}>
          Undo
        </button>
        <button className="redo" onClick={handleRedo}>
          Redo
        </button>
      </div>
      <div className="user-actions">
        {[-100, -10, -1].map((btn) => {
          return <button onClick={() => handleClick(btn)}>{btn}</button>;
        })}
        <div style={{ fontSize: 40 }}>{value}</div>
        {["+100", "+10", "+1"].map((btn) => {
          return <button onClick={() => handleClick(btn)}>{btn}</button>;
        })}
      </div>
      <div className="history">
        {history.map((item) => {
          return (
            <div className="row">
              <div>{item.action}</div>
              <div>{`[ ${item.prev} -> ${item.curr}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
