import AppBar from './components/AppBar';
import PostDetails from './components/PostDetails';
import Posts from './views/Posts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" exact Component={Posts} />
          <Route path="/posts" exact Component={Posts} />
          <Route path="/posts/:id" exact Component={PostDetails} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
