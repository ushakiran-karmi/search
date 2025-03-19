import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Adjusted the path to './pages/Home' assuming the file is in the 'pages' folder
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import { BrowserRouter } from 'react-router-dom'; 
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Provider store={store}>   
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>  {/* Wrap with BrowserRouter */}
          <Navbar />
          <Box sx={{ mt: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
