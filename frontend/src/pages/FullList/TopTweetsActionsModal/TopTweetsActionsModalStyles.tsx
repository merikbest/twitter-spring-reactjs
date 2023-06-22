import { makeStyles } from "@material-ui/core";

export const useTopTweetsActionsModalStyles = makeStyles((theme) => ({
    root: {
        display: "inline-block"
    },
    dropdown: {
        padding: 0,
        position: "absolute",
        width: 386,
        height: 178,
        top: 10,
        right: 15,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            padding: 0
        },
        "& .MuiListItem-root": {
            display: "block",
            padding: 13,
            "&:hover": {
                borderRadius: 4,
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            }
        }
    }
}));
