import logo from './logo.svg';

import { Button, Container, Stack } from '@mui/material';
import { Grid } from '@mui/material';

import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom';

import Header from './components/header';
import Home from './components/home';
import Leaderboard from './components/leaderboard';

const backend_domain = "http://127.0.0.1:8000"

function App() {
    return (
        <div>
            <BrowserRouter> {/* Holds state relevant to react-router, ignore this and dont touchey */}
                <Container>
                    <Stack py={4} spacing={4}>
                        <Header></Header>

                        <Routes>
                            <Route path="/" element={<Home backend_domain={backend_domain}></Home>} />
                            <Route path="leaderboard" element={<Leaderboard backend_domain={backend_domain}></Leaderboard>} />
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

