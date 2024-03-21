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
import { useState, } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './Login';
import Apps from './Apps';
import Clients from './Clients';
import Messages from './Messages';
import Users from './Users';

const drawerWidth = 250;

const sections =  [ {text: 'users', icon: <GroupIcon />}, 
                    {text: 'apps', icon: <AppsIcon />}, 
                    {text: 'clients', icon: <DevicesOtherIcon />}, 
                    {text: 'admin', icon: <AccountCircleIcon />},
                    {text: 'logout', icon: <ExitToAppIcon />} ];

const serversDemo = ['A Raspberry PI', 'Some server'];

const commonButtonStyles = {
  root: {
    '&:focus': {
      outline: 'none',
    },
  },
};

const themeFactory = (isLight) => ({
  palette: {
    mode: isLight ? 'light' : 'dark',
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: isLight ? '#ffffff' : '#303030',
    },
    drawerBackground: {
      main: isLight ? '#ffffff' : '#424242',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: commonButtonStyles,
    },
    MuiIconButton: {
      styleOverrides: commonButtonStyles,
    }
  },
})

const darkTheme = createTheme(themeFactory(false))
const lightTheme = createTheme(themeFactory(true))

export default function Layout() {
  
  const [logged, isLogged] = useState(false)

  var pages = (logged ? sections : [])
  var servers = (logged ? [] : serversDemo)

  const [theme, setTheme] = useState(darkTheme)
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }

  return (
    <BrowserRouter>
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
              {pages.map((element, index)=>(
                <Button
                  key={index} 
                  variant='primary' 
                  startIcon={element.icon} 
                  component={Link} to={element.text}
                  sx={{ padding: '0.5rem', }}
                >
                  {element.text}
                </Button>
              ))}
              <IconButton onClick={toggleTheme} sx={{ color: 'inherit', }}>
                <HighlightIcon sx={{ margin: '3px', }} />
              </IconButton>
              <IconButton
                onClick={() => window.open('https://github.com/linuspauling1/NaughtyPie')}
                sx={{ color: 'inherit', }}
              >
                <GitHubIcon sx={{ margin: '3px', fontSize: '1.7rem' }} />
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
            <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', }}>
              <List sx={{ padding: '0' }}>
                <ListItemButton disabled={!logged} component={Link} to='/messages'>
                    <ListItemText primary='All Messages' />
                </ListItemButton>
              </List>
              <Divider sx={ logged ? {} : { borderWidth: '0.01rem' }}/>
              <List sx={{ padding: '0' }}>
                {servers.map((text, id) => (
                  <ListItem key={id} disablePadding>
                    <ListItemButton disabled={!logged}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={ logged ? { borderWidth: '0.01rem' } : {}}/>
              <Typography align='center' style={{marginTop: 10}}>
                <Button variant='primary' sx={{ p: '0.3rem 0.5rem', transitionDuration: '0ms' }}>
                    enable notifications
                </Button>
              </Typography>
            </Box>
          </Drawer>
          <Routes>
            {
              logged ?
              <>
                <Route exact path="apps" element={<Apps />} />
                <Route exact path="clients" element={<Clients />} />
                <Route exact path="users" element={<Users />} />
                <Route exact path="messages" element={<Messages />} />
                <Route path="*" element={<Navigate to='/messages' />} /> 
              </>
              :
              <>
                <Route exact path="login" element={<Login theme={theme} isLogged={isLogged}/>} />
                <Route path="*" element={<Navigate to='/login' />} />
              </>
            }
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}