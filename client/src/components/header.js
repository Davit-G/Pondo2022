import React, { useState, useEffect } from 'react';

import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/material';

import { Link, Outlet } from 'react-router-dom'; // the actual stateful thing used by react router
import { Link as StyledLink } from "@mui/material" //the styling from MUI

function NavBarLink({ to, children }) {
    return (
        <Grid margin={4}>
            <StyledLink component={Link} underline="hover" variant="h5" to={to}>{children}</StyledLink>
        </Grid>
    );
}

function Header({ }) {
    return (
        <div style={{ padding: "12px" }}>
            <Grid container justifyContent={"center"} spacing={4}>
                <NavBarLink to="/">Home</NavBarLink>
                <NavBarLink to="leaderboard">Leaderboards</NavBarLink>
                <NavBarLink to="stats">Statistics</NavBarLink>
                <NavBarLink to="login">Login</NavBarLink>
                <NavBarLink to="?">?</NavBarLink>
            </Grid>

        </div>
    );
}

export default Header;