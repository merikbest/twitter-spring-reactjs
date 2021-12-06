// @ts-nocheck

import {createMuiTheme} from '@material-ui/core/styles';
import {deepmerge} from '@mui/utils';

const commonTheme = {
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
        error: {
            light: "rgb(255, 221, 237)",
            main: "rgb(244, 33, 46)",
            dark: "rgb(202, 32, 85)",
        },
        info: {
            light: "rgb(207, 217, 222)",
            main: "rgb(207, 217, 222)",
            dark: "",
        },
        common: {
            black: "rgb(15, 20, 25)",
            white: "rgb(255, 255, 255)",
        },
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 30,
                textTransform: 'none',
                fontWeight: 700,
            },
            contained: {
                boxShadow: "none",
                "&:hover": {
                    boxShadow: "none",
                },
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
                },
            },
        },
    },
}

export const dimTheme = createMuiTheme(deepmerge({
    palette: {
        background: {
            default: "rgb(21, 32, 43)",
            paper: "rgb(21, 32, 43)",
        },
        secondary: {
            light: "rgb(29, 155, 240, 0.1)",
            main: "rgb(25, 39, 52)",
            dark: "rgb(255, 255, 255, 0.03)",
        },
        text: {
            primary: "rgb(255, 255, 255)",
            secondary: "rgb(136, 153, 166)",
        },
        divider: "rgb(56, 68, 77)",
        grey: {
            "100": "rgb(61, 84, 102)",
            "200": "rgb(37, 51, 65)",
            "300": "rgb(136, 153, 166)",
            "400": "rgb(29, 41, 54)",
            "500": "rgb(78, 92, 104)",
        },
    },
    overrides: {
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
    },
}, commonTheme));

export const lightsOutTheme = createMuiTheme(deepmerge({
    palette: {
        background: {
            default: "rgb(0, 0, 0)",
            paper: "rgb(0, 0, 0)",
        },
        secondary: {
            light: "rgb(29, 155, 240, 0.1)",
            main: "rgb(21, 24, 28)",
            dark: "rgb(255, 255, 255, 0.03)",
        },
        text: {
            primary: "rgb(217, 217, 217)",
            secondary: "rgb(110, 118, 125)",
        },
        divider: "rgb(47, 51, 54)",
        grey: {
            "100": "rgb(47, 51, 54)",
            "200": "rgb(32, 35, 39)",
            "300": "rgb(110, 118, 125)",
            "400": "rgb(32, 35, 39, 0.5)",
            "500": "rgb(110, 118, 125, 0.5)",
        },
    },
    overrides: {
        MuiPaper: {
            root: {
                borderRadius: 0,
                border: "1px solid rgb(47, 51, 54)",
            },
            outlined: {
                borderRadius: 0,
                border: "1px solid rgb(47, 51, 54)",
            },
            elevation1: {
                boxShadow: "none"
            },
            elevation8: {
                boxShadow: "none"
            },
        },
    },
}, commonTheme));

export const defaultTheme = createMuiTheme(deepmerge({
    palette: {
        background: {
            default: "rgb(255, 255, 255)",
            paper: "rgb(255, 255, 255)",
        },
        secondary: {
            light: "rgb(29, 155, 240, 0.1)",
            main: "rgb(245, 248, 250)",
            dark: "rgb(239, 241, 242)",
        },
        text: {
            primary: "rgb(15, 20, 25)",
            secondary: "rgb(83, 100, 113)",
        },
        divider: "rgb(239, 243, 244)",
        grey: {
            "100": "#C4C4C4",
            "200": "rgb(239, 243, 244)",
            "300": "rgb(136, 153, 166)",
            "400": "rgb(239, 243, 244)",
            "500": "rgb(83, 100, 113, 0.5)",
        },
    },
    overrides: {
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
    },
}, commonTheme));

export const blueColor = {
    palette: {
        primary: {
            light: "rgb(142, 205, 247)",
            main: "rgb(29, 155, 240)",
            dark: "rgb(26, 140, 216)",
        },
        action: {
            disabledBackground: "rgb(29, 155, 240, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
        },
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(29, 155, 240)",
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
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(29, 155, 240)",
                },
            },
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1,
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(107, 201, 251)",
                    opacity: 1,
                },
                "&.Mui-checked": {
                    color: "rgb(29, 155, 240)",
                }
            },
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(29, 155, 240, 0.1)",
                },
            },
        },
    },
};

export const yellowColor = {
    palette: {
        primary: {
            light: "rgb(255, 234, 128)",
            main: "rgb(255, 212, 0)",
            dark: "rgb(255, 255, 0)",
        },
        action: {
            disabledBackground: "rgb(255, 212, 0, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
        },
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(255, 212, 0)",
            },
        },
        MuiIconButton: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(255, 212, 0, 0.1) !important",
                    "& svg": {
                        color: "rgb(255, 212, 0) !important",
                    },
                },
            },
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(255, 212, 0)",
                },
            },
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1,
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(255, 235, 107)",
                    opacity: 1,
                },
                "&.Mui-checked": {
                    color: "rgb(255, 212, 0)",
                }
            },
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(255, 212, 0, 0.1)",
                },
            },
        },
    },
};

export const crimsonColor = {
    palette: {
        primary: {
            light: "rgb(252, 140, 192)",
            main: "rgb(249, 24, 128)",
            dark: "rgb(249, 24, 128)",
        },
        action: {
            disabledBackground: "rgb(249, 24, 128, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
        },
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(249, 24, 128)",
            },
        },
        MuiIconButton: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(249, 24, 128, 0.1) !important",
                    "& svg": {
                        color: "rgb(249, 24, 128) !important",
                    },
                },
            },
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(249, 24, 128)",
                },
            },
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1,
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(252, 140, 192)",
                    opacity: 1,
                },
                "&.Mui-checked": {
                    color: "rgb(249, 24, 128)",
                }
            },
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(249, 24, 128, 0.1)",
                },
            },
        },
    },
};

export const violetColor = {
    palette: {
        primary: {
            light: "rgb(188, 171, 255)",
            main: "rgb(120, 86, 255)",
            dark: "rgb(120, 86, 255)",
        },
        action: {
            disabledBackground: "rgb(120, 86, 255, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
        },
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(120, 86, 255)",
            },
        },
        MuiIconButton: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(120, 86, 255, 0.1) !important",
                    "& svg": {
                        color: "rgb(120, 86, 255) !important",
                    },
                },
            },
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(120, 86, 255)",
                },
            },
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1,
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(188, 171, 255)",
                    opacity: 1,
                },
                "&.Mui-checked": {
                    color: "rgb(120, 86, 255)",
                }
            },
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(120, 86, 255, 0.1)",
                },
            },
        },
    },
};

export const orangeColor = {
    palette: {
        primary: {
            light: "rgb(255, 189, 128)",
            main: "rgb(255, 122, 0)",
            dark: "rgb(255, 122, 0)",
        },
        action: {
            disabledBackground: "rgb(255, 122, 0, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
        },
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(255, 122, 0)",
            },
        },
        MuiIconButton: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(255, 122, 0, 0.1) !important",
                    "& svg": {
                        color: "rgb(255, 122, 0) !important",
                    },
                },
            },
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(255, 122, 0)",
                },
            },
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1,
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(255, 189, 128)",
                    opacity: 1,
                },
                "&.Mui-checked": {
                    color: "rgb(255, 122, 0)",
                }
            },
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(255, 122, 0, 0.1)",
                },
            },
        },
    },
};

export const greenColor = {
    palette: {
        primary: {
            light: "rgb(128, 221, 190)",
            main: "rgb(0, 186, 124)",
            dark: "rgb(0, 186, 124)",
        },
        action: {
            disabledBackground: "rgb(0, 186, 124, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
        },
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(0, 186, 124)",
            },
        },
        MuiIconButton: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(0, 186, 124, 0.1) !important",
                    "& svg": {
                        color: "rgb(0, 186, 124) !important",
                    },
                },
            },
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(0, 186, 124)",
                },
            },
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1,
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(128, 221, 190)",
                    opacity: 1,
                },
                "&.Mui-checked": {
                    color: "rgb(0, 186, 124)",
                }
            },
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(0, 186, 124, 0.1)",
                },
            },
        },
    },
};
