import { makeStyles } from "@material-ui/core";

export const useDisplayStyles = makeStyles((theme) => ({
    tweetInfoWrapper: {
        display: "inline-flex",
        justifyContent: "flex-start"
    },
    tweetIconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 48,
        height: 48,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "50%"
    },
    tweetIcon: {
        marginTop: 5,
        "& svg": {
            color: theme.palette.common.white,
            height: "1.7em"
        }
    },
    tweetTitle: {
        marginRight: 3,
        fontWeight: 700
    },
    tweetVerifiedIcon: {
        marginRight: 3,
        "& svg": {
            verticalAlign: "bottom",
            color: theme.palette.primary.main,
            height: "1.35em"
        }
    },
    tweetText: {
        "&#xs": {
            fontSize: 13
        },
        "&#xl": {
            fontSize: 20
        }
    },
    tweetLink: {
        color: theme.palette.primary.main
    },
    stepperWrapper: {
        display: "flex",
        alignItems: "center",
        padding: "16px 0px"
    },
    stepper: {
        position: "relative",
        width: "100%",
        height: 4,
        margin: "0px 20px",
        backgroundColor: theme.palette.primary.light
    },
    stepperPoint: {
        marginTop: -3,
        position: "absolute",
        verticalAlign: "baseline",
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 7px, rgb(101 119 134 / 15%) 0px 1px 3px 1px",
        "&#xs": {
            marginLeft: "1%"
        },
        "&#sm": {
            marginLeft: "24%"
        },
        "&#md": {
            marginLeft: "49%"
        },
        "&#lg": {
            marginLeft: "74%"
        },
        "&#xl": {
            marginLeft: "97%"
        }
    },
    colorWrapper: {
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0px"
    },
    colorItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        height: 45,
        borderRadius: "50%",
        cursor: "pointer",
        "&#blue": {
            backgroundColor: "rgb(29, 155, 240)"
        },
        "&#yellow": {
            backgroundColor: "rgb(255, 212, 0)"
        },
        "&#crimson": {
            backgroundColor: "rgb(249, 24, 128)"
        },
        "&#violet": {
            backgroundColor: "rgb(120, 86, 255)"
        },
        "&#orange": {
            backgroundColor: "rgb(255, 122, 0)"
        },
        "&#green": {
            backgroundColor: "rgb(0, 186, 124)"
        }
    },
    checkIcon: {
        marginTop: 5,
        "& svg": {
            color: theme.palette.common.white,
            height: "1.9em"
        }
    },
    backgroundContainer: {
        padding: "4px 12px"
    },
    backgroundWrapper: {
        display: "inline-block",
        "& .MuiTypography-h6": {
            fontWeight: 700,
            marginLeft: 25
        }
    },
    backgroundItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: 181,
        height: 60,
        padding: "0px 20px",
        margin: 4,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 4,
        cursor: "pointer",
        "&#default": {
            backgroundColor: theme.palette.common.white,
            "& .MuiTypography-h6": {
                color: theme.palette.common.black
            }
        },
        "&#dim": {
            backgroundColor: "rgb(21, 32, 43)",
            "& .MuiTypography-h6": {
                color: theme.palette.common.white
            }
        },
        "&#lights-out": {
            backgroundColor: "rgb(0, 0, 0)",
            "& .MuiTypography-h6": {
                color: "rgb(217, 217, 217)"
            }
        }
    },
    backgroundItemWrapper: {
        padding: "4px 0px",
        "& .MuiButtonBase-root": {
            padding: 4,
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            }
        }
    }
}));
