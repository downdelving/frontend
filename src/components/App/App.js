import './App.css';
import { Game } from 'components/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Downdelving
      </header>
      <main className="App-main">
        <div className="Game">
          <Game />
        </div>
      </main>
    </div>
  );
}

export default App;
