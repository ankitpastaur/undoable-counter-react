import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Undoable Counter</h1>
      <div className="action-btn">
        <button className="undo">Undo</button>
        <button className="redo">Redo</button>
      </div>
      <div className="user-actions">
        {[-100, -10, -1].map((btn) => {
          return <button>{btn}</button>;
        })}
        <div>0</div>
        {["+100", "+10", "+1"].map((btn) => {
          return <button>{btn}</button>;
        })}
      </div>
      <div className="history">History</div>
    </div>
  );
}

export default App;
