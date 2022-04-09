import { Grid, Stack, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Dan from "../assets/danandrews.jpeg"

import axios from 'axios';

function LeaderboardRow({ fName, lName, count, party }) {
    return (
        <div style={{ borderStyle: "solid", borderWidth: "1px", borderRadius: "10px", padding: "6px", margin: "2px" }}> {/* deals with border width */}
            <Grid container direction={"row"} justifyContent={"space-between"} spacing={4} paddingX={4} paddingY={1}> {/* this is the flexbox */}
                <Grid item xs>
                    <img style={{ borderRadius: "10px", width: "200px", height: "200px", objectFit: "cover" }} src={Dan} alt="Dan andrews lol" />
                </Grid>
                <Grid item xs>
                    <Typography variant="h5">{fName} {lName}</Typography>
                    <Typography variant="h6" color="gray">{party}</Typography>
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


function Leaderboard({ backend_domain }) {

    const [leaderboard, updateLeaderboard] = useState([
        { name: "Daniel Andrews" },
    ])

    useEffect(() => {
        axios.get(backend_domain + "/politicians").then((res) => {
            console.log(res.data.data)
            updateLeaderboard(res.data.data)
        })
    }, [])

    const [filterBy, updateFilterBy] = useState("first")  //change this to whatever key you want to filter in the response data
    const [reverseOrder, updateReverseOrder] = useState(false)

    return (
        <>
            {/* Title of the page */}
            <Typography pb={4} variant="h2" align="center">Leaderboards</Typography>

            {/* Filtering and Sorting options */}



            <Grid container direction={"row"} justifyContent={"space-between"} paddingX={4} spacing={4}>
                <Grid item>
                    <Typography>Sort By:</Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterBy}
                            label="Age"
                            onChange={(event) => updateFilterBy(String(event.target.value))}
                        >
                            <MenuItem value={"first"}>First Name</MenuItem>
                            <MenuItem value={"last"}>Last Name</MenuItem>
                            <MenuItem value={"count"}>Count</MenuItem>
                            <MenuItem value={"party"}>Party</MenuItem>
                            <MenuItem value={"followers"}>Twitter Followers</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControlLabel control={<Checkbox checked={reverseOrder} inputProps={{ 'aria-label': 'controlled' }} onChange={(event) => updateReverseOrder(event.target.checked)} />} label="Reverse Order" />
                </Grid>
            </Grid>



            <Grid container direction={"row"} justifyContent={"space-between"} paddingX={4} spacing={4}>
                <Grid item xs><p>Candidate Photo</p></Grid>
                <Grid item xs><p>Candidate Name</p></Grid>
                <Grid item xs><p>Count</p></Grid>
                <Grid item xs><p></p></Grid>
            </Grid>
            <Stack style={{ maxHeight: '70vh', overflow: 'auto' }}>

                {leaderboard.sort((a, b) => { //this is the shit that "filters" the candidates based on whatever metric we want
                    if (a[filterBy] < b[filterBy]) {
                        return (reverseOrder) ? 1 : -1; //confusing but all it does is flip the sort order of items if "reverseorder" is true
                    } else if (a[filterBy] > b[filterBy]) {
                        return (reverseOrder) ? -1 : 1;
                    } else return 0;
                }).map((candidate) => {
                    return <LeaderboardRow party={candidate.party} fName={candidate.first} lName={candidate.last} count={candidate.haters}></LeaderboardRow>
                })}
            </Stack>
        </>
    );
}

export default Leaderboard;