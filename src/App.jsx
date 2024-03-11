import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import GitHubIcon from '@mui/icons-material/GitHub';
import HighlightIcon from '@mui/icons-material/Highlight';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

const drawerWidth = 240;

const lightTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App() {
  const [theme, setTheme] = useState(lightTheme)
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h5" sx={{ cursor: 'pointer', userSelect: 'none' }}>
              Naughty pie
            </Typography>
            <Typography sx={{ marginLeft: '0.8rem', flexGrow: 1, cursor: 'pointer', userSelect: 'none' }}>
              @0.0.0
            </Typography>
            <IconButton onClick={toggleTheme} sx={{ 
              color: 'inherit',
              '&:focus': {
                outline: 'none',
              },
              }}>
              <HighlightIcon sx={{ margin: '3px', fontSize: '1.6rem' }} />
            </IconButton>
            <IconButton sx={{ 
              color: 'inherit',
              '&:focus': {
                outline: 'none',
              },
              }}>
              <GitHubIcon sx={{ margin: '3px', fontSize: '1.6rem' }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column' 
            }}
          >
            <List sx={{ padding: '0' }}>
              <ListItemButton>
                <ListItemText primary='All Messages' />
              </ListItemButton>
            </List>
            <Divider />
            <List sx={{ padding: '0' }}>
              {['A Raspberry PI', 'Some server'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ borderTopWidth: '2px' }}/>
            <Button
              variant='primary' 
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                margin: '1rem',
                outline: 'none',
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              enable notifications
            </Button>
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
