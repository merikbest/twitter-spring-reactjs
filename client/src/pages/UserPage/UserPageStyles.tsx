import {makeStyles, Theme} from "@material-ui/core";

export const useUserPageStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
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
        '& h6': {
            fontWeight: 800,
        },
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
        "& .MuiAvatar-root" :{
            width: "140px !important",
            height: "140px !important",
            border: "4px solid white",
        },
        "& ul": {
            display: "flex",
            margin: "12px 0 0 0",
            padding: 0,
            listStyle: "none",
            flexWrap: "wrap",
            "& li": {
                color: "#5b7083",
                marginRight: 20,
                "& svg": {
                    marginRight: 4,
                    height: "1.3em",
                    verticalAlign: "bottom",
                },
                "&:hover": {
                    textDecoration: "underline",
                },
            },
        },
    },
    tabs: {
        "& .MuiTabs-indicator": {
            marginLeft: 50,
            maxWidth: 50,
            height: 4,
            backgroundColor: "rgb(29, 161, 242)",
        },
        "& .MuiTab-root": {
            fontWeight: 700,
        },
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
    primaryButton: {
        marginTop: '84px',
        float: 'right',
        fontSize: 15,
        fontWeight: 700,
        width: 102,
        border: '1px solid',
        borderRadius: '25px',
        padding: '8px 15px',
        // TODO '& .MuiButton-containedPrimary':
        '&:hover': {
            backgroundColor: 'rgb(202, 32, 85)',
        },
    },
    fullName: {
        margin: "0 !important",
        fontWeight: 900,
        fontSize: 20,
    },
    username: {
        color: "#5b7083",
    },
    description: {
        fontSize: 15,
        marginTop: 12,
    },
    details: {
        color: "#5b7083",
    },
    followLink: {
        textDecoration: 'none',
        color: "#5b7083",
    },
    tweets: {
        borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    },
    tweetsCentred: {
        marginTop: 50,
        textAlign: 'center',
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
        color: "#5b7083",
    },
}));
