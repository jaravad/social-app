import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';

const Users = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  let page = Number(params.page);
  page = page || 1;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationCount, setPaginationCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(
          `https://dummyapi.io/data/v1/user/?&page=${page - 1}`,
          {
            headers: { 'app-id': process.env.REACT_APP_APP_ID },
          }
        );
        const parsedData = await data.json();
        setPaginationCount(Math.ceil(parsedData.total / 20));
        setUsers(parsedData.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <Container sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : users?.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {users.map((user) => {
              return (
                <Grid xs={12} sm={6} md={4} lg={3} key={user.id}>
                  <Card elevation={3}>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={`${user.firstName} ${user.lastName}`}
                          src={user.picture}
                        />
                      }
                      title={`${user.firstName} ${user.lastName}`}
                    />
                  </Card>
                  {/* <PostCard text={post.text} image={post.image} id={post.id} /> */}
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
        users.length === 0 && (
          <Typography component="h2" variant="h6">
            No results
          </Typography>
        )
      )}
    </Container>
  );
};

export default Users;
