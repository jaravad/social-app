import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { signOut } from 'firebase/auth';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
            }}
          >
            Social App
          </Typography>
          <Box>
            {isAuthenticated && (
              <Button
                color="inherit"
                onClick={() => {
                  navigate('/users');
                }}
              >
                Users
              </Button>
            )}
            <Button
              color="inherit"
              onClick={() => {
                navigate('/posts');
              }}
            >
              Posts
            </Button>
            <Button
              color="inherit"
              onClick={
                isAuthenticated ? () => signOut(auth) : handleGoogleSignIn
              }
            >
              {isAuthenticated ? 'Log Out' : 'Sign In'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
