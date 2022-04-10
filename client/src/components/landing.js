import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Box } from 'victory';

import AppUI from "../assets/appui.png";
import Leaderboard from '../assets/leaderboard.png';

function Landing({ backend_domain }) {
    return (
        <>
            <Container>
                <Paper elevation={2}>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <Typography padding={8} variant="h1" align="center">Cards Against Australia</Typography>
                        <Typography paddingX={8} py={4} variant="h6" color="">Cards against Australia makes it easy to learn about previous policies that have been voted on by members of parliament. The app provides users with a gamified voting component, where users must decide which mystery politician had the worst vote on a given policy topic.</Typography>
                        <img src={AppUI} alt="The App" style={{ padding: "20px", borderRadius: "10px", width: "90%", height: "400px", objectFit: "cover" }} />
                        <Typography paddingX={4} py={0} variant="subtitle1" color="gray">Play Now!</Typography>
                        <Button style={{margin: "12px", width:"30%"}} variant='contained' href='/game'>Play</Button>

                        <Typography paddingX={8} py={4} variant="h6" color="">There is a leaderboard which shows player consensus on which candidates are hated the most. There is also a sort option, which lets users sort candidates by count, first name and more.</Typography>
                        <img src={Leaderboard} alt="The App" style={{ padding: "20px", borderRadius: "10px", width: "90%", height: "400px", objectFit: "cover" }} />
                        <Typography paddingX={4} py={0} variant="subtitle1" color="gray">Check the leaderboard now!</Typography>
                        <Button style={{margin: "12px", width:"30%"}} variant='contained' href='/leaderboard'>Leaderboards</Button>
                    </Stack>
                </Paper>
            </Container>

        </>
    );
}

export default Landing;