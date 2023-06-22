import { makeStyles } from "@material-ui/core";

export const useShareActionsModalStyles = makeStyles((theme) => ({
    root: {
        display: "inline-block"
    },
    dropdown: {
        padding: 0,
        position: "absolute",
        width: 230,
        height: 208,
        top: 10,
        right: 50,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            padding: 0
        }
    }
}));
