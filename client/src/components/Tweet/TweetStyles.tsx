import {makeStyles, Theme} from "@material-ui/core";

export const useTweetStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingLeft: 20,
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)',
        },
        '& h6': {
            fontWeight: 800,
        },
    },
    avatar: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
        marginRight: 15,
    },
    headerWrapper: {
        color: 'inherit',
        textDecoration: 'none',
        '& #hashtag': {
            color: "rgb(27, 149, 224)",
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    headerText: {
        color: 'rgb(83, 100, 113)',
    },
    headerIcon: {
        padding: 0,
        marginRight: 12,
        "& svg": {
            color: "rgb(83, 100, 113)",
            height: "0.8em",
        },
    },
    replyWrapper: {
        zIndex: 2,
        fontSize: 15,
        color: "#5b7083",
    },
    replyLink: {
        textDecoration: "none",
        color: "rgb(27, 149, 224)",
    },
    text: {
        color: 'inherit',
        textDecoration: 'none',
        '& #hashtag': {
            color: "rgb(27, 149, 224)",
        },
    },
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 280,
            borderRadius: 20,
            borderColor: "#5b7083",
        },
        "& .small": {
            width: 260,
            height: 152,
        },
    },
    footer: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        left: -13,
        justifyContent: 'space-between',
        maxWidth: 450,
    },
    footerIcon: {
        "& .MuiIconButton-root": {
            marginBottom: 6,
            width: 40,
            height: 40,
            color: "#5b7083",
            "& span": {
                paddingBottom: 3,
                "& svg" : {
                    verticalAlign: "bottom",
                    height: "0.80em",
                }
            },
        },
    },
    bottomLine: {
        height: 12,
        backgroundColor: '#E6ECF0',
    },
    retweetWrapper: {
        display: "flex",
        alignItems: "center",
        marginLeft: 45,
        marginTop: 5,
        color: "#5b7083",
        "& svg": {
            fontSize: 16
        },
        "& p": {
            marginLeft: 15,
            fontSize: 14,
            fontWeight: 700
        },
    },
}));
