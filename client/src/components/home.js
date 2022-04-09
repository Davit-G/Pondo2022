import React, { useState, useEffect } from 'react';

import { Grid, Button, Typography, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Dan from "../assets/danandrews.jpeg"
import axios from 'axios';

function capitalize(mySentence) {
    if (mySentence) {
        let words = mySentence.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join(" ");;
    }
    return ""   
}


function Home({ backend_domain }) {

    const [competitors, updateCompetitors] = useState([{}, {}])
    const [policyData, updatePolicyData] = useState({})
    const [showCard, updateShowCard] = useState(false)

    function getNewPair() {
        axios.get(backend_domain + "/random_politicians").then((res) => {
            updateCompetitors(res.data.data)
            console.log(res.data.data)
        })
        axios.get(backend_domain + "/random_policy").then((res) => {
            updatePolicyData(res.data.data[0])
            console.log(res.data.data[0])
        })
    }

    useEffect(() => {
        // make the request for data here
        getNewPair()
    }, []) //add this double slash BS so that it doesnt infinity loop itself out of existence

    function handleVote(index) {
        console.log(index) //handle a vote, do post request here
        updateShowCard(true)
        axios.post(backend_domain + "/vote", {
            better_politician_id: competitors[index]["person_id"],
            worse_politician_id: competitors[(index + 1) % 2]["person_id"],
        })
    }

    function handleContinue() {
        updateShowCard(false)
        getNewPair()
    }

    return (
        <div>
            <Typography pb={3} variant="h5" align="center">Two parliamentary opinions on this policy:</Typography>
            <Typography pb={3} variant="h4" align="center">{capitalize(policyData.policyName)}</Typography>
            <Typography pb={6} variant="h6" color={"gray"} align="center">{(policyData.policyDesc ? policyData.policyDesc[0].toUpperCase() + policyData.policyDesc.substr(1) + "." : "")}</Typography>
            {/*  So this container is a parent flexbox component that wraps everything */}
            <Grid container spacing={8} direction={"row"} justifyContent={"space-around"}>
                {/* Each "grid item" element is like a child of the flexbox parent. xs just means share width equally */}
                {Card(showCard, competitors, policyData, handleVote, handleContinue, 0)}
                {Card(showCard, competitors, policyData, handleVote, handleContinue, 1)}
            </Grid>
            <Outlet></Outlet>
        </div>
    );
}

export default Home;

function Card(showCard, competitors, policyData, handleVote, handleContinue, ind) {
    return <Grid item xs>
        <div style={{ height: "auto" }}>
            {showCard ?
                <>
                    <Typography align={"center"} variant={"h2"}>{competitors[ind]["first"] + " " + competitors[ind]["last"]}</Typography>
                    <Typography pb={2} align={"center"} color={"gray"} variant={"h6"}>{(competitors[ind]["roles"] === "" ? "" : competitors[ind]["roles"] + " in the ") + competitors[ind]["party"]}</Typography>
                    <div style={{ backgroundColor: "black" }}>
                        <img style={{ borderRadius: "10px", width: "100%", height: "400px", objectFit: "cover" }} src={competitors[ind]["image"]} alt={"contender " + ind} />
                    </div>
                </>
                : <Stack padding={4}>
                    <Typography py={1} variant={"h5"}></Typography>
                </Stack>}

        </div>
        {!showCard ?
            <Button style={{ marginTop: "12px" }} onClick={() => { handleVote(1); }} fullWidth variant="contained">This politician is worse</Button>
            : <Button style={{ marginTop: "12px" }} onClick={() => { handleContinue(1); }} fullWidth variant="contained">Continue</Button>}
    </Grid>;
}
