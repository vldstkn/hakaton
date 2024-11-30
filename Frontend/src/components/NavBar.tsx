import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import './NavBar.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { alpha, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

//import for mui theme
import { styled } from "@mui/material/styles";


const pages = [ 
  {pageName:'Профиль', IconName: PersonIcon, url: '/profile'},
  {pageName:'Избранное', IconName: FavoriteIcon, url: '/favorites'},
]

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      //backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    '& > .MuiInputBase-root': {
      width: '100% !important',
      //backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const IconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }));
  
  function ResponsiveAppBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Параметр для проверки авторизации
  
    const handleProfileClick = () => {
      if (isAuthenticated) {
        window.location.href = '/profile'; // Перенаправление на страницу профиля
      } else {
        window.location.href = '/auth'; // Перенаправление на страницу входа
      }
    };


  return (
    <AppBar sx={{backgroundColor: 'white'}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="../MainPage.tsx"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'rgb(64, 1, 64)',
              textDecoration: 'none',
              fontSize: 50
            }}
          >
            EASYMART
          </Typography>
            <Search sx={{ flexGrow: 8, color: 'rgb(64, 1, 64)', border: 'solid', borderColor: 'rgb(255, 80, 101)',
      borderWidth: '4px',}}>
              <IconWrapper>
                <SearchIcon />
              </IconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
             />
            </Search>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
         
          <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.pageName}
                className='navbarButton'
                startIcon={<page.IconName sx={{ fontSize: '24px !important' }} />}
                onClick={page.pageName === 'Профиль' ? handleProfileClick : () => window.location.href = page.url}
                sx={{
                  my: 2,
                  color: 'rgb(64, 1, 64)',
                  fontSize: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px',
                  minWidth: '80px',
                  height: '60px',
                }}
              >
                {page.pageName}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;