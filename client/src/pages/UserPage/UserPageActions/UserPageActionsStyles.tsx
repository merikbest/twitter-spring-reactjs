import {makeStyles, Theme} from "@material-ui/core";

export const useUserPageActionsStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'relative',
        display: "inline-block",
    },
    dropdown: {
        position: 'absolute',
        width: 358,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            fontSize: 15,
            padding: 0,
            margin: 0,
        },
        '& .MuiListItem-root': {
            margin: 0,
            height: 52,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: theme.palette.secondary.main,
            },
        },
        "& .MuiTypography-root": {
            marginLeft: 12,
            fontSize: 15,
            fontWeight: 400,
        },
        "& svg": {
            verticalAlign: "bottom",
            fill: theme.palette.text.secondary,
            height: "1.30em",
        },
    },
    link: {
        width: "100%",
        color: theme.palette.text.primary,
        textDecoration: "none",
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
}));
