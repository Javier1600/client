import './Styles/App.css';
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Main from './Views/Main';
import New from './Views/New';
import Edit from './Views/Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/new" element={<New/>}/>
          <Route exact path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
