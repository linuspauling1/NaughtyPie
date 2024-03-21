import { Typography, Box, Toolbar, Grid } from "@mui/material";

export default function Messages() {
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
                    Messages
                </Typography>
            </Box>
        </Grid>
    )
}