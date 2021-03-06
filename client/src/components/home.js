import React, { useState, useEffect } from 'react';

import { Grid, Button, Typography, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Dan from "../assets/danandrews.jpeg"
import axios from 'axios';

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
};

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

    const [policyData, updatePolicyData] = useState({})
    const [showCard, updateShowCard] = useState(false)
    const [firstPol, setFirstPol] = useState(null);
    const [secondPol, setSecondPol] = useState(null);

    function getNewPair() {
        axios.get(backend_domain + "/random_policy").then(async (res) => {
            const pd = res.data.data[0];
            updatePolicyData(pd)
            console.log('outputting policy data');
            console.log(pd)
            const parts = pd.participants;

            // select random for and against participants
            shuffle(parts);
            const forParticipant = parts.find(({agreement, voted}) => voted && agreement < 50.0);
            const againstParticipant = parts.find(({agreement, voted}) => voted && agreement > 50.0);

            const a = (await axios.get(backend_domain + `/politician/${forParticipant['person_id']}`)).data;
            const first = {...forParticipant, ...a};
            const b = (await axios.get(backend_domain + `/politician/${againstParticipant['person_id']}`)).data;
            const second = {...againstParticipant, ...b};

            setFirstPol(first);
            setSecondPol(second);
        })
    }

    useEffect(() => {
        // make the request for data here
        getNewPair()
    }, []) //add this double slash BS so that it doesnt infinity loop itself out of existence

    function handleVote(betterParticipant, worseParticipant) {
        updateShowCard(true)
        axios.post(backend_domain + "/vote", {
            better_politician_id: betterParticipant["person_id"],
            worse_politician_id: worseParticipant["person_id"],
        })
    }

    function handleContinue() {
        updateShowCard(false)
        getNewPair()
    }

    return (
        <div>
            <Grid container justifyContent={"center"}>
                <Grid item xs={8}>
                <Typography mb={3} variant="h3" style={{ borderRadius: "20px", padding: "32px"}} align="center">{capitalize(policyData.policyName)}</Typography>
                </Grid>
            </Grid>
            <Typography pb={6} variant="h6" color={"gray"} align="center">{(policyData.policyDesc ? policyData.policyDesc[0].toUpperCase() + policyData.policyDesc.substr(1) + "." : "")}</Typography>
            {/*  So this container is a parent flexbox component that wraps everything */}
            <Grid container spacing={8} direction={"row"} justifyContent={"space-around"}>
                {/* Each "grid item" element is like a child of the flexbox parent. xs just means share width equally */}
                {Card(showCard, [firstPol, secondPol], policyData, handleVote, handleContinue, 0)}
                {Card(showCard, [firstPol, secondPol], policyData, handleVote, handleContinue, 1)}
            </Grid>
            {
                showCard ?
                <Button style={{ marginTop: "12px", fontSize: "20px" }} onClick={() => { handleContinue(1); }} fullWidth variant="contained">Continue</Button>
                : null
            }
            
            <Outlet></Outlet>
        </div>
    );
}

export default Home;

function Card(showCard, competitors, policyData, handleVote, handleContinue, ind) {
    if(competitors.includes(null)) return <p>loading</p>;
    return <Grid item xs>
        <div style={{ height: "auto" }}>
            {
            showCard ?
                <>
                    <Typography align={"center"}variant={"h4"}>{competitors[ind]["first"] + " " + competitors[ind]["last"] + " voted " + (competitors[ind].agreement < 50.0 ? "for" : "against") + "!"}</Typography>
                    <Typography pb={2} align={"center"} color={"gray"} variant={"h6"}>{competitors[ind]["party"]}</Typography>
                    
                    <div style={{ backgroundColor: "black" }}>
                        <img style={{ borderRadius: "10px", width: "100%", height: "400px", objectFit: "cover" }} src={competitors[ind]["image"]} alt={"contender " + ind} />
                    </div>
                </>
            : 
                <>
                    <Stack justifyContent={"center"} style={{borderRadius: "10px", height: "400px", backgroundColor: competitors[ind].agreement < 50.0 ? "rgb(88 173 88)" : "rgb(179 73 73)"}}>
                        <Typography color={"white"} variant={"h4"} align={"center"}>This politician voted {competitors[ind].agreement < 50.0 ? "for." : "against."}</Typography>
                    </Stack>
                </>
            }

        </div>
        {!showCard ?
            <Button style={{ marginTop: "12px", fontSize: "20px" }} onClick={() => {handleVote(competitors[ind], competitors[ind ^ 1])}} fullWidth variant="contained">I think this politician's vote is worse</Button>
            : null}
    </Grid>;
}
