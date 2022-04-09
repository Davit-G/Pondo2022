import React, { useState, useEffect } from 'react';

import { Grid, Button, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Dan from "../assets/danandrews.jpeg"

function Home({ }) {

    useEffect(() => {
        // make the request for data here
    })




    return (

        <div>
            <Typography pb={4} variant="h2" align="center">According to this, which parliament member is worse</Typography>
            {/*  So this container is a parent flexbox component that wraps everything */}
            <Grid container spacing={2} direction={"row"} justifyContent={"space-around"}>
                {/* Each "grid item" element is like a child of the flexbox parent. xs just means share width equally */}
                <Grid item xs>
                    <div style={{ backgroundColor: "black", height: "400px" }}>
                        <img style={{ borderRadius: "10px", width: "100%", height: "400px", objectFit: "cover" }} src={Dan} alt="Dan andrews lol" />

                    </div>
                    <Button style={{ marginTop: "12px" }} fullWidth variant="contained">This politician is bad</Button>
                </Grid>
                <Grid item xs>
                    <div style={{ backgroundColor: "black", height: "400px" }}>
                        <img style={{ borderRadius: "10px", width: "100%", height: "400px", objectFit: "cover" }} src={Dan} alt="Dan andrews lol" />

                    </div>
                    <Button style={{ marginTop: "12px" }} fullWidth variant="contained">This politician is worse</Button>
                </Grid>
            </Grid>
            <Outlet></Outlet>
        </div>
    );
}

export default Home;