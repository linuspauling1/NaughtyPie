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
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import GitHubIcon from '@mui/icons-material/GitHub';
import HighlightIcon from '@mui/icons-material/Highlight';
import GroupIcon from '@mui/icons-material/Group';
import AppsIcon from '@mui/icons-material/Apps';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

const drawerWidth = 250;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#303030',
    },
    drawerBackground: {
      main: '#424242',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    drawerBackground: {
      main: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
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
        <AppBar
          position='fixed'
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundImage: 'none',
            backgroundColor: '#3f51b5',
          }}
        >
          <Toolbar>
            <Typography variant='h5' sx={{ cursor: 'pointer', userSelect: 'none' }}>
              Naughty pie
            </Typography>
            <Typography sx={{ marginLeft: '0.8rem', flexGrow: 1, cursor: 'pointer', userSelect: 'none' }}>
              @0.0.0
            </Typography>
            {[{text: 'users', icon: <GroupIcon />}, 
              {text: 'apps', icon: <AppsIcon />}, 
              {text: 'clients', icon: <DevicesOtherIcon />}, 
              {text: 'admin', icon: <AccountCircleIcon />},
              {text: 'logout', icon: <ExitToAppIcon />}].map((element)=>(
              <Button variant='primary' startIcon={element.icon} sx={{ padding: '0.5rem', }}>
                {element.text}
              </Button>
            ))}
            <IconButton onClick={toggleTheme} sx={{ color: 'inherit', }}>
              <HighlightIcon sx={{ margin: '3px',}} />
            </IconButton>
            <IconButton
              onClick={() => window.open('https://github.com/linuspauling1/NaughtyPie')} 
              sx={{ color: 'inherit', }}
            >
              <GitHubIcon sx={{ margin: '3px', fontSize: '1.65rem', }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              backgroundColor: theme.palette.drawerBackground.main,
            },
          }}
        >
          <Toolbar />
          <Box sx={{ 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            }}
          >
            <List sx={{ padding: '0' }}>
              <ListItemButton>
                <ListItemText primary='All Messages' />
              </ListItemButton>
            </List>
            <Divider />
            <List sx={{ padding: '0' }}>
              {['A Raspberry PI', 'Some server'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ borderTopWidth: '2px' }}/>
            <Typography align="center" style={{marginTop: 10}}>
              <Button
                variant='secondary'
                sx={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  p: '0.3rem 0.5rem',
                }}
              >
                  enable notifications
              </Button>
            </Typography>
          </Box>
        </Drawer>
        <Button variant='contained'>
          Muie
        </Button>
      </Box>
    </ThemeProvider>
  );
}
