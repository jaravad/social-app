import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function MediaCard({ text, image, id }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={3}
    >
      <CardMedia sx={{ height: 140 }} image={image} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button
          size="small"
          onClick={() => {
            navigate(`/posts/${id}`);
          }}
        >
          Ir al post
        </Button>
      </CardActions>
    </Card>
  );
}
