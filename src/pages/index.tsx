import { Button, Container, Grid, TextField } from '@mui/material';
import axios from 'axios';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const onClickHandler = async () => {
    const q = 'js';
    const res = await axios.get(`/api/twitter?q=${encodeURIComponent(q)}`);
    const { data } = res;
    console.log(data);
  };
  return (
    <>
      <div className='bg-slate-600 min-h-screen w-full'>
        <Container>
          <Grid
            container
            className='bg-slate-200 min-h-screen w-full p-8 justify-center items-center'
          >
            <Grid item xs={3}>
              <Button variant='outlined' color='primary' onClick={onClickHandler}>
                Get Tweet
              </Button>
            </Grid>
            <Grid item xs={3}>
              <TextField label='test'></TextField>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Home;
