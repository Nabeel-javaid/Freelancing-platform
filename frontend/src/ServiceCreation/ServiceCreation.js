import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  makeStyles
} from '@mui/material';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  card: {
    padding: theme.spacing(3),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  button: {
    width: '100%',
    backgroundColor: 'dark',
    color: 'white',
    borderRadius: theme.spacing(1),
    cursor: 'pointer'
  }
}));

function ServiceCreation() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();

  const handleCreation = async () => {
    if (title === '' || description === '' || price === '' || tags === '') {
      toast.error('Please fill all the fields');
      return;
    }

    const tagsArray = tags.split(',');

    const body = {
      title: title,
      description: description,
      price: price,
      tags: tagsArray
    };

    const response = await fetch('/service/createservice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.accessToken}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
      navigate('/service/serviceprofile');
    } else {
      toast.success(data.message);
      navigate('/service/serviceprofile');
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={5}>
            <Typography variant="h2" gutterBottom>
              The best offer <br />
              <span style={{ color: 'blue' }}>for your business</span>
            </Typography>
            <Typography
              variant="body1"
              style={{ color: 'hsl(217, 10%, 50.8%)' }}
              paragraph
            >
              {/* ... (same as before) ... */}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Card className={classes.card}>
              <CardContent>
                <TextField
                  className={classes.input}
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  className={classes.input}
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  className={classes.input}
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  className={classes.input}
                  label="Tags (Comma Separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleCreation}
                >
                  Register Your Service !
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ServiceCreation;
