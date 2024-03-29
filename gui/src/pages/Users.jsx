import { Typography, Box, Toolbar, Grid } from "@mui/material";

export default function Users() {
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
                    Users
                </Typography>
            </Box>
        </Grid>
    )
}