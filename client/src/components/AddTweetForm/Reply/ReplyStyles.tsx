import {makeStyles, Theme} from "@material-ui/core";

export const useReplyStyles = makeStyles((theme: Theme) => ({
    reply: {
        position: 'relative',
        marginTop: 5,
        "& .MuiButton-root": {
            marginLeft: 50,
            fontSize: 14,
            fontWeight: 700,
            padding: "0px 8px",
            "& svg": {
                marginTop: 3,
                marginRight: 3,
                height: "1.2em",
            },
        },
        "& .MuiButton-root.Mui-disabled": {
            color: "rgb(142, 205, 247)"
        },
        "& .MuiDivider-root": {
            marginLeft: 50,
            marginTop: 8,
            backgroundColor: "#EFF3F4",
        },
    },
    popover: {
        "& .MuiPaper-root": {
            borderRadius: 16,
        }
    },
    dropdown: {
        width: 320,
        height: 284,
        zIndex: 2,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
    },
    infoWrapper: {
        fontSize: 15,
        padding: "16px 16px 0px 16px",
    },
    title: {
        fontWeight: 700,
    },
    text: {
        color: "rgb(83, 100, 113)",
    },
    listItem: {
        fontSize: 15,
        height: 60,
        padding: 0,
        backgroundColor: "#fff",
    },
    iconCircle: {
        marginRight: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: "rgb(29, 155, 240)",
    },
    icon: {
        "& svg": {
            marginTop: 5,
            height: "1.35em",
            fill: "#fff",
        },
    },
    checkIcon: {
        marginLeft: "auto",
        "& svg": {
            color: "rgb(29, 155, 240)",
            marginTop: 5,
            height: "1.3em",
        },
    },
}));
