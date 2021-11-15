import {makeStyles, Theme} from "@material-ui/core";

export const useMessagesModalStyles = makeStyles((theme: Theme) => ({
    header: {
        margin: 0,
        border: 0,
    },
    button: {
        marginLeft: "auto",
        height: 30,
    },
    content: {
        height: 550,
        width: 598,
        padding: 0,
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(207, 217, 222)",
    },
}));
