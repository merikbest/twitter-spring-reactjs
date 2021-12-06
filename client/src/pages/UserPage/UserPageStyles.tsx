import {makeStyles, Theme} from "@material-ui/core";

export const useUserPageStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        paddingBottom: 500,
        borderTop: 0,
        borderBottom: 0,
        "& .MuiTab-root": {
            textTransform: "none !important",
            minWidth: "150px !important",
            padding: "14px 12px !important",
        },
        "& .MuiTab-wrapper": {
            fontWeight: "700px !important",
            fontSize: 16,
        },
    },
    header: {
        position: "fixed",
        width: 602,
        height: 53,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    headerFullName: {
        fontWeight: 800,
        fontSize: 20,
        lineHeight: "24px",
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.4em",
        },
    },
    headerTweetCount: {
        fontSize: 13,
        lineHeight: "16px",
        color: theme.palette.text.secondary,
    },
    wallpaper: {
        height: 200,
        backgroundColor: "#c4cfd6",
        position: "relative",
        "& img": {
            objectFit: "cover",
            position: "absolute",
            width: 601,
            height: 200,
        },
    },
    info: {
        marginTop: -70,
        padding: 20,
        paddingTop: 0,
        fontSize: 15,
        "& .MuiAvatar-root": {
            width: "140px !important",
            height: "140px !important",
            border: `4px solid ${theme.palette.background.paper}`,
        },
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
                    verticalAlign: "top",
                },
            },
        },
    },
    privateProfileInfo: {
        margin: "72px auto",
        width: 360
    },
    privateProfileInfoTitle: {
        marginBottom: 8,
        fontSize: 31,
        lineHeight: "36px",
        textAlign: "center",
        fontWeight: 800,
        color: theme.palette.text.primary,
    },
    privateProfileInfoText: {
        fontSize: 15,
        lineHeight: "20px",
        textAlign: "center",
        fontWeight: 400,
        color: theme.palette.text.secondary,
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    tabs: {
        "& .MuiTabs-indicator": {
            marginLeft: 50,
            maxWidth: 50,
            height: 4,
            backgroundColor: theme.palette.primary.main,
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
    },
    buttonWrapper: {
        float: 'right',
        display: "inline-block"
    },
    editButton: {
        float: 'right',
        marginTop: '84px',
        border: '1px solid',
        borderRadius: '25px',
        padding: '8px 15px',
        fontSize: 15,
        fontWeight: 700,
    },
    messageButton: {
        marginTop: 84,
        marginRight: 9,
        fontSize: 15,
        fontWeight: 700,
        border: '1px solid',
        borderRadius: '50%',
        padding: 8,
        "& svg": {
            color: theme.palette.primary.main,
            height: "1.6em",
        },
    },
    primaryButton: {
        "&.MuiButtonBase-root": {
            marginTop: '84px',
            fontSize: 15,
            fontWeight: 700,
            width: 102,
            borderRadius: '25px',
            padding: '8px 15px',
            '&:hover': {
                backgroundColor: theme.palette.error.dark,
            },
        },
    },
    blockButton: {
        backgroundColor: theme.palette.error.main,
    },
    fullName: {
        fontWeight: 800,
        fontSize: 20,
        lineHeight: "24px",
    },
    username: {
        fontSize: 15,
        color: theme.palette.text.secondary,
        lineHeight: "20px",
    },
    description: {
        fontSize: 15,
        marginTop: 12,
        lineHeight: "20px",
    },
    skeletonDetails: {
        "& .MuiSkeleton-root": {
            display: "inline-block",
            marginRight: 20,
        },
    },
    details: {
        lineHeight: "20px",
        "& b": {
            marginRight: 3,
        },
    },
    followLink: {
        cursor: "pointer",
        textDecoration: 'none',
        lineHeight: "20px",
        color: theme.palette.text.secondary,
        "& span": {
            lineHeight: "20px",
        },
        "&:hover": {
            textDecoration: "underline",
        },
    },
    tweets: {
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    },
    topic: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 12
    },
    textWrapper: {
        margin: "40px 20px",
        textAlign: "center"
    },
    text: {
        fontSize: 15,
        fontWeight: 400,
        marginBottom: 16,
        color: theme.palette.text.secondary,
    },
}));
