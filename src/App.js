
import './App.css'
import { Agregar } from './components/Agregar';
import { Contenido } from './components/Contenido';
import { List } from './components/List';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Contenido></Contenido>
     
    </div>
  );
}

export default App;
