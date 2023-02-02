import Home from './Pages/Home';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
