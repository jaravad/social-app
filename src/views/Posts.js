import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import PostCard from '../components/PostCard';
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select-virtualized';

function containsOnlySpaces(str) {
  return str.match(/^\s*$/) !== null;
}

const Posts = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  let page = Number(params.page);
  page = page || 1;
  let tag = params.tag;
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationCount, setPaginationCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url;
        const tagsData = await fetch(`https://dummyapi.io/data/v1/tag/`, {
          headers: { 'app-id': process.env.REACT_APP_APP_ID },
        });
        const parsedTagsData = await tagsData.json();
        setTags(parsedTagsData.data);
        if (tag) {
          url = `https://dummyapi.io/data/v1/tag/${tag}/post?limit=10&page=${
            page - 1
          }`;
        } else {
          url = `https://dummyapi.io/data/v1/post?limit=10&page=${page - 1}`;
        }
        const data = await fetch(url, {
          headers: { 'app-id': process.env.REACT_APP_APP_ID },
        });
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
  }, [page, tag]);

  return (
    <Container sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : posts.length > 0 ? (
        <>
          <Box mb={2}>
            <Typography mb={1} paragraph variant="body2">
              Filter posts by tag (for some tags there may be no results)
            </Typography>
            <Select
              style={{
                fontFamily: 'inherit',
              }}
              onChange={({ value }) => {
                navigate(`/?tag=${value}`);
              }}
              options={tags
                .filter((tag) => {
                  return Boolean(tag) && !containsOnlySpaces(tag);
                })
                .map((tag) => {
                  return { value: tag, label: tag };
                })}
            />
          </Box>
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
              page={page}
              onChange={(event, page) => {
                navigate(`?page=${page}`);
              }}
            />
          </Box>
        </>
      ) : (
        posts.length === 0 && (
          <Typography component="h2" variant="h6">
            No results
          </Typography>
        )
      )}
    </Container>
  );
};

export default Posts;
