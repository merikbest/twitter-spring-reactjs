// @ts-nocheck

import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Ubuntu',
            'Helvetica Neue',
            'sans-serif',
        ],
    },
    palette: {
        primary: {
            light: "rgb(142, 205, 247)",
            main: "rgb(29, 155, 240)",
            dark: "rgb(26, 140, 216)",
            contrastText: "rgb(255, 255, 255)",
        },
        secondary: {
            main: "rgb(26, 145, 218)", // theme.palette.secondary.main
        },
        error: {
            light: "rgb(255, 221, 237)",
            main: "rgb(244, 33, 46)", // theme.palette.error.main
            dark: "rgb(202, 32, 85)", // theme.palette.error.dark  (hover)
        },
        info: {
            light: "",
            main: "rgb(255, 255, 255)", // theme.palette.info.main
            dark: "",
        },
        background: {
            default: "rgb(255, 255, 255)",
        },
        text: {
            primary: "rgb(15, 20, 25)",  // theme.palette.text.primary
            secondary: "rgb(83, 100, 113)", // theme.palette.text.secondary
        },
        action: {
            disabledBackground: 'rgb(153 216 255)',
            disabled: '#fff',
        },
        divider: "rgb(239, 243, 244)" // theme.palette.divider

    },

    shadows: [],
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 30,
                textTransform: 'none',
                fontWeight: 700,
            },
            outlinedPrimary: {
                borderColor: 'rgb(29, 161, 243)',
            },
        },
        MuiPaper: {
            root: {
                borderRadius: 0,
                border: "1px solid rgb(239, 243, 244)",
            },
            outlined: {
                borderRadius: 0,
                border: "1px solid rgb(239, 243, 244)",
            },
        },
        MuiFilledInput: {
            underline: {
                '&:after': {
                    borderBottomWidth: '2px',
                },
                '&:before': {
                    borderColor: '#000',
                    borderBottomWidth: '2px',
                },
            },
            input: {
                // backgroundColor: 'rgb(245, 248, 250)',
            },
        },
        MuiDialog: {
            paper: {
                borderRadius: 15,
            },
        },
        MuiDialogActions: {
            root: {
                marginBottom: 8,
            },
        },
        MuiDialogTitle: {
            root: {
                borderBottom: '1px solid rgb(204, 214, 221)',
                marginBottom: 10,
                padding: '10px 15px',
                '& h2': {
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 800,
                },
                '& button': {
                    padding: 8,
                    // marginRight: 20,
                },
            },
        },
    },
});

export default theme;
