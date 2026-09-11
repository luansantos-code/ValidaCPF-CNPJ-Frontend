import './App.css'
import { Formulario } from './Components/Form/Form.jsx'
import Header from './Components/Header/Header.jsx'

function App() {
  return (
    <div>
      <Header />
    <main>
      <h1>Validador de CPF/CNPJ</h1>
      <Formulario />
    </main>
    </div>
  );
}

export default App;
