import {makeStyles, Theme} from "@material-ui/core";

export const useMessagesModalStyles = makeStyles((theme: Theme) => ({
    header: {
        margin: 0,
        border: 0,
    },
    button: {
        marginLeft: "auto",
    },
    content: {
        height: 550,
        width: 598,
        padding: 0,
        "& .MuiListItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}));
