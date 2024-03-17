import { Typography, TextField, Button, Toolbar, Stack, Box, Grid } from '@mui/material';

export default function Login({ theme }) {
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
                alignItems='center' justifyContent='center'
                sx={{
                    boxShadow: '10',
                    borderRadius: '3px',
                    p: '1.4rem 2.1rem',
                    bgcolor: theme.palette.drawerBackground.main,
                }}
            >
                <TextField id='username' label='Username' variant='standard' />
                <TextField id='passcode' label='Password' variant='standard' type='password' />
                <Typography>
                <Button variant='contained' size='large'>login</Button>
                </Typography>
            </Stack>
            </Box>
        </Grid>
    )
}