import { Grid, Stack, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Dan from "../assets/danandrews.jpeg"

import axios from 'axios';

function LeaderboardRow({ fName, lName, count, party, roles, profImage, index, small, trophy}) {
    return (
        <div style={{ borderStyle: "solid", borderWidth: "1px", borderRadius: "10px", padding: "6px", margin: "2px" }}> {/* deals with border width */}
            <Grid container direction={"row"} justifyContent={"space-between"} spacing={4} paddingX={4} paddingY={1}> {/* this is the flexbox */}
                <Grid item>
                    <Typography variant={small ? "h6" : "h3"}>{index + 1}#</Typography>
                    {trophy ? <Typography variant={small ? "h5" : "h1"}>{small ? "🏆" : null}</Typography> : null}
                </Grid>
                <Grid item >
                    <img style={{ borderRadius: "10px", width: small ? "70px" : "150px", height: small ? "70px" : "150px", objectFit: "cover" }} src={profImage} alt="Dan andrews lol" />
                </Grid>
                <Grid item xs>
                    <Typography variant="h5" >{fName} {lName}</Typography>
                    <Typography variant="h6" color="gray">{small ? party : ((roles === "" ? "" : roles + " in the ") + party)}</Typography>
                </Grid>
                <Grid item >
                    <Typography variant="h6">{count} {count == 1 ? "vote" : "votes"} {!small ? "against this candidate" : null}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}


function Leaderboard({ backend_domain, query, small }) {

    const [leaderboard, updateLeaderboard] = useState([
        { name: "Daniel Andrews" },
    ])



    useEffect(() => {
        axios.get(backend_domain + query).then((res) => {
            console.log(res.data.data)
            let sortedResponse = res.data.data.sort((a, b) => { // sort by count so that we can add the number next to the thing
                if (a["count"] < b["count"]) {
                    return 1;
                } else if (a["count"] > b["count"]) {
                    return -1;
                } else return 0;
            }).map((item, i) => {
                return { ...item, "position": i }
            })
            updateLeaderboard(sortedResponse)
        })
    }, [])

    const [filterBy, updateFilterBy] = useState("count")  //change this to whatever key you want to filter in the response data
    const [reverseOrder, updateReverseOrder] = useState(false)

    return (
        <>
            {!small ? 
                <>
                    {/* Title of the page */}
                    <Typography variant="h2" align="left">Leaderboards</Typography>
                    <Typography variant="h5" color={"gray"} align="left">How many policy members' voting decisions were worse than others?</Typography>
                    {/* Filtering and Sorting options */}



                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"flex-end"} paddingX={4} spacing={4}>
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
                                    label="Sort Category"
                                    onChange={(event) => updateFilterBy(String(event.target.value))}
                                >
                                    <MenuItem value={"count"}>Count</MenuItem>
                                    <MenuItem value={"first"}>First Name</MenuItem>
                                    <MenuItem value={"last"}>Last Name</MenuItem>
                                    <MenuItem value={"party"}>Party</MenuItem>
                                    <MenuItem value={"roles"}>Roles</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControlLabel control={<Checkbox checked={reverseOrder} inputProps={{ 'aria-label': 'controlled' }} onChange={(event) => updateReverseOrder(event.target.checked)} />} label="Reverse Order" />
                        </Grid>
                    </Grid>
                </>
                : null
            }




                {/* <Grid container direction={"row"} justifyContent={"space-between"} paddingX={4} spacing={4}>
                <Grid item xs><p>Candidate Photo</p></Grid>
                <Grid item xs><p>Candidate Name</p></Grid>
                <Grid item xs><p>Count</p></Grid>
                <Grid item xs><p></p></Grid>
            </Grid> */}
                <Stack style={{ maxHeight: small ? "50vh" : "auto", overflow: 'auto' }}>

                    {leaderboard.sort((a, b) => { //this is the shit that "filters" the candidates based on whatever metric we want
                        if (filterBy === "count") {  //i need this shit or else it sorts backwards
                            if (a["position"] < b["position"]) {
                                return (reverseOrder) ? 1 : -1; //confusing but all it does is flip the sort order of items if "reverseorder" is true
                            } else if (a["position"] > b["position"]) {
                                return (reverseOrder) ? -1 : 1;
                            } else return 0;
                        } else if (filterBy === "roles") {
                            if (a[filterBy].length < b[filterBy].length) {
                                return (reverseOrder) ? -1 : 1; 
                            } else if (a[filterBy].length > b[filterBy].length) {
                                return (reverseOrder) ? 1 : -1;
                            } else return 0;
                        } else {
                            if (a[filterBy] < b[filterBy]) {
                                return (reverseOrder) ? 1 : -1; //confusing but all it does is flip the sort order of items if "reverseorder" is true
                            } else if (a[filterBy] > b[filterBy]) {
                                return (reverseOrder) ? -1 : 1;
                            } else return 0;
                        }


                    }).map((candidate, index) => {
                        return <LeaderboardRow
                        trophy={index == 0 ? true : false}
                        small={small}
                            index={candidate.position}
                            party={candidate.party}
                            roles={candidate.roles}
                            profImage={candidate.oa_image ? candidate.oa_image : candidate.image}  //change back please
                            fName={candidate.first}
                            lName={candidate.last}
                            count={candidate.count}></LeaderboardRow>
                    })}
                </Stack>
            </>
    );
}

            export default Leaderboard;