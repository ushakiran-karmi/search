
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Toolbar } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import { store } from './redux/store';
import Search from './pages/Search';
import Home from './pages/Home'; 
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import Navbar from './components/Navbar';
import GenreDrawer from './components/GenreDrawer';

const drawerWidth = 240; // Must match the width set in GenreDrawer

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {/* Navbar: fixed position to remain at the top */}
          <Navbar />
          <Box sx={{ display: 'flex', mt: 8 }}>
            {/* Sidebar: GenreDrawer */}
            <Box
              component="aside"
              sx={{
                width: { xs: '100%', sm: `${drawerWidth}px` }, // Full width on small screens, fixed on larger
                flexShrink: 0,
                position: 'fixed',
                top: '64px', // Move the drawer down to start below the navbar
                height: 'calc(100vh - 64px)', // Subtract Navbar height
                overflowY: 'auto',
                borderRight: '1px solid #e0e0e0',
                bgcolor: 'background.paper',
              }}
            >
              <GenreDrawer />
            </Box>

            {/* Main Content: Adjust content area based on sidebar */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                ml: { sm: `${drawerWidth}px` }, // Leave space for the sidebar on larger screens
                p: 3,
              }}
            >
              <Toolbar /> {/* Adds space below the navbar for content */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
