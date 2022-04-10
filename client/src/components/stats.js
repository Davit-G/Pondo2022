import React, { useState, useEffect } from 'react';
import { Typography, Stack, Grid, TextField, Checkbox, MenuItem, Select, InputLabel, FormControl, FormControlLabel } from '@mui/material';
import Leaderboard from './leaderboard';
import { VictoryPie } from "victory";
import axios from 'axios';

function StatsRow({ title, description, children, alternate }) {
    return (
        <>
            <Stack justifyContent={"space-around"} marginY={3} padding={4} direction={"row"} style={{ borderStyle: "solid", borderRadius: "20px", borderWidth: "1px", padding: "16px", width: "100%", height: "auto" }}>
                {
                    alternate ? <div style={{ width: "40%" }}>
                        {children}
                    </div> : null
                }
                <Stack>
                    <Typography padding={2} variant={"h4"} align={alternate ? "right" : "left"}>{title}</Typography>
                    <Typography padding={2} variant={"h6"} align={alternate ? "right" : "left"}>{description}</Typography>
                </Stack>
                {
                    !alternate ? <div style={{ width: "40%" }}>
                        {children}
                    </div> : null
                }
            </Stack>
        </>
    );
}

function PieChart({ data }) {
    return (<VictoryPie
    data={data}
        color={"white"}
        colorScale={[
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
            "#3949AB",
            "#039BE5",
            "#03A9F4",
            "#00BCD4",
            "#26A69A",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722"]}
    ></VictoryPie>);
}

function FilterByPoliciesMenu({ backend_domain, parties_to_policy}) {

    const [listOfPolicies, updateListOfPolicies] = useState([])
    
    useEffect(() => {
        axios.get(backend_domain + "/get_all_policies").then((res) => {
            updateListOfPolicies(res.data)
        })
    }, [])

    const [filterBy, updateFilterBy] = useState("")

    function handleChange(value) {
        updateFilterBy(value)
        axios.get(backend_domain + "/parties_to_policy").then((res) => {
            console.log(res.data)
        })
    }

    return (
        <Grid container direction={"row"} alignItems={"center"} justifyContent={"flex-end"} paddingX={4} spacing={4}>
            <Grid item>
                <Typography>Select a policy to view:</Typography>
            </Grid>
            <Grid item xs>
                <FormControl fullWidth>
                    <InputLabel id="demo">View</InputLabel>
                    <Select
                        labelId="demo"
                        value={filterBy}
                        label="View"
                        onChange={(event) => handleChange(event.target.value)}
                    >
                        {listOfPolicies.map((policy) => {
                            return <MenuItem value={policy.policyName}>{policy.policyName}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}




function Stats({ backend_domain }) {

    const [dataForPieChart, updatePieChart] = useState([])

    // useEffect(() => {
    //     axios.get(backend_domain + "/get_all_policies").then((res) => {
    //         updateListOfPolicies(res.data)
            
    //     })
    // }, [])

    // updatePieChart(listOfPolicies.map((policy) => {
    //     return {"x": policy.policyName, "y"}
    // }))

    return (
        <>
            <Typography variant="h2" align="left">Statistics</Typography>
            <Typography variant="h5" color={"gray"} align="left">See insights about how other people voted against politicians</Typography>

            <Stack>
                <StatsRow title={"Worst Politicians By Party"} description={"Sorted by count"}><Leaderboard small backend_domain={backend_domain} query={"/worstfromparties"}></Leaderboard></StatsRow>
                <StatsRow title={"Distribution of Votes Against Parties"} description={"Dope Pie Chart Bro!"} alternate><PieChart ></PieChart><FilterByPoliciesMenu backend_domain={backend_domain}></FilterByPoliciesMenu></StatsRow>

                
            </Stack>
        </>
    );
}

export default Stats;