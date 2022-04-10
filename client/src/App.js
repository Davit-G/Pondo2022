import logo from './logo.svg';

import { Button, Container, Stack } from '@mui/material';
import { Grid } from '@mui/material';

import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom';

import Header from './components/header';
import Home from './components/home';
import Leaderboard from './components/leaderboard';
import Stats from './components/stats';
import Landing from './components/landing';

const backend_domain = "http://cardsagainstau.com:8000"

function App({theme}) {
    return (
        <div className='app' style={{backgroundColor: (theme ? "#0a0d0e" : "#ffffff"), background: (theme ? "linear-gradient(to top, #0a0d0e, #131313, #1d1d1d)" : "linear-gradient(to top, #f1f1f1, #ffffff)")}}>
            <BrowserRouter> {/* Holds state relevant to react-router, ignore this and dont touchey */}
                <Container>
                    <Stack py={4} spacing={4}>
                        <Header></Header>

                        <Routes>
                            <Route path="/" element={<Landing backend_domain={backend_domain}></Landing>} />
                            <Route path="/game" element={<Home backend_domain={backend_domain}></Home>} />
                            <Route path="leaderboard" element={<Leaderboard backend_domain={backend_domain} query={"/politicians"}></Leaderboard>} />
                            <Route path="stats" element={ <Stats backend_domain={backend_domain}></Stats>} />
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

