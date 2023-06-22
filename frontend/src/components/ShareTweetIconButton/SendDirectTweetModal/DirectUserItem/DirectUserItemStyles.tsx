import { makeStyles } from "@material-ui/core";

export const useDirectUserItemStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: 15,
        cursor: "pointer"
    },
    listAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 15
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerInfo: {
        width: 350
    },
    checkIcon: {
        float: "right",
        "& svg": {
            color: theme.palette.primary.main,
            marginTop: 5,
            height: "1.3em"
        }
    }
}));
