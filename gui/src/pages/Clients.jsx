import { Typography, Box, Toolbar, Grid } from "@mui/material";

export default function Clients() {
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ minHeight: '100vh' }} 
        >
            <Toolbar/>
            <Box>
                <Typography>
                    Clients
                </Typography>
            </Box>
        </Grid>
    )
}