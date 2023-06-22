import { makeStyles } from "@material-ui/core";

export const useUserPageStyles = makeStyles((theme) => ({
    container: {
        "& .MuiTab-root": {
            textTransform: "none !important",
            minWidth: "150px !important",
            padding: "14px 12px !important"
        }
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.4em"
        }
    },
    wallpaper: {
        height: 200,
        backgroundColor: theme.palette.grey[700],
        position: "relative",
        "& img": {
            objectFit: "cover",
            position: "absolute",
            width: 601,
            height: 200
        }
    },
    info: {
        marginTop: -70,
        padding: 20,
        paddingTop: 0,
        "& .MuiAvatar-root": {
            backgroundColor: theme.palette.grey[600],
            width: "140px !important",
            height: "140px !important",
            border: `4px solid ${theme.palette.background.paper}`
        }
    },
    infoList: {
        "& .MuiList-root": {
            display: "flex",
            marginTop: 12,
            padding: 0,
            listStyle: "none",
            flexWrap: "wrap",
            "& .MuiListItem-root": {
                width: "auto",
                color: theme.palette.text.secondary,
                marginRight: 20,
                padding: 0,
                "& svg": {
                    marginRight: 4,
                    height: "1.3em",
                    verticalAlign: "top"
                }
            }
        }
    },
    privateProfileInfo: {
        margin: "72px auto",
        width: 360,
        textAlign: "center"
    },
    tabs: {
        "& .MuiTabs-indicator": {
            marginLeft: 50,
            maxWidth: 50,
            height: 4,
            backgroundColor: theme.palette.primary.main
        },
        "& .MuiTab-root": {
            fontSize: 15,
            fontWeight: 700
        }
    },
    buttonWrapper: {
        float: "right",
        display: "inline-block"
    },
    outlinedButton: {
        float: "right",
        marginTop: 84,
        height: 42
    },
    primaryButton: {
        "&.MuiButtonBase-root": {
            marginTop: 84,
            width: 102,
            "&:hover": {
                backgroundColor: theme.palette.error.dark
            }
        }
    },
    blockButton: {
        backgroundColor: theme.palette.error.main
    },
    description: {
        marginTop: 12
    },
    skeletonDetails: {
        "& .MuiSkeleton-root": {
            display: "inline-block",
            marginRight: 20
        }
    },
    details: {
        lineHeight: "20px",
        "& .MuiTypography-h6": {
            marginRight: 3
        }
    },
    unfollowLink: {
        cursor: "pointer",
        color: theme.palette.primary.main,
        "&:hover": {
            textDecoration: "underline"
        }
    },
    followLink: {
        cursor: "pointer",
        textDecoration: "none",
        lineHeight: "20px",
        color: theme.palette.text.secondary,
        "& span": {
            lineHeight: "20px"
        },
        "&:hover": {
            textDecoration: "underline"
        }
    },
    tweets: {
        borderTop: "1px solid rgba(0, 0, 0, 0.1)"
    },
    textWrapper: {
        margin: "40px 20px",
        textAlign: "center",
        "& .MuiTypography-subtitle1": {
            marginTop: 12
        }
    },
    button: {
        marginTop: 15
    }
}));
