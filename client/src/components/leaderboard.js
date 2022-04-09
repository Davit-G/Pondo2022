import { Grid, Stack, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import Dan from "../assets/danandrews.jpeg"

function LeaderboardRow({ name, count }) {
    return (
        <div style={{ borderStyle: "solid", borderWidth: "1px", borderRadius: "10px",  padding: "6px", margin: "2px" }}> {/* deals with border width */}
            <Grid container direction={"row"} justifyContent={"space-between"} spacing={4} paddingX={4} paddingY={1}> {/* this is the flexbox */}
                <Grid item xs>
                    <img style={{borderRadius: "10px", width: "200px", height: "200px", objectFit: "cover"}} src={Dan} alt="Dan andrews lol" />
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">{name}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">{count}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">idk lol</Typography>
                </Grid>
            </Grid>
        </div>
    );
}


function Leaderboard({ }) {

    const sampleData = [
        { name: "Daniel Andrews", haters: 256000 },
        { name: "Scott Morrison idk", haters: 24000000 },
        { name: "Daniel Andrews Jr", haters: 5 },
        { name: "Daniel Andrews", haters: 256000 },
        { name: "Scott Morrison idk", haters: 24000000 },
        { name: "Daniel Andrews Jr", haters: 5 },
        { name: "Daniel Andrews", haters: 256000 },
        { name: "Scott Morrison idk", haters: 24000000 },
        { name: "Daniel Andrews Jr", haters: 5 },
        { name: "Daniel Andrews", haters: 256000 },
        { name: "Scott Morrison idk", haters: 24000000 },
        { name: "Daniel Andrews Jr", haters: 5 },
        { name: "Scott Morrison idk", haters: 24000000 },
        { name: "Daniel Andrews Jr", haters: 5 },
        { name: "Daniel Andrews", haters: 256000 },
        { name: "Scott Morrison idk", haters: 24000000 },
        { name: "Daniel Andrews Jr", haters: 5 },
    ]

    return (<>
        <Grid container direction={"row"} justifyContent={"space-between"} paddingX={4} spacing={4}>
        <Grid item xs><p>Candidate Photo</p></Grid>
            <Grid item xs><p>Candidate Name</p></Grid>
            <Grid item xs><p>Count</p></Grid>
            <Grid item xs><p></p></Grid>
        </Grid>
        <Stack style={{ maxHeight: '70vh', overflow: 'auto' }}>

            {sampleData.map((candidate) => {
                return <LeaderboardRow name={candidate.name} count={candidate.haters}></LeaderboardRow>
            })}
        </Stack>
    </>
    );
}

export default Leaderboard;