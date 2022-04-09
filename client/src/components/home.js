import React, { useState, useEffect } from 'react';

import { Grid, Button, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Dan from "../assets/danandrews.jpeg"
import axios from 'axios';

function Home({backend_domain}) {

    const [competitors, updateCompetitors] = useState([{}, {}])

    useEffect(() => {
        // make the request for data here
        axios.get(backend_domain + "/random_politicians").then((res) => {
            updateCompetitors(res.data.data)
            console.log(res.data.data)
        })
    }, []) //add this double slash BS so that it doesnt infinity loop itself out of existence

    function handleClick(index) {
        console.log(index) //handle a vote, do post request here
    }

    return (
        <div>
            <Typography pb={4} variant="h3" align="center">Vote for the worst parliament member of these two</Typography>
            {/*  So this container is a parent flexbox component that wraps everything */}
            <Grid container spacing={2} direction={"row"} justifyContent={"space-around"}>
                {/* Each "grid item" element is like a child of the flexbox parent. xs just means share width equally */}
                <Grid item xs>
                    <div style={{ backgroundColor: "black", height: "400px" }}>
                        <img style={{ borderRadius: "10px", width: "100%", height: "400px", objectFit: "cover" }} src={Dan} alt="Dan andrews lol" />

                    </div>
                    <Button style={{ marginTop: "12px" }} onClick={() => {handleClick(0)}} fullWidth variant="contained">This politician is bad</Button>
                </Grid>
                <Grid item xs>
                    <div style={{ backgroundColor: "black", height: "400px" }}>
                        <img style={{ borderRadius: "10px", width: "100%", height: "400px", objectFit: "cover" }} src={Dan} alt="Dan andrews lol" />

                    </div>
                    <Button style={{ marginTop: "12px" }} onClick={() => {handleClick(1)}} fullWidth variant="contained">This politician is worse</Button>
                </Grid>
            </Grid>
            <Outlet></Outlet>
        </div>
    );
}

export default Home;