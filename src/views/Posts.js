import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import PostCard from '../components/PostCard';
import { Container } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    const data = await fetch('https://dummyapi.io/data/v1/post?limit=10', {
      headers: { 'app-id': process.env.REACT_APP_APP_ID },
    });
    const parsedData = await data.json();
    setPosts(parsedData.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {posts.length > 0 && (
        <Grid container spacing={2}>
          {posts.map((post) => {
            return (
              <Grid xs={6} md={4} lg={3} key={post.id}>
                <PostCard text={post.text} image={post.image} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Posts;
