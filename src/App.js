import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import AppBar from './components/AppBar';
import PostDetails from './components/PostDetails';
import Posts from './views/Posts';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Users from './views/Users';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated === null) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" exact Component={Posts} />
        <Route path="/posts" exact Component={Posts} />
        <Route path="/posts/:id" exact Component={PostDetails} />
        <Route
          path="/users"
          exact
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
