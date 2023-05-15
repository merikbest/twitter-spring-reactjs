// @ts-nocheck

import { createTheme } from "@material-ui/core/styles";
import { deepmerge } from "@mui/utils";

const commonTheme = {
    typography: {
        fontFamily: [
            "system-ui",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Ubuntu",
            "Helvetica Neue",
            "sans-serif"
        ]
    },
    palette: {
        error: {
            light: "rgb(255, 221, 237)",
            main: "rgb(244, 33, 46)",
            dark: "rgb(202, 32, 85)"
        },
        common: {
            black: "rgb(15, 20, 25)",
            white: "rgb(255, 255, 255)"
        }
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 30,
                textTransform: "none",
                height: 36
            },
            contained: {
                boxShadow: "none",
                "&:hover": {
                    boxShadow: "none"
                }
            },
            sizeSmall: {
                height: 32,
                padding: "0px 16px"
            },
            sizeLarge: {
                height: 44,
                "& .MuiButton-label": {
                    fontSize: 15,
                    fontWeight: 700,
                    lineHeight: "20px"
                }
            },
            label: {
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "16px"
            }
        },
        MuiFilledInput: {
            underline: {
                "&:after": {
                    borderBottomWidth: "2px"
                },
                "&:before": {
                    borderColor: "#000",
                    borderBottomWidth: "2px"
                }
            }
        },
        MuiDialog: {
            paper: {
                borderRadius: 15
            }
        },
        MuiDialogActions: {
            root: {
                marginBottom: 8
            }
        },
        MuiDialogTitle: {
            root: {
                padding: "5px 15px",
                marginBottom: 0,
                "& h2": {
                    display: "flex",
                    alignItems: "center",
                    fontSize: 20,
                    fontWeight: 800,
                    lineHeight: "24px"
                }
            }
        },
        MuiIconButton: {
            root: {
                padding: 0,
                minWidth: 35,
                minHeight: 35,
                "& svg": {
                    height: "1.25rem",
                    width: "1.25rem"
                }
            },
            sizeSmall: {
                padding: 0,
                minWidth: 35,
                minHeight: 35,
                "& svg": {
                    height: "1.172rem",
                    width: "1.172rem"
                }
            }
        },
        MuiList: {
            padding: {
                paddingTop: 0,
                paddingBottom: 0
            }
        },
        MuiListItemAvatar: {
            root: {
                minWidth: 0
            }
        },
        MuiTypography: {
            h3: {
                fontSize: 23,
                fontWeight: 700,
                lineHeight: "28px"
            },
            h4: {
                marginBottom: 8,
                fontSize: 31,
                fontWeight: 800,
                lineHeight: "36px"
            },
            h5: {
                fontSize: 20,
                fontWeight: 800,
                lineHeight: "24px"
            },
            h6: {
                fontSize: 15,
                fontWeight: 800,
                lineHeight: "20px"
            },
            subtitle1: {
                fontSize: 15,
                fontWeight: 400,
                lineHeight: "20px"
            },
            subtitle2: {
                fontSize: 13,
                fontWeight: 400,
                lineHeight: "16px"
            },
            body1: {
                fontSize: 15,
                fontWeight: 400,
                lineHeight: "20px"
            },
            body2: {}
        }
    }
};

export const dimTheme = createTheme(deepmerge({
    palette: {
        background: {
            default: "rgb(21, 32, 43)",
            paper: "rgb(21, 32, 43)"
        },
        secondary: {
            light: "rgb(29, 155, 240, 0.1)",
            main: "rgb(25, 39, 52)",
            dark: "rgb(255, 255, 255, 0.03)"
        },
        text: {
            primary: "rgb(255, 255, 255)",
            secondary: "rgb(136, 153, 166)"
        },
        divider: "rgb(56, 68, 77)",
        grey: {
            "100": "rgb(61, 84, 102)",
            "200": "rgb(37, 51, 65)",
            "300": "rgb(136, 153, 166)",
            "400": "rgb(29, 41, 54)",
            "500": "rgb(78, 92, 104)",
            "600": "rgb(25, 39, 52)",
            "700": "rgb(61, 84, 102)",
            "800": "rgba(91, 112, 131, 0.4)"
        }
    },
    overrides: {
        MuiPaper: {
            root: {
                borderRadius: 0,
                border: "1px solid rgb(56, 68, 77)"
            },
            outlined: {
                borderRadius: 0,
                border: "1px solid rgb(56, 68, 77)"
            },
            elevation1: {
                boxShadow: "none"
            },
            elevation8: {
                boxShadow: "none"
            }
        },
        MuiTypography: {
            h3: {
                color: "rgb(255, 255, 255)"
            },
            h4: {
                color: "rgb(255, 255, 255)"
            },
            h5: {
                color: "rgb(255, 255, 255)"
            },
            h6: {
                color: "rgb(255, 255, 255)"
            },
            subtitle1: {
                color: "rgb(136, 153, 166)"
            },
            subtitle2: {
                color: "rgb(136, 153, 166)"
            },
            body1: {
                color: "rgb(255, 255, 255)"
            }
        },
        MuiButton: {
            contained: {
                color: "rgb(255, 255, 255)"
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(91, 112, 131, 0.4)"
            }
        },
        MuiDialogTitle: {
            root: {
                borderBottom: "1px solid rgb(56, 68, 77)"
            }
        }
    }
}, commonTheme));

export const lightsOutTheme = createTheme(deepmerge({
    palette: {
        background: {
            default: "rgb(0, 0, 0)",
            paper: "rgb(0, 0, 0)"
        },
        secondary: {
            light: "rgb(29, 155, 240, 0.1)",
            main: "rgb(21, 24, 28)",
            dark: "rgb(255, 255, 255, 0.03)"
        },
        text: {
            primary: "rgb(217, 217, 217)",
            secondary: "rgb(110, 118, 125)"
        },
        divider: "rgb(47, 51, 54)",
        grey: {
            "100": "rgb(47, 51, 54)",
            "200": "rgb(32, 35, 39)",
            "300": "rgb(110, 118, 125)",
            "400": "rgb(32, 35, 39, 0.5)",
            "500": "rgb(110, 118, 125, 0.5)",
            "600": "rgb(21, 24, 28)",
            "700": "rgb(47, 51, 54)",
            "800": "rgba(91, 112, 131, 0.4)"
        }
    },
    overrides: {
        MuiPaper: {
            root: {
                borderRadius: 0,
                border: "1px solid rgb(47, 51, 54)"
            },
            outlined: {
                borderRadius: 0,
                border: "1px solid rgb(47, 51, 54)"
            },
            elevation1: {
                boxShadow: "none"
            },
            elevation8: {
                boxShadow: "none"
            }
        },
        MuiTypography: {
            h3: {
                color: "rgb(217, 217, 217)"
            },
            h4: {
                color: "rgb(217, 217, 217)"
            },
            h5: {
                color: "rgb(217, 217, 217)"
            },
            h6: {
                color: "rgb(217, 217, 217)"
            },
            subtitle1: {
                color: "rgb(110, 118, 125)"
            },
            subtitle2: {
                color: "rgb(110, 118, 125)"
            },
            body1: {
                color: "rgb(217, 217, 217)"
            }
        },
        MuiButton: {
            contained: {
                color: "rgb(255, 255, 255)"
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(91, 112, 131, 0.4)"
            }
        },
        MuiDialogTitle: {
            root: {
                borderBottom: "1px solid rgb(47, 51, 54)"
            }
        }
    }
}, commonTheme));

export const defaultTheme = createTheme(deepmerge({
    palette: {
        background: {
            default: "rgb(255, 255, 255)",
            paper: "rgb(255, 255, 255)"
        },
        secondary: {
            light: "rgb(29, 155, 240, 0.1)",
            main: "rgb(245, 248, 250)",
            dark: "rgb(239, 241, 242)"
        },
        text: {
            primary: "rgb(15, 20, 25)",
            secondary: "rgb(83, 100, 113)"
        },
        divider: "rgb(239, 243, 244)",
        grey: {
            "100": "#C4C4C4",
            "200": "rgb(239, 243, 244)",
            "300": "rgb(136, 153, 166)",
            "400": "rgb(239, 243, 244)",
            "500": "rgb(83, 100, 113, 0.5)",
            "600": "rgb(247, 249, 249)",
            "700": "rgb(207, 217, 222)",
            "800": "rgba(0, 0, 0, 0.4)"
        }
    },
    overrides: {
        MuiPaper: {
            root: {
                borderRadius: 0,
                border: "1px solid rgb(239, 243, 244)"
            },
            outlined: {
                borderRadius: 0,
                border: "1px solid rgb(239, 243, 244)"
            },
            elevation1: {
                boxShadow: "none"
            },
            elevation8: {
                boxShadow: "none"
            }
        },
        MuiTypography: {
            h3: {
                color: "rgb(15, 20, 25)"
            },
            h4: {
                color: "rgb(15, 20, 25)"
            },
            h5: {
                color: "rgb(15, 20, 25)"
            },
            h6: {
                color: "rgb(15, 20, 25)"
            },
            subtitle1: {
                color: "rgb(83, 100, 113)"
            },
            subtitle2: {
                color: "rgb(83, 100, 113)"
            },
            body1: {
                color: "rgb(15, 20, 25)"
            }
        },
        MuiButton: {
            contained: {
                color: "rgb(15, 20, 25)"
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(0, 0, 0, 0.4)"
            }
        },
        MuiDialogTitle: {
            root: {
                borderBottom: "1px solid rgb(239, 243, 244)"
            }
        }
    }
}, commonTheme));

export const blueColor = {
    palette: {
        primary: {
            light: "rgb(142, 205, 247)",
            main: "rgb(29, 155, 240)",
            dark: "rgb(26, 140, 216)"
        },
        info: {
            light: "rgb(207, 217, 222)",
            main: "rgb(207, 217, 222)",
            dark: "rgb(2, 17, 61)"
        },
        action: {
            disabledBackground: "rgb(29, 155, 240, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
            hover: "rgb(29, 155, 240, 0.1)"
        }
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(29, 155, 240)"
            },
            textPrimary: {
                "&:hover": {
                    backgroundColor: "rgb(29, 155, 240, 0.1)"
                }
            }
        },
        MuiIconButton: {
            colorPrimary: {
                "&.Mui-disabled": {
                    "& svg": {
                        color: "rgb(142, 205, 247)"
                    }
                }
            },
            root: {
                "&:hover": {
                    backgroundColor: "rgb(29, 155, 240, 0.1) !important",
                    "& svg": {
                        color: "rgb(29, 155, 240) !important"
                    }
                }
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(29, 155, 240)"
                }
            }
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(107, 201, 251)",
                    opacity: 1
                },
                "&.Mui-checked": {
                    color: "rgb(29, 155, 240)"
                }
            }
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(29, 155, 240, 0.1)"
                }
            }
        }
    }
};

export const yellowColor = {
    palette: {
        primary: {
            light: "rgb(255, 234, 128)",
            main: "rgb(255, 212, 0)",
            dark: "rgb(255, 255, 0)"
        },
        info: {
            light: "rgb(207, 217, 222)",
            main: "rgb(207, 217, 222)",
            dark: "rgb(61, 30, 2)"
        },
        action: {
            disabledBackground: "rgb(255, 212, 0, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
            hover: "rgb(255, 212, 0, 0.1)"
        }
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(255, 212, 0)"
            },
            textPrimary: {
                "&:hover": {
                    backgroundColor: "rgb(255, 212, 0, 0.1)"
                }
            }
        },
        MuiIconButton: {
            colorPrimary: {
                "&.Mui-disabled": {
                    "& svg": {
                        color: "rgb(255, 234, 128)"
                    }
                }
            },
            root: {
                "&:hover": {
                    backgroundColor: "rgb(255, 212, 0, 0.1) !important",
                    "& svg": {
                        color: "rgb(255, 212, 0) !important"
                    }
                }
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(255, 212, 0)"
                }
            }
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(255, 235, 107)",
                    opacity: 1
                },
                "&.Mui-checked": {
                    color: "rgb(255, 212, 0)"
                }
            }
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(255, 212, 0, 0.1)"
                }
            }
        }
    }
};

export const crimsonColor = {
    palette: {
        primary: {
            light: "rgb(252, 140, 192)",
            main: "rgb(249, 24, 128)",
            dark: "rgb(249, 24, 128)"
        },
        info: {
            light: "rgb(207, 217, 222)",
            main: "rgb(207, 217, 222)",
            dark: "rgb(55, 1, 28)"
        },
        action: {
            disabledBackground: "rgb(249, 24, 128, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
            hover: "rgb(249, 24, 128, 0.1)"
        }
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(249, 24, 128)"
            },
            textPrimary: {
                "&:hover": {
                    backgroundColor: "rgb(249, 24, 128, 0.1)"
                }
            }
        },
        MuiIconButton: {
            colorPrimary: {
                "&.Mui-disabled": {
                    "& svg": {
                        color: "rgb(252, 140, 192)"
                    }
                }
            },
            root: {
                "&:hover": {
                    backgroundColor: "rgb(249, 24, 128, 0.1) !important",
                    "& svg": {
                        color: "rgb(249, 24, 128) !important"
                    }
                }
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(249, 24, 128)"
                }
            }
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(252, 140, 192)",
                    opacity: 1
                },
                "&.Mui-checked": {
                    color: "rgb(249, 24, 128)"
                }
            }
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(249, 24, 128, 0.1)"
                }
            }
        }
    }
};

export const violetColor = {
    palette: {
        primary: {
            light: "rgb(188, 171, 255)",
            main: "rgb(120, 86, 255)",
            dark: "rgb(120, 86, 255)"
        },
        info: {
            light: "rgb(207, 217, 222)",
            main: "rgb(207, 217, 222)",
            dark: "rgb(22, 6, 52)"
        },
        action: {
            disabledBackground: "rgb(120, 86, 255, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
            hover: "rgb(120, 86, 255, 0.1)"
        }
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(120, 86, 255)"
            },
            textPrimary: {
                "&:hover": {
                    backgroundColor: "rgb(120, 86, 255, 0.1)"
                }
            }
        },
        MuiIconButton: {
            colorPrimary: {
                "&.Mui-disabled": {
                    "& svg": {
                        color: "rgb(188, 171, 255)"
                    }
                }
            },
            root: {
                "&:hover": {
                    backgroundColor: "rgb(120, 86, 255, 0.1) !important",
                    "& svg": {
                        color: "rgb(120, 86, 255) !important"
                    }
                }
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(120, 86, 255)"
                }
            }
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(188, 171, 255)",
                    opacity: 1
                },
                "&.Mui-checked": {
                    color: "rgb(120, 86, 255)"
                }
            }
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(120, 86, 255, 0.1)"
                }
            }
        }
    }
};

export const orangeColor = {
    palette: {
        primary: {
            light: "rgb(255, 189, 128)",
            main: "rgb(255, 122, 0)",
            dark: "rgb(255, 122, 0)"
        },
        info: {
            light: "rgb(207, 217, 222)",
            main: "rgb(207, 217, 222)",
            dark: "rgb(60, 18, 1)"
        },
        action: {
            disabledBackground: "rgb(255, 122, 0, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
            hover: "rgb(255, 122, 0, 0.1)"
        }
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(255, 122, 0)"
            },
            textPrimary: {
                "&:hover": {
                    backgroundColor: "rgb(255, 122, 0, 0.1)"
                }
            }
        },
        MuiIconButton: {
            colorPrimary: {
                "&.Mui-disabled": {
                    "& svg": {
                        color: "rgb(255, 189, 128)"
                    }
                }
            },
            root: {
                "&:hover": {
                    backgroundColor: "rgb(255, 122, 0, 0.1) !important",
                    "& svg": {
                        color: "rgb(255, 122, 0) !important"
                    }
                }
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(255, 122, 0)"
                }
            }
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(255, 189, 128)",
                    opacity: 1
                },
                "&.Mui-checked": {
                    color: "rgb(255, 122, 0)"
                }
            }
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(255, 122, 0, 0.1)"
                }
            }
        }
    }
};

export const greenColor = {
    palette: {
        primary: {
            light: "rgb(128, 221, 190)",
            main: "rgb(0, 186, 124)",
            dark: "rgb(0, 186, 124)"
        },
        info: {
            light: "rgb(207, 217, 222)",
            main: "rgb(207, 217, 222)",
            dark: "rgb(0, 34, 24)"
        },
        action: {
            disabledBackground: "rgb(0, 186, 124, 0.5)",
            disabled: "rgb(255, 255, 255, 0.5)",
            hover: "rgb(0, 186, 124, 0.1)"
        }
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                borderColor: "rgb(0, 186, 124)"
            },
            textPrimary: {
                "&:hover": {
                    backgroundColor: "rgb(0, 186, 124, 0.1)"
                }
            }
        },
        MuiIconButton: {
            colorPrimary: {
                "&.Mui-disabled": {
                    "& svg": {
                        color: "rgb(128, 221, 190)"
                    }
                }
            },
            root: {
                "&:hover": {
                    backgroundColor: "rgb(0, 186, 124, 0.1) !important",
                    "& svg": {
                        color: "rgb(0, 186, 124) !important"
                    }
                }
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                "&.Mui-checked": {
                    color: "rgb(0, 186, 124)"
                }
            }
        },
        MuiSwitch: {
            track: {
                backgroundColor: "rgb(147, 147, 147)",
                opacity: 1
            },
            colorSecondary: {
                "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgb(128, 221, 190)",
                    opacity: 1
                },
                "&.Mui-checked": {
                    color: "rgb(0, 186, 124)"
                }
            }
        },
        MuiTab: {
            root: {
                "&:hover": {
                    backgroundColor: "rgb(0, 186, 124, 0.1)"
                }
            }
        }
    }
};
