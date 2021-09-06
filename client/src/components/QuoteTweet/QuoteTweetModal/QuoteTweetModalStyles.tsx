import {makeStyles, Theme} from "@material-ui/core";

export const useQuoteTweetModalStyles = makeStyles((theme: Theme) => ({
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
        minHeight: 230,
        padding: "10px 20px 0px 20px",
    },
}));
