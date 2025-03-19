import { createTheme } from '@mui/material/styles'; 

const theme = createTheme({
  palette: { 
    mode: 'dark', 
    primary: { 
      main: '#e50914',
    }, 
    background: { 
      default: '#141414', 
      paper: '#1f1f1f', 
    },
  }, 
  typography: { 
    fontFamily: [ 
      'Roboto', 
      '"Helvetica Neue"', 
      'Arial', 
      'sans-serif', 
    ].join(','), 
  }, 
}); 

export default theme; 