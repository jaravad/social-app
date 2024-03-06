import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const parseDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const humanReadableDate = date.toLocaleDateString('en-US', options);
  return humanReadableDate;
};

const PostDetails = () => {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
          headers: { 'app-id': process.env.REACT_APP_APP_ID },
        });
        const parsedData = await data.json();
        setPostData(parsedData);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        pt: 4,
        pb: 6,
      }}
    >
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {postData && !loading && (
        <Card
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {postData.owner && (
            <CardHeader
              avatar={
                <Avatar
                  alt={postData?.owner?.name}
                  src={postData?.owner?.picture}
                />
              }
              title={`${postData?.owner?.firstName} ${postData?.owner?.lastName}`}
              subheader={parseDate(postData?.publishDate)}
            />
          )}
          <img
            style={{ width: '100%', maxWidth: '100%', alignSelf: 'center' }}
            src={postData.image}
            alt={postData.text}
          />
          <CardContent>
            {/* <Typography variant="h5" component="div">
          {name}
        </Typography> */}
            <Box mb={0.5}>
              {postData?.tags?.map((tag) => (
                <Chip
                  size="small"
                  label={tag}
                  key={tag}
                  sx={{ m: 0.25 }}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>

            <Typography variant="body2" paragraph mb={1}>
              {postData.text}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default PostDetails;
