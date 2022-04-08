import logo from './logo.svg';
import Header from './components/header';
import { Button, Container } from '@mui/material';
import { Grid } from '@mui/material';

import { Route, BrowserRouter, Routes } from 'react-router-dom';


function Home() {
    return (<Grid container spacing={2} direction={"row"} justifyContent={"space-around"}>
        <Grid item xs>
            <div style={{ backgroundColor: "black", height: "400px" }}></div>
            <Button style={{ marginTop: "12px" }} fullWidth variant="contained">This politician is bad</Button>
        </Grid>
        <Grid item xs>
            <div style={{ backgroundColor: "black", height: "400px" }}></div>
            <Button style={{ marginTop: "12px" }} fullWidth variant="contained">This politician is worse</Button>
        </Grid>
    </Grid>);
}


function App() {
    return (
        <div>
            <Container>
                <Header></Header>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home></Home>} />
                    </Routes>
                </BrowserRouter>
                {/*  main stuff */}

                {/* footer? */}
            </Container>
        </div>
    );
}

export default App;

