import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/material';

function Header({ }) {
    return (
        <div style={{padding: "12px"}}>
            <Grid container justifyContent={"center"} spacing={4}>
                <Grid margin={2}>
                    <h3>Home</h3>
                </Grid>
                <Grid margin={2}>
                    <h3>Leaderboard</h3>
                </Grid>
                <Grid margin={2}>
                    <h3>Login</h3>
                </Grid>
                <Grid margin={2}>
                    <h3>?</h3>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header;