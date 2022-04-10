import React, { useState, useEffect } from 'react';
import { Typography, Stack, Grid, TextField, Checkbox, MenuItem, Select, InputLabel, FormControl, FormControlLabel } from '@mui/material';
import Leaderboard from './leaderboard';
import { VictoryPie } from "victory";
import axios from 'axios';

function StatsRow({ title, description, children, alternate }) {
    return (
        <>
            <Stack justifyContent={"space-around"} marginY={3} padding={4} direction={alternate ? "column" : "row"} style={{ borderStyle: "solid", borderRadius: "20px", borderWidth: "1px", padding: "16px", width: "100%", height: "auto" }}>
                <Stack>
                    <Typography padding={2} variant={"h4"} align={"left"}>{title}</Typography>
                    <Typography padding={2} variant={"h6"} align={"left"}>{description}</Typography>
                </Stack>
                <div style={{ height: alternate ? "800px" : "auto" }}>
                    {children}
                </div>
            </Stack>
        </>
    );
}

function PieChart({ data }) {
    return (<VictoryPie
        data={data}
        labelRadius={({ innerRadius }) => innerRadius + 60 + 90 * Math.random()}
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

function FilterByPoliciesMenu({ backend_domain, parties_to_policy, updatePieChart }) {

    const [listOfPolicies, updateListOfPolicies] = useState([])
    const [filterBy, updateFilterBy] = useState("22")


    useEffect(() => {
        axios.get(backend_domain + "/get_all_policies").then((res) => {
            updateListOfPolicies(res.data)
            handleChange(filterBy, "")
        })
        
    }, [])

    

    function handleChange(value, bruh) {
        updateFilterBy(value)
        updatePieChart([{ "x": "Calculating Response...", "y": 100 }])
        axios.get(backend_domain + "/parties_to_policy?id=" + value).then((res) => {
            console.log(res.data)
            let pieData = []
            for (var key in res.data) {
                let onePartyData = res.data[key]
                let agreementSum = onePartyData.agreementSum
                let numVotes = onePartyData.numVotes
                if (numVotes > 0) {
                    if (agreementSum > 10) {
                        pieData.push({ "x": key, "y": agreementSum })
                    }
                }
            }
            updatePieChart(pieData)
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
                        onChange={(event) => handleChange(event.target.value, event.target.desc)}
                    >
                        {listOfPolicies.map((policy) => {
                            return <MenuItem desc={policy.policyDesc} value={policy.id}>{policy.policyName}</MenuItem>
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
                <StatsRow title={"Distribution of Votes Against Parties"} description={""} alternate>
                    <FilterByPoliciesMenu updatePieChart={(data) => updatePieChart(data)} backend_domain={backend_domain}>
                    </FilterByPoliciesMenu>
                    <PieChart data={dataForPieChart}></PieChart>
                </StatsRow>


            </Stack>
        </>
    );
}

export default Stats;