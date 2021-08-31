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
        "& .MuiDivider-root": {
            marginTop: 8,
            backgroundColor: "#EFF3F4",
        },
    },
    dropdown: {
        position: 'absolute',
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
        height: 60,
        padding: 0,
        backgroundColor: "#fff",
        "& :hover": {
            backgroundColor: '#edf3f6',
        },
        "& span": {
            width: 40,
            height: 40,
            zIndex: 1,
            backgroundColor: "red",
            "& svg": {
                zIndex: 3,
                marginTop: 3,
                marginRight: 3,
                height: "2.0em",

            },
        },
    },
}));
