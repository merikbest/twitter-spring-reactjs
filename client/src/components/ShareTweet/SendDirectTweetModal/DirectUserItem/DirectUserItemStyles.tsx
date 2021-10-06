import {makeStyles, Theme} from "@material-ui/core";

export const useDirectUserItemStyles = makeStyles((theme: Theme) => ({
    container: {
        width: "100%",
        display: "flex",
        alignItems: 'flex-start',
        paddingLeft: 15,
        cursor: 'pointer',
    },
    link: {
        textDecoration: 'none',
    },
    listAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 15,
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fullName: {
        color: "rgb(15, 20, 25)",
        fontWeight: 800,
        fontSize: 15,
    },
    username: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
    },
    checkIcon: {
        float: "right",
        "& svg": {
            color: "rgb(29, 155, 240)",
            marginTop: 5,
            height: "1.3em",
        },
    },
}));
