import React, { useState, useEffect } from 'react';

import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/material';

import { Link, Outlet } from 'react-router-dom'; // the actual stateful thing used by react router
import { Link as StyledLink } from "@mui/material" //the styling from MUI

function NavBarLink({ to, children, notRouted }) {
    return (
        <Grid marginX={4} marginY={2}>
            {
                notRouted ?
                <StyledLink underline="hover" variant="h6" href={to}>{children}</StyledLink>
                    :
                    <StyledLink component={Link} underline="hover" variant="h6" to={to}>{children}</StyledLink>
            }
        </Grid>
    );
}

function Header({ }) {
    return (
        <div style={{ padding: "4px" }}>
            <Grid container justifyContent={"center"} spacing={4}>
                <NavBarLink to="/">Home</NavBarLink>
                <NavBarLink to="game">Game</NavBarLink>
                <NavBarLink to="leaderboard">Leaderboards</NavBarLink>
                <NavBarLink to="stats">Statistics</NavBarLink>
                <NavBarLink notRouted to="https://devpost.com/software/cards-against-australia">About</NavBarLink>
            </Grid>

        </div>
    );
}

export default Header;