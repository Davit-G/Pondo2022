import React, { useState, useEffect } from 'react';
import { Typography, Stack, Grid } from '@mui/material';
import Leaderboard from './leaderboard';
import { VictoryPie } from "victory";

function StatsRow({ title, description, children, alternate }) {
    return (
        <>
            <Stack justifyContent={"space-around"} marginY={3} padding={8} direction={"row"} style={{ borderStyle: "solid", borderRadius: "20px",  borderWidth: "1px", padding: "16px", width: "100%", height: "auto" }}>
                {
                    alternate ? <div style={{width: "50%"}}>
                        {children}
                    </div> : null
                }
                <Stack>
                    <Typography padding={2} variant={"h4"} align={alternate ? "right" : "left"}>{title}</Typography>
                    <Typography padding={2} variant={"h6"} align={alternate ? "right" : "left"}>{description}</Typography>
                </Stack>
                {
                    !alternate ? <div style={{width: "50%"}}>
                        {children}
                    </div> : null
                }
            </Stack>
        </>
    );
}

function PieChart({data}) {
    return ( <VictoryPie
        color={"white"}
        colorScale={["#2abcff", "#ecff17", "#0152f5"]}
    ></VictoryPie> );
}


function Stats({ backend_domain }) {
    return (
        <>
            <Typography variant="h2" align="left">Statistics</Typography>
            <Typography variant="h5" color={"gray"} align="left">See insights about how other people voted against politicians</Typography>
            <Stack>
                <StatsRow title={"Worst Politicians By Party"} description={"Sorted by count"}><Leaderboard small backend_domain={backend_domain} query={"/worstfromparties"}></Leaderboard></StatsRow>
                <StatsRow title={"Distribution of Votes Against Parties"} description={"Dope Pie Chart Bro!"} alternate><PieChart></PieChart></StatsRow>
            </Stack>
        </>
    );
}

export default Stats;