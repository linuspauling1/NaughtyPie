import { Typography, TextField, Button, Toolbar, Stack, Box, Grid } from '@mui/material';
import { useState, } from 'react';
import axios from 'axios';

export default function Login({ theme, isLogged }) {

    const [username, setUsername] = useState('')
    const [passcode, setPasscode] = useState('')

    const sendCredentials = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('/login', {
            username,
            passcode,
          })
          console.log('Login successful:', response.data)
          isLogged(true)
        } catch (error) {
          console.log('Login error:', error)
        }
    }

    return(
        <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ minHeight: '100vh' }} 
        >
            <Toolbar/>
            <Box>
                <Typography variant='h4' sx={{my: '2rem'}}>Login</Typography>
                <Stack
                    spacing={2.5}
                    alignItems='center'
                    justifyContent='center'
                    component='form'
                    sx={{
                        boxShadow: '10',
                        borderRadius: '3px',
                        p: '1.4rem 2.1rem',
                        bgcolor: theme.palette.drawerBackground.main,
                    }}
                >
                    <TextField 
                        id='username' 
                        label='Username' 
                        variant='standard' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField 
                        id='passcode'
                        label='Password'
                        variant='standard'
                        type='password'
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)} 
                    />
                    <Typography>
                        <Button variant='contained' size='large' type='submit' onClick={sendCredentials}>login</Button>
                    </Typography>
                </Stack>
            </Box>
        </Grid>
    )
}