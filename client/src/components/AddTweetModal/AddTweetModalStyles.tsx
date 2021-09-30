import {makeStyles, Theme} from "@material-ui/core";

export const useAddTweetModalStyles = makeStyles((theme: Theme) => ({
    content: {
        top: "-20%"
    },
    header: {
        padding: "5px 15px",
        margin: 0,
        "& svg" : {
            fontSize: 26,
        },
    },
    dialogContent: {
        width: 598,
        minHeight: 284,
        padding: "10px 20px 10px 20px",
    },
}));
