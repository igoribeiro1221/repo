import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/main';
import NovoComputador from '../pages/novo-computador/novo-computador';
import NovoPeriferico from '../pages/novo-periferico/novo-periferico';

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/addComputador" element={<NovoComputador />} />
          <Route path="/addPeriferico/:nome" element={<NovoPeriferico />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
