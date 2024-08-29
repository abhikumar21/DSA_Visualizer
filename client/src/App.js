import './App.css';
import Home from './pages/HomePage/Home';
import Binary from './pages/Visualizer/Binary';
import { Routes, Route } from 'react-router-dom';
import {Sorting} from './pages/Visualizer/Sorting';
import NQueens from './pages/Visualizer/NQueens';
import LinkedList from './pages/Visualizer/LinkedList';
import Stack from './pages/Visualizer/Stack';
import Queue from './pages/Visualizer/Queue';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" >
          <Route index element={<Home/>} />
          <Route path="sorting" element={<Sorting/>} />
          <Route path="binarytree" element={<Binary/>} />
          <Route path="nqueens" element={<NQueens/>} />
          <Route path="linklist" element={<LinkedList/>} />
          <Route path="stack" element={<Stack/>} />
          <Route path="queue" element={<Queue/>} />
          
        </Route>
      </Routes>
      {/* <MenuBar/> */}
      {/* <NewSortingVisualizer/> */}
      {/* <Binary/> */}
    </div>
  );
}

export default App;
