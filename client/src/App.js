import logo from "./logo.svg";
import "./App.css";

function App() {
  const a = fetch("http://127.0.0.1:8001/api")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });

  console.log(a);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
