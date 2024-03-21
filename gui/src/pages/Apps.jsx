import { Typography, Box, Toolbar, Grid } from "@mui/material";

export default function Apps() {
    return (
        <>
        <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ minHeight: '100vh' }} 
        >
            <Toolbar/>
            <Box>
                <Typography>
                    Apps
                </Typography>
            </Box>
        </Grid>
        </>
    )
}