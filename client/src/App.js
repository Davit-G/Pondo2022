import logo from './logo.svg';

import { Button, Container, Stack } from '@mui/material';
import { Grid } from '@mui/material';

import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom';

import Header from './components/header';
import Home from './components/home';
import Leaderboard from './components/leaderboard';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    return (
        <div>
            <BrowserRouter> {/* Holds state relevant to react-router, ignore this and dont touchey */}
                <Container>
                    <Stack py={4} spacing={4}>
                        <Header></Header>

                        <Routes>
                            <Route path="/" element={<Home></Home>} />
                            <Route path="leaderboard" element={<Leaderboard></Leaderboard>} />
                        </Routes>

                        {/*  main stuff */}

                        {/* footer? */}
                    </Stack>

                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;

