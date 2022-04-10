import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';




function ThemeWrapper({ }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                components: {

                },
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                    ...(!prefersDarkMode
                        ? {
                            // palette values for light mode
                            // background: {
                            //     default: "inear-gradient(to right, #00416a, #e4e5e6)"
                            // },
                            // divider: amber[200],
                            
                        }
                        : {
                            // background: {
                            //     default: "inear-gradient(to right, #00416a, #e4e5e6)"
                            // },
                            // palette values for dark mode
                            // primary: "orange",
                            // divider: deepOrange[700],
                            // background: {
                            //     default: deepOrange[900],
                            //     paper: deepOrange[900],
                            // },
                            // text: {
                            //     primary: '#fff',
                            //     secondary: grey[500],
                        // },
                        }),
                }
            }),
        [prefersDarkMode],
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App theme={prefersDarkMode} />
        </ThemeProvider>
    );
}

export default ThemeWrapper;


ReactDOM.render(

    <React.StrictMode>
        <ThemeWrapper />
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
