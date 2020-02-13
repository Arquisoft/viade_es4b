import React from 'react';
import logo from './logo.svg';
import './App.css';



function HolaMundo(texto, años) {
  var presentacion = <div>
    <h2>Hola, soy {texto}</h2>
    <h2>Tengo {años}</h2></div>
  return presentacion;
}
function App() {
  var nombre = "Pablo";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola
        </p>
        {HolaMundo(nombre, 22)}

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