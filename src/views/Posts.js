import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import PostCard from '../components/PostCard';
import { Box, CircularProgress, Container, Pagination } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationCount, setPaginationCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(
          `https://dummyapi.io/data/v1/post?limit=10&page=${currentPage - 1}`,
          {
            headers: { 'app-id': process.env.REACT_APP_APP_ID },
          }
        );
        const parsedData = await data.json();
        setPaginationCount(Math.ceil(parsedData.total / 10));
        setPosts(parsedData.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <Container sx={{ py: 4 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {posts.length > 0 && !loading && (
        <>
          <Grid container spacing={2}>
            {posts.map((post) => {
              return (
                <Grid xs={6} md={4} lg={3} key={post.id}>
                  <PostCard text={post.text} image={post.image} id={post.id} />
                </Grid>
              );
            })}
          </Grid>
          <Box display="flex" justifyContent="center">
            <Pagination
              count={paginationCount}
              color="primary"
              sx={{ paddingTop: 2 }}
              page={currentPage}
              onChange={(event, page) => {
                setCurrentPage(page);
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Posts;
