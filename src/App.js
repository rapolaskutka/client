import { Routes, Route } from 'react-router-dom';
import './App.css';
import Exhibit from './pages/Exhibit';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route exact path="/:exhibitId" element={<Exhibit />} />
      <Route path="/" element={<NotFound />} />
    </Routes>
  );
};

export default App;
