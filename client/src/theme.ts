// @ts-nocheck

import {createMuiTheme} from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 30,
                textTransform: 'none',
                fontWeight: 700,
            },
            outlinedPrimary: {
                borderColor: "rgb(29, 161, 243)",
            },
            contained: {
                boxShadow: "none",
            },
        },
        MuiIconButton: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(29, 155, 240, 0.1) !important",
                    "& svg": {
                        color: "rgb(29, 155, 240) !important",
                    },
                },
            },
        },
        MuiPaper: {
            root: {
                borderRadius: 0,
                border: "1px solid rgb(56, 68, 77)",
            },
            outlined: {
                borderRadius: 0,
                border: "1px solid rgb(56, 68, 77)",
            },
            elevation1: {
                boxShadow: "none"
            },
            elevation8: {
                boxShadow: "none"
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
        background: {
            default: "rgb(21, 32, 43)",
            paper: "rgb(21, 32, 43)", // theme.palette.background.paper
        },
        primary: {
            light: "rgb(142, 205, 247)",
            main: "rgb(29, 155, 240)", // theme.palette.primary.main
            dark: "rgb(26, 140, 216)",
        },
        secondary: {
            light: "rgb(29, 155, 240, 0.1)", // theme.palette.secondary.light (hover icons, buttons etc) NOT USED // "rgb(25, 39, 52)"
            main: "rgb(25, 39, 52)", // theme.palette.secondary.main (hover icons, buttons etc)
            dark: "rgb(255, 255, 255, 0.03)", // theme.palette.secondary.dark (hover tweet)
        },
        error: {
            light: "rgb(255, 221, 237)",
            main: "rgb(244, 33, 46)", // theme.palette.error.main
            dark: "rgb(202, 32, 85)", // theme.palette.error.dark  (hover)
        },
        // info: {
        //     light: "rgb(207, 217, 222)", // theme.palette.info.light
        //     main: "rgb(207, 217, 222)", // theme.palette.info.main WHITE
        //     dark: "",
        // },
        text: {
            primary: "rgb(255, 255, 255)",  // theme.palette.text.primary
            secondary: "rgb(136, 153, 166)", // theme.palette.text.secondary
        },
        action: {
            disabledBackground: "rgb(29, 155, 240, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
        },
        divider: "rgb(56, 68, 77)", // theme.palette.divider
        common: {
            black: "rgb(15, 20, 25)",  // theme.palette.common.black
            white: "rgb(255, 255, 255)",  // theme.palette.common.white
        },
        grey: {
            "100": "rgb(61, 84, 102)",
        },
    },
})

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
        background: {
            default: "#fff",
        },
        primary: {
            light: "rgb(142, 205, 247)",
            main: "rgb(29, 155, 240)", // theme.palette.primary.main
            dark: "rgb(26, 140, 216)",
            contrastText: "rgb(255, 255, 255)",
        },
        secondary: {
            light: "rgb(29, 155, 240, 0.1)", // theme.palette.secondary.light (hover icons, buttons etc) NOT USED
            main: "rgb(245, 248, 250)", // theme.palette.secondary.main (hover icons, buttons etc)
            dark: "rgb(239, 241, 242)", // theme.palette.secondary.dark (hover tweet)
        },
        error: {
            light: "rgb(255, 221, 237)",
            main: "rgb(244, 33, 46)", // theme.palette.error.main
            dark: "rgb(202, 32, 85)", // theme.palette.error.dark  (hover)
        },
        info: {
            light: "rgb(207, 217, 222)", // theme.palette.info.light
            main: "rgb(207, 217, 222)", // theme.palette.info.main WHITE
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
            disabledBackground: "rgb(153 216 255)",
            disabled: '#fff',
        },
        divider: "rgb(239, 243, 244)", // theme.palette.divider
        common: {
            black: "rgb(15, 20, 25)",  // theme.palette.common.black
            white: "rgb(255, 255, 255)",  // theme.palette.common.white
        },
        grey: {
            "100": "#C4C4C4",
        },
        // custom: {
        //     hover: pale "rgb(29, 155, 240, 0.1)",  // theme.palette.custom.hover
        // },
        // background-color: rgb(244, 248, 251);
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 30,
                textTransform: 'none',
                fontWeight: 700,
            },
            outlinedPrimary: {
                borderColor: "rgb(29, 161, 243)",
            },
            contained: {
                boxShadow: "none",
                "&:hover": {
                    boxShadow: "none",
                },
            },
        },
        MuiIconButton: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(29, 155, 240, 0.1) !important",
                    "& svg": {
                        color: "rgb(29, 155, 240) !important",
                    },
                },
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
            elevation1: {
                boxShadow: "none"
            },
            elevation8: {
                boxShadow: "none"
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
